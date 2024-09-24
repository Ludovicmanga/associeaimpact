import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import styles from "./ProjectBox.module.css";

const ProjectBox = (props: {
  name: string;
  description: string;
  stakes: string[];
  createdAt: Date;
}) => {
  return (
    <Card className={styles.container}>
      <CardContent>
        <div className={styles.title}>{props.name}</div>
        <div className={styles.topicsRow}>
          {props.stakes.map((stake) => (
            <Chip
              label={stake}
              className={styles.topicChip}
              sx={{
                background: "#e6fcf5",
              }}
            />
          ))}
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.creationDate}>Posté il y'a 2 mois</div>
      </CardContent>
    </Card>
  );
};

export default ProjectBox;
