import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  loadMatches,
  selectMatches,
  selectBulletinStatus,
  selectBulletinError,
} from "../../store/bulletinSlice";
import BulletinTable from "../BulletinTable";
import styles from "./BulletinContainer.module.css";

const SKELETON_COUNT = 16;

export default function BulletinContainer() {
  const dispatch = useAppDispatch();
  const matches = useAppSelector(selectMatches);
  const status = useAppSelector(selectBulletinStatus);
  const error = useAppSelector(selectBulletinError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadMatches());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return <div className={styles.error}>{error}</div>;
  }

  if (status === "loading") {
    return (
      <div className={styles.skeletonList}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonButtons}>
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className={styles.skeletonButton} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <BulletinTable matches={matches} />;
}