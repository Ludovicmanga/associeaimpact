import { Button } from "@mui/material";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import pinkProject from "../../images/pinkProject.json";
import Lottie from "lottie-react";

const NavBar = () => {
  const navigate = useNavigate();

  const handleGoLoginPage = () => {
    navigate("/login");
  };

  const handleGoSignUpPage = () => {
    navigate("/sign-up");
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnsContainer}>
        <div>
          <Button onClick={handleGoLoginPage}>Se connecter</Button>
        </div>
        <div className={styles.subscribeBtn}>
          <Button
            onClick={handleGoSignUpPage}
            variant="contained"
            sx={{
              background: "#9775fa",
            }}
          >
            Inscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
