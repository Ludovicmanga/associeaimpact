import { Paper } from "@mui/material";
import img from "../../images/mobile_message.svg";
import styles from "./NoSelectedMessage.module.css";

export default function NoSelectedMessage() {
  return (
    <Paper
      sx={{
        padding: "9rem",
        borderRadius: "30px",
        margin: "1rem 6rem",
      }}
    >
      <div className={styles.container}>
        <div>Mes messages</div>
        <img src={img} height={240} />
      </div>
    </Paper>
  );
}
