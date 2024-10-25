import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./MyProfile.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { EntrepreneurialExperience } from "../../types/enums";
import { editUserApiCall } from "../../helpers/users.helper";
import { setSnackBar } from "../../redux/snackbarSlice";
import { setUser } from "../../redux/userSlice";

export default function MyProfile() {
  const loggedUserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [entrepreneurialExperience, setEntrepreneurialExperience] =
    useState<EntrepreneurialExperience>();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setEntrepreneurialExperience(loggedUserState?.entrepreneurialExperience);
    setFirstName(loggedUserState?.name!);
  }, [loggedUserState]);

  const handleEditUser = async () => {
    const edited = await editUserApiCall({
      name: firstName,
      entrepreneurialExperience: entrepreneurialExperience!,
    });
    if (edited) {
      dispatch(
        setSnackBar({
          isOpen: true,
          severity: "success",
          message: "vos informations ont bien été modifiées",
        })
      );
      dispatch(setUser(edited));
    }
  };

  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        <div className={styles.mainContent}>
          <Paper
            elevation={7}
            sx={{
              width: bigScreen ? "50%" : "100%",
              padding: "2rem",
              borderRadius: "20px",
              margin: bigScreen ? "" : "0 2rem",
            }}
          >
            <div className={styles.inputLabel}>Email</div>
            <TextField fullWidth value={loggedUserState?.email} disabled />
            <div className={styles.inputLabel}>Prénom</div>
            <TextField
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormControl fullWidth>
              <div className={styles.inputLabel}>
                Expérience entrepreneuriale
              </div>
              <Select
                value={entrepreneurialExperience || 0}
                onChange={(e) =>
                  setEntrepreneurialExperience(
                    e.target.value as EntrepreneurialExperience
                  )
                }
              >
                <MenuItem value={EntrepreneurialExperience.neverFounder}>
                  Je n'ai jamais créé d'entreprise
                </MenuItem>
                <MenuItem value={EntrepreneurialExperience.onceFounder}>
                  J'ai déjà créé une entreprise
                </MenuItem>
                <MenuItem value={EntrepreneurialExperience.serialFounder}>
                  J'ai déjà créé plusieurs entreprises
                </MenuItem>
              </Select>
            </FormControl>
            <div className={styles.btnContainer}>
              <Button
                sx={{
                  width: "40%",
                }}
                variant="contained"
                onClick={handleEditUser}
              >
                Enregistrer
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
