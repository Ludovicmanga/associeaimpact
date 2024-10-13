import img from "../../images/undraw_feeling_blue.svg";
import styles from "./NoResultInfo.module.css";

export default function NoResultInfo(props: { text: string }) {
  return (
    <div className={styles.container}>
      <img src={img} height={400} />
      <div className={styles.textContainer}>{props.text}</div>
    </div>
  );
}
