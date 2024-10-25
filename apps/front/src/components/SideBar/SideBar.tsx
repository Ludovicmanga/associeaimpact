import { Drawer, ListItemButton, useMediaQuery } from "@mui/material";
import styles from "./Sidebar.module.css";
import { Email, Menu, Settings } from "@mui/icons-material";
import { FaRegHandshake, FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNeedToLoginModal } from "../../redux/needToLoginModalSlice";
import logo from "../../images/logo.svg";
import { setSidebar } from "../../redux/sidebarSlice";

const SideBar = () => {
  const sidebarState = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <div className={styles.container}>
      <Drawer
        open={sidebarState.isOpen}
        onClose={() =>
          dispatch(
            setSidebar({
              isOpen: false,
            })
          )
        }
        className={styles.drawerContainer}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        variant={bigScreen ? "permanent" : "temporary"}
      >
        <SidebarContent />
      </Drawer>
    </div>
  );
};

export default SideBar;

const SidebarContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedUserState = useAppSelector((state) => state.user);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateToMessages = () => {
    if (loggedUserState) {
      navigate("/messages");
    } else {
      dispatch(
        setNeedToLoginModal({
          isOpen: true,
          message: "Vous devez vous connecter pour voir vos messages",
        })
      );
    }
  };

  const handleNavigateMyProjects = () => {
    if (loggedUserState) {
      navigate("/my-projects");
    } else {
      dispatch(
        setNeedToLoginModal({
          isOpen: true,
          message: "Vous devez vous connecter pour voir vos projets",
        })
      );
    }
  };

  const handleNavigateToMyProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      {" "}
      <div className={styles.logoContainer} onClick={handleNavigateHome}>
        <img src={logo} alt="logo" height={70} />
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
          <ListItemButton onClick={handleNavigateMyProjects}>
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
        {loggedUserState && (
          <div className={styles.listItemBtn}>
            <ListItemButton onClick={handleNavigateToMyProfile}>
              <div className={styles.listItemIcon}>
                <Settings />
              </div>
              <div className={styles.listText}>Mon profil</div>
            </ListItemButton>
          </div>
        )}
      </div>
    </div>
  );
};
