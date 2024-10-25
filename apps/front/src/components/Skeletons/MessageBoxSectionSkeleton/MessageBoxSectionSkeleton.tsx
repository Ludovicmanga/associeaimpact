import { Skeleton } from "@mui/material";
import styles from "./MessageBoxSectionSkeleton.module.css";

export default function MessageBoxSectionSkeleton() {
  return (
    <div>
      <div className={styles.messageRowContainerSent}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="pulse"
        />
      </div>
      <div className={styles.messageRowContainerReceived}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="pulse"
        />
      </div>
      <div className={styles.messageRowContainerReceived}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="wave"
        />
      </div>
      <div className={styles.messageRowContainerSent}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="pulse"
        />
      </div>
      <div className={styles.messageRowContainerSent}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="wave"
        />
      </div>
      <div className={styles.messageRowContainerSent}>
        <Skeleton
          className={styles.boxContainer}
          variant="rectangular"
          height={80}
          animation="wave"
        />
      </div>
    </div>
  );
}
