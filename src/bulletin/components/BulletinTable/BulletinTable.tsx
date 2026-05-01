import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Match } from "../../types";
import BulletinTableHeader from "../BulletinTableHeader";
import LeagueRow from "../LeagueRow";
import MatchRow from "../MatchRow";
import styles from "./BulletinTable.module.css";

interface Props {
  matches: Match[];
}

type Row =
  | { type: "league"; key: string; match: Match }
  | { type: "match"; key: string; match: Match };

function buildRows(matches: Match[]): Row[] {
  const rows: Row[] = [];
  for (const match of matches) {
    rows.push({ type: "league", key: `league-${match.id}`, match });
    rows.push({ type: "match", key: `match-${match.id}`, match });
  }
  return rows;
}

const LEAGUE_ROW_HEIGHT = 26;
const MATCH_ROW_HEIGHT = 50;
const COLUMN_COUNT = 19;

export default function BulletinTable({ matches }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = useMemo(() => buildRows(matches), [matches]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: (i) => rows[i]?.type === "league" ? LEAGUE_ROW_HEIGHT : MATCH_ROW_HEIGHT,
    overscan: 10,
  });

  const items = virtualizer.getVirtualItems();
  const total = virtualizer.getTotalSize();
  const padTop = items.length > 0 ? items[0].start : 0;
  const padBottom = items.length > 0 ? total - items[items.length - 1].end : 0;

  return (
    <div className={styles.container} ref={containerRef}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colMatch} />
          <col className={styles.colMid} />
          <col className={styles.colMid} />
          {Array.from({ length: 16 }).map((_, i) => (
            <col key={i} className={styles.colOdd} />
          ))}
        </colgroup>

        <BulletinTableHeader matchesLength={matches.length} />

        <tbody>
          {padTop > 0 && <tr><td style={{ height: padTop }} /></tr>}

          {items.map((vItem) => {
            const row = rows[vItem.index];
            if (!row) return null;

            if (row.type === "league") {
              return (
                <LeagueRow
                  key={row.key}
                  day={row.match.day}
                  date={row.match.date}
                  league={row.match.league}
                  colSpan={COLUMN_COUNT}
                />
              );
            }

            return <MatchRow key={row.key} match={row.match} />;
          })}

          {padBottom > 0 && <tr><td style={{ height: padBottom }} /></tr>}
        </tbody>
      </table>
    </div>
  );
}