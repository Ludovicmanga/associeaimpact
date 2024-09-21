import { ListItemButton, Paper } from "@mui/material";
import styles from "./Sidebar.module.css";
import { AutoGraph, Email, Person } from "@mui/icons-material";
import Lottie from "lottie-react";
import pinkProject from "../../images/pinkProject.json";
import { FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <Paper className={styles.container} elevation={10}>
      <div className={styles.logoContainer} onClick={handleNavigateHome}>
        <div>
          <Lottie
            animationData={pinkProject}
            loop={true}
            style={{ height: 50 }}
          />
        </div>
        <div className={styles.logoText}>Associé à impact</div>
      </div>
      <div className={styles.pagesListContainer}>
        <div className={styles.listItemBtn}>
          <ListItemButton>
            <div className={styles.listItemIcon}>
              <FaRegLightbulb size={18} />
            </div>
            <div className={styles.listText}>Les projets</div>
          </ListItemButton>
        </div>
        <div className={styles.listItemBtn}>
          <ListItemButton>
            <div className={styles.listItemIcon}>
              <Email />
            </div>
            <div className={styles.listText}>Mes messages</div>
          </ListItemButton>
        </div>
      </div>
    </Paper>
  );
};

export default SideBar;
