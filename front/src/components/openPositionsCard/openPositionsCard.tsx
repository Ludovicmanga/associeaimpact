import { Card } from "@mui/material";
import styles from "./openPositionsCard.module.css";

const OpenPositionsCard = () => {
  return (
    <Card className={styles.container}>
      <div className={styles.title}>CFO</div>
      <div className={styles.sectionTitle}>Description du poste</div>
      <div>
        Je recherche quelqu'un qui serait bon en marketing, et puisse m'aider
        sur le développement de mon site web.
      </div>
      <div className={styles.sectionTitle}>Rémunération</div>
      <div>Actions & salaire</div>
    </Card>
  );
};

export default OpenPositionsCard;
