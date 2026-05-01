import { memo } from "react";
import OddsButton from "../../../components/OddsButton";
import type { Match, Odd } from "../../types";
import styles from "./MatchRow.module.css";

interface Props {
  match: Match;
}

function findOdd(match: Match, categoryId: string, oddName: string): Odd | null {
  const category = match.categories.find((c) => c.id === categoryId);
  return category?.odds.find((o) => o.name === oddName) ?? null;
}

const MatchRow = memo(function MatchRow({ match }: Props) {
  const o = (catId: string, name: string) => findOdd(match, catId, name);

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.cellMatch}`}>
        <span className={styles.code}>{match.id}</span>
        <span className={styles.time}>{match.time}</span>
        <span className={styles.name}>{match.name}</span>
      </td>
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell}>{o("1", "1") && <OddsButton odd={o("1", "1")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("1", "X") && <OddsButton odd={o("1", "X")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("1", "2") && <OddsButton odd={o("1", "2")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("5", "Alt") && <OddsButton odd={o("5", "Alt")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("5", "Üst") && <OddsButton odd={o("5", "Üst")!} matchName={match.name} />}</td>
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell}>{o("2", "1-X") && <OddsButton odd={o("2", "1-X")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("2", "1-2") && <OddsButton odd={o("2", "1-2")!} matchName={match.name} />}</td>
      <td className={styles.cell}>{o("2", "X-2") && <OddsButton odd={o("2", "X-2")!} matchName={match.name} />}</td>
      <td className={styles.cell} />
      <td className={styles.cell} />
      <td className={styles.cell} />
    </tr>
  );
});

export default MatchRow;