import { Avatar, Chip, ListItemButton } from "@mui/material";
import styles from "./MessagePreviewBox.module.css";

export default function MessagePreviewBox(props: {
  selected: boolean;
  name: string;
  preview: string;
  unreadCount: number;
}) {
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
            <div className={styles.nameContainer}>{props.name}</div>
            <div>{props.preview}</div>
          </div>
        </div>
        <Chip
          sx={{
            background: "#fcc2d7",
          }}
          label={props.unreadCount}
        />
      </div>
    </ListItemButton>
  );
}
