import { Avatar, Chip, ListItemButton } from "@mui/material";
import styles from "./MessagePreviewBox.module.css";

export default function MessagePreviewBox(props: { selected: boolean }) {
  return (
    <ListItemButton
      sx={{
        background: props.selected ? "#e5dbff" : "",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className={
          props.selected
            ? `${styles.container} ${styles.containerSelected}`
            : `${styles.container}`
        }
      >
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Avatar
              sx={{
                height: 60,
                width: 60,
              }}
              variant="circular"
            />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.nameContainer}>Chris</div>
            <div>Hi, I just want you to...</div>
          </div>
        </div>
        <Chip
          sx={{
            background: "#fcc2d7",
          }}
          label={3}
        />
      </div>
    </ListItemButton>
  );
}
