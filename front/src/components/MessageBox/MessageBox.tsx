import { ReactNode } from "react";
import styles from "./MessageBox.module.css";

export default function MessageBox(props: {
  type: "sent" | "received";
  message: ReactNode;
}) {
  return (
    <div
      className={
        props.type === "sent"
          ? `${styles.container} ${styles.containerSent}`
          : `${styles.container} ${styles.containerReceived}`
      }
    >
      <div
        className={
          props.type === "sent"
            ? `${styles.boxContainer} ${styles.boxContainerSent}`
            : `${styles.boxContainer} ${styles.boxContainerReceived}`
        }
      >
        <div className={styles.contentContainer}>{props.message}</div>
      </div>
    </div>
  );
}
