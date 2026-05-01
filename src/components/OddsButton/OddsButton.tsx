import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleOdd, selectIsOddSelected } from "../../coupon/store/couponSlice";
import type { Odd } from "../../bulletin/types";
import styles from "./OddsButton.module.css";

interface Props {
  odd: Odd;
  matchName: string;
}

const OddsButton = memo(function OddsButton({ odd, matchName }: Props) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) => selectIsOddSelected(state, odd.id));

  const handleClick = useCallback(() => {
    dispatch(toggleOdd({ odd, matchName }));
  }, [dispatch, odd, matchName]);

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.name}>{odd.name}</span>
      <span className={styles.value}>{odd.value.toFixed(2)}</span>
    </button>
  );
});

export default OddsButton;