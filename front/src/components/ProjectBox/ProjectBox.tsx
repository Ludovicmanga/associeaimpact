import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import styles from "./ProjectBox.module.css";

const ProjectBox = () => {
  return (
    <Card className={styles.container}>
      <CardContent>
        <div className={styles.title}>Kantaro</div>
        <div className={styles.topicsRow}>
          <Chip label="Agriculture" className={styles.topicChip} />
          <Chip label="Energie" className={styles.topicChip} />
        </div>
        <div className={styles.description}>
          Si toi aussi, tu trouves que nous sommes tellement connectées que nous
          nous déconnectons de la réalité, que les réseaux sociaux nous rendent
          plus asociaux que sociaux.
        </div>
        <div className={styles.creationDate}>Posté il y'a 2 mois</div>
      </CardContent>
    </Card>
  );
};

export default ProjectBox;
