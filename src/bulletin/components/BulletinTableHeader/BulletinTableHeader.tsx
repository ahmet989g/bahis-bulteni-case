import styles from "./BulletinTableHeader.module.css";

const COLUMNS = [
  { id: "yorumlar", label: "Yorumlar" },
  { id: "mbs", label: "MBS" },
  { id: "ms-1", label: "1" },
  { id: "ms-x", label: "x" },
  { id: "ms-2", label: "2" },
  { id: "au-alt", label: "Alt" },
  { id: "au-ust", label: "Üst" },
  { id: "hc-h1", label: "H1" },
  { id: "hc-1", label: "1" },
  { id: "hc-x", label: "x" },
  { id: "hc-2", label: "2" },
  { id: "hc-h2", label: "H2" },
  { id: "cs-1x", label: "1-X" },
  { id: "cs-12", label: "1-2" },
  { id: "cs-x2", label: "X-2" },
  { id: "var", label: "Var" },
  { id: "yok", label: "Yok" },
  { id: "plus", label: "+99" },
];

interface Props {
  matchesLength: number;
}

export default function BulletinTableHeader({ matchesLength }: Props) {
  return (
    <thead className={styles.thead}>
      <tr className={styles.row}>
        <th className={`${styles.cell} ${styles.cellWide}`}>Event Count: {matchesLength}</th>
        {COLUMNS.map((col) => (
          <th
            key={col.id}
            className={`${styles.cell}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}