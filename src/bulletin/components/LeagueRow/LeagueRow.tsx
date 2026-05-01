import styles from "./LeagueRow.module.css";

interface Props {
  day: string;
  date: string;
  league: string;
  colSpan: number;
}

export default function LeagueRow({ day, date, league, colSpan }: Props) {
  return (
    <tr className={styles.row}>
      <td colSpan={colSpan} className={styles.cell}>
        <span className={styles.date}>{day} {date}</span>
        <span className={styles.league}>{league}</span>
      </td>
    </tr>
  );
}