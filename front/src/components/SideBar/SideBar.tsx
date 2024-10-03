import { Drawer, ListItemButton, Paper } from "@mui/material";
import styles from "./Sidebar.module.css";
import { AutoGraph, Email, Person } from "@mui/icons-material";
import Lottie from "lottie-react";
import pinkProject from "../../images/pinkProject.json";
import { FaRegHandshake, FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateToMessages = () => {
    navigate("/messages");
  };

  return (
    <Drawer
      open={true}
      className={styles.container}
      elevation={10}
      sx={{
        width: "17%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "17%",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
    >
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
          <ListItemButton onClick={handleNavigateHome}>
            <div className={styles.listItemIcon}>
              <FaRegLightbulb size={18} />
            </div>
            <div className={styles.listText}>Tous les projets</div>
          </ListItemButton>
        </div>
        <div className={styles.listItemBtn}>
          <ListItemButton>
            <div className={styles.listItemIcon}>
              <FaRegHandshake size={21} />
            </div>
            <div className={styles.listText}>Mes projets</div>
          </ListItemButton>
        </div>
        <div className={styles.listItemBtn}>
          <ListItemButton onClick={handleNavigateToMessages}>
            <div className={styles.listItemIcon}>
              <Email />
            </div>
            <div className={styles.listText}>Mes messages</div>
          </ListItemButton>
        </div>
      </div>
    </Drawer>
  );
};

export default SideBar;
