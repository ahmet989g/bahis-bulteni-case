import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearCoupon,
  removeOdd,
  selectCouponItems,
  selectCouponCount,
  selectTotalOdds,
} from "../../store/couponSlice";
import styles from "./CouponSidebar.module.css";
import { formatCurrency } from "@/utils/formatters/currency";

const COUPON_AMOUNT_OPTIONS = [10, 20, 50, 100, 200, 500, 1000];

export default function CouponSidebar() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCouponItems);
  const count = useAppSelector(selectCouponCount);
  const totalOdds = useAppSelector(selectTotalOdds);

  const [couponAmount, setCouponAmount] = useState(50);
  const potentialWin = totalOdds * couponAmount;

  if (count === 0) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.title}>Kupon</span>
        <button className={styles.clearBtn} onClick={() => dispatch(clearCoupon())}>
          Temizle
        </button>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.badge}>{item.name}</div>
            <div className={styles.info}>
              <span className={styles.matchCode}>Maç Kodu: {item.matchId}</span>
              <span className={styles.matchName}>{item.matchName}</span>
              <span className={styles.oddValue}>Oran: {item.value.toFixed(2)}</span>
            </div>
            <button
              className={styles.removeBtn}
              onClick={() => dispatch(removeOdd(item.matchId))}
              aria-label="Kuponden kaldır"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Toplam Oran</span>
          <span className={styles.footerValue}>{totalOdds.toFixed(2)}</span>
        </div>

        <div className={styles.footerRow}>
          <span className={styles.footerLabel}>Tutar</span>
          <select
            className={styles.couponAmountSelect}
            value={couponAmount}
            onChange={(e) => setCouponAmount(Number(e.target.value))}
          >
            {COUPON_AMOUNT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {formatCurrency(opt)}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.footerRow} ${styles.winRow}`}>
          <span className={styles.winLabel}>Toplam Kazanç</span>
          <span className={styles.winValue}>{formatCurrency(potentialWin)}</span>
        </div>
      </div>
    </aside>
  );
}