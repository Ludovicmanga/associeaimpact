import styles from "./NoResultInfo.module.css";

export default function NoResultInfo(props: { text: string; img: string }) {
  return (
    <div className={styles.container}>
      <img src={props.img} height={400} />
      <div className={styles.textContainer}>{props.text}</div>
    </div>
  );
}
