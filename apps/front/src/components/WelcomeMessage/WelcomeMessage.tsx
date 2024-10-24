import { useAppSelector } from "../../redux/hooks";
import styles from "./WelcomeMessage.module.css";

export default function WelcomeMessage(props: {
  mainText: string;
  subText: string;
}) {
  const loggedUserState = useAppSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <p className={styles.mainMessage}>{props.mainText}</p>
      <p className={styles.subMessage}>{props.subText}</p>
    </div>
  );
}
