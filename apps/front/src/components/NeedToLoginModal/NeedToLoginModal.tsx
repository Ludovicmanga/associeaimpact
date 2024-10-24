import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNeedToLoginModal } from "../../redux/needToLoginModalSlice";
import styles from "./NeedToLoginModal.module.css";
import { Close } from "@mui/icons-material";
import wavy from "../../images/undraw_secure_login.svg";
import { useNavigate } from "react-router-dom";

export default function NeedToLoginModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const needToLoginModalState = useAppSelector(
    (state) => state.needToLoginModal
  );
  const handleClose = () =>
    dispatch(
      setNeedToLoginModal({
        isOpen: false,
        message: "",
      })
    );

  const bigScreen = useMediaQuery("(min-width: 40rem)");

  const handleGoToLoginPage = () => {
    navigate("/login");
    handleClose();
  };

  return (
    <Modal open={needToLoginModalState?.isOpen!} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.top}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <div className={styles.modalContent}>
          {bigScreen && (
            <Card
              sx={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={wavy} height={160} />
            </Card>
          )}
          <div className={styles.textContainer}>
            <div className={styles.title}>
              Connectez-vous pour aller plus loin
            </div>
            <div className={styles.description}>
              {needToLoginModalState?.message}
            </div>
            <div className={styles.btnContainer}>
              <Button
                onClick={handleGoToLoginPage}
                variant="contained"
                sx={{
                  width: "70%",
                }}
              >
                Connexion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
