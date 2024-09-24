import { Card } from "@mui/material";
import styles from "./openPositionsCard.module.css";

const OpenPositionsCard = (props: { role: string; description: string }) => {
  return (
    <Card className={styles.container}>
      <div className={styles.title}>{props.role}</div>
      <div className={styles.sectionTitle}>Description du poste</div>
      <div>{props.description}</div>
      <div className={styles.sectionTitle}>Rémunération</div>
      <div>Actions & salaire</div>
    </Card>
  );
};

export default OpenPositionsCard;
