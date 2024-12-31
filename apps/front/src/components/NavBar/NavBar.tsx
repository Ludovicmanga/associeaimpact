import { Button, Fab, IconButton, useMediaQuery } from "@mui/material";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutApiCall } from "../../helpers/auth.helper";
import { setUser } from "../../redux/userSlice";
import { setSnackBar } from "../../redux/snackbarSlice";
import NeedToLoginModal from "../NeedToLoginModal/NeedToLoginModal";
import { ReactNode, useEffect } from "react";
import { Menu } from "@mui/icons-material";
import { setSidebar } from "../../redux/sidebarSlice";

const NavBar = (props: { startElement?: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.user);

  const handleGoLoginPage = () => {
    navigate("/login");
  };

  const handleGoSignUpPage = () => {
    navigate("/sign-up");
  };

  const handleOpenSidebar = () => {
    dispatch(
      setSidebar({
        isOpen: true,
      })
    );
  };

  const handleLogout = async () => {
    const res = await logoutApiCall();
    dispatch(setUser(null));
    dispatch(
      setSnackBar({
        isOpen: true,
        severity: "success",
        message: "Vous avez bien été deconnecté",
      })
    );
  };

  const smallScreen = useMediaQuery("(max-width:40rem)");

  return (
    <>
      <div
        className={
          props.startElement || smallScreen
            ? `${styles.container} ${styles.containerWithStartElement}`
            : `${styles.container} ${styles.containerWithoutStartElement}`
        }
      >
        {smallScreen ? (
          <IconButton onClick={handleOpenSidebar}>
            <Menu />
          </IconButton>
        ) : (
          props.startElement
        )}
        <div className={styles.btnsContainer}>
          {loggedUser ? (
            <div className={styles.subscribeBtn}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleLogout}
                sx={{
                  background: "#495057",
                }}
              >
                Se déconnecter
              </Fab>
            </div>
          ) : (
            <>
              <div>
                <Button onClick={handleGoLoginPage}>Se connecter</Button>
              </div>
              <div className={styles.subscribeBtn}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  onClick={handleGoSignUpPage}
                  sx={{
                    background: "#495057",
                  }}
                >
                  Inscription
                </Fab>
              </div>
            </>
          )}
        </div>
      </div>
      <NeedToLoginModal />
    </>
  );
};

export default NavBar;
