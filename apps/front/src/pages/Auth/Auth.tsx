import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import {
  loginWithGoogleApiCall,
  loginWithLocal,
  signUpWithLocalApiCall,
} from "../../helpers/auth.helper";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import styles from "./Auth.module.css";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { EntrepreneurialExperience } from "../../types/enums";
import { setSnackBar } from "../../redux/snackbarSlice";
import { error } from "console";
import { AxiosError } from "axios";

const Auth = (props: { mode: "login" | "signUp" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorHelperText, setEmailErrorHelperText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorHelperText, setPasswordErrorHelperText] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameInputErrorHelperText, setNameInputErrorHelperText] = useState("");
  const [entrepreneurialExperience, setEntrepreneurialExperience] =
    useState<EntrepreneurialExperience>();
  const [entrepreneurialExperienceError, setEntrepreneurialExperienceError] =
    useState(false);
  const [
    entrepreneurialExperienceErrorHelperText,
    setEntrepreneurialExperienceErrorHelperText,
  ] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setEmailError(true);
      setEmailErrorHelperText("");
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorHelperText("");
      setTimeout(() => {
        setPasswordError(false);
      }, 2000);
    }

    if (props.mode === "signUp") {
      if (!name) {
        setNameError(true);
        setNameInputErrorHelperText("");
        setTimeout(() => {
          setNameError(false);
        }, 2000);
      }

      if (!entrepreneurialExperience) {
        setEntrepreneurialExperienceError(true);
        setEntrepreneurialExperienceErrorHelperText("");
        setTimeout(() => {
          setEntrepreneurialExperienceError(false);
        }, 2000);
      }
    }

    if (props.mode === "login" && email.length > 0 && password.length > 0) {
      if (validateLoginInputs()) {
        await handleLoginLocal();
      }
    } else {
      if (validateSignupInputs()) {
        const res = await signUpWithLocalApiCall(
          email,
          password,
          name,
          entrepreneurialExperience!,
          dispatch
        );
        if (res.error) {
          if (res.error === "USER_ALREADY_EXISTS") {
            dispatch(
              setSnackBar({
                isOpen: true,
                severity: "error",
                message: "Un utilisateur avec cette adresse email existe déjà",
              })
            );
          }
        } else {
          dispatch(setUser(res));
          navigate("/");
          dispatch(
            setSnackBar({
              isOpen: true,
              severity: "success",
              message: "Votre compte a bien été créé !",
            })
          );
        }
      }
    }
  };

  const validateLoginInputs = () => {
    return !!email && !!password;
  };

  const validateSignupInputs = () => {
    return !!email && !!password && !!entrepreneurialExperience && !!name;
  };

  const handleLoginWithGoogle = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      const res = await loginWithGoogleApiCall(credentialResponse.credential);
      dispatch(setUser(res));
      navigate("/");
    }
  };

  const handleLoginLocal = async () => {
    try {
      const res = await loginWithLocal(email, password, dispatch);
      dispatch(setUser(res));
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          dispatch(
            setSnackBar({
              isOpen: true,
              severity: "error",
              message: "Whoops ! Email ou identifiants incorrects",
            })
          );
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" height={80} />
        </div>
        <div className={styles.subtitle}>
          Trouve tes associés, et créez ensemble un projet à impact
        </div>
        <div className={styles.argumentsContainer}>
          <div className={styles.argumentsTitle}>
            Que faire sur cette plateforme ?
          </div>
          <div className={styles.argument}>
            <CheckCircle color="success" />
            <div className={styles.argumentText}>
              Mets en avant ton projet, et laisse de potentiels associés te
              contacter
            </div>
          </div>
          <div className={styles.argument}>
            <CheckCircle color="success" />
            <div className={styles.argumentText}>
              Rejoins un projet déjà existant
            </div>
          </div>
          <div className={styles.argument}>
            <CheckCircle color="success" />
            <div className={styles.argumentText}>
              Trouve des inspirations d'entreprises à impact
            </div>
          </div>
          <div className={styles.argument}>
            <CheckCircle color="success" />
            <div className={styles.argumentText}>
              Rencontre des gens motivés, avec des intérêts similaires aux tiens
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.inputContainer}>
          <TextField
            label="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={emailError}
            helperText={emailError ? emailErrorHelperText : ""}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            error={passwordError}
            helperText={passwordError ? passwordErrorHelperText : ""}
          />
        </div>
        {props.mode === "signUp" && (
          <>
            <div className={styles.inputContainer}>
              <TextField
                label="Prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={nameError}
                helperText={nameError ? nameInputErrorHelperText : ""}
              />
            </div>
            <div className={styles.inputContainer}>
              <FormControl fullWidth>
                <InputLabel>Votre expérience entrepreneuriale</InputLabel>
                <Select
                  error={entrepreneurialExperienceError}
                  fullWidth
                  value={entrepreneurialExperience}
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
                {entrepreneurialExperienceError && (
                  <FormHelperText>
                    {entrepreneurialExperienceErrorHelperText}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </>
        )}
        <div className={styles.helpActionsButtonsContainer}>
          {props.mode === "login" ? (
            <>
              <div className={styles.helpActionBtn}>
                <Link>Mot de passe oublié</Link>
              </div>
              <div className={styles.helpActionBtn}>
                <Link onClick={() => navigate("/sign-up")}>
                  Pas de compte ? Inscrivez-vous
                </Link>
              </div>
            </>
          ) : (
            <Link onClick={() => navigate("/login")} className={styles.link}>
              Déjà un compte ? Connectez-vous
            </Link>
          )}
        </div>
        <div className={styles.submitBtnContainer}>
          <Button onClick={handleSubmit} variant="contained">
            {props.mode === "login" ? "Se connecter" : "S'inscrire"}
          </Button>
        </div>
        <Divider />
        <div className={styles.conjonctionWordContainer}>Ou</div>
        <div className={styles.submitBtnContainer}>
          <GoogleLogin
            onSuccess={handleLoginWithGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
