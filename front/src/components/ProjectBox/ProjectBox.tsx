import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Icon,
  IconButton,
} from "@mui/material";
import styles from "./ProjectBox.module.css";
import { getFormattedDayMonthYear, handleGetTime } from "../../utils/utils";
import { Edit, EditOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProjectBox = (props: {
  id: number;
  name: string;
  description: string;
  stakes: string[];
  createdAt: Date;
  isEditable: boolean;
}) => {
  const navigate = useNavigate();
  const handleGetCreationDate = () => {
    const createdAtDate = new Date(props.createdAt);
    const creationDate = getFormattedDayMonthYear(createdAtDate);
    if (creationDate === "aujourd'hui") {
      return creationDate;
    } else {
      return `le ${creationDate}`;
    }
  };

  return (
    <Card className={styles.container}>
      <CardContent className={styles.cardContent}>
        <div>
          <div className={styles.titleContainer}>
            <div className={styles.titleText}>{props.name}</div>
            {props.isEditable && (
              <IconButton
                onClick={(e) => {
                  navigate("/edit-project/" + props.id);
                  e.stopPropagation();
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
          </div>
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
          <div className={styles.description}>
            {props.description.substring(0, 300)}...
          </div>
        </div>
        <div className={styles.creationDate}>
          Posté {handleGetCreationDate()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectBox;
