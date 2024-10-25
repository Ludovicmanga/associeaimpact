import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Icon,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import styles from "./ProjectBox.module.css";
import {
  getFormattedDayMonthYear,
  handleGetCreationDate,
  handleGetTime,
} from "../../utils/utils";
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
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <Card
      className={styles.container}
      sx={{
        borderRadius: "30px",
        padding: "1rem",
      }}
    >
      <CardContent className={styles.cardContent}>
        <div className={styles.mainContent}>
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
          <div className={styles.description}>
            {props.description.substring(0, 300)}...
          </div>
          {bigScreen && (
            <div className={styles.topicsRow}>
              {props.stakes.map((stake) => (
                <Chip
                  key={stake}
                  label={stake}
                  className={styles.topicChip}
                  sx={{
                    background: "#e6fcf5",
                    fontSize: bigScreen ? "0.7rem" : "0.6rem",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.creationDate}>
          Posté {handleGetCreationDate(props.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectBox;
