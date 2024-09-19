import { Button, Divider, TextField } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import {
  loginWithGoogleApiCall,
  loginWithLocal,
  logoutApiCall,
} from "../../helpers/auth.helper";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = (props: { mode: "login" | "signUp" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (props.mode === "login" && email.length > 0 && password.length > 0) {
      const res = await loginWithLocal(email, password);
      dispatch(setUser(res));
    }
  };

  const handleLoginWithGoogle = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      const res = await loginWithGoogleApiCall(credentialResponse.credential);
      dispatch(setUser(res));
    }
  };

  const handleLogout = async () => {
    const res = await logoutApiCall();
    dispatch(setUser(null));
  };

  return (
    <div>
      <div>{props.mode === "login" ? "Se connecter" : "S'inscrire"}</div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>
        {props.mode === "login" ? "Se connecter" : "S'inscrire"}
      </Button>
      <Button onClick={handleLogout}>Se déconnecter</Button>
      <Divider />
      <div>Ou</div>
      <GoogleLogin
        onSuccess={handleLoginWithGoogle}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
};

export default Auth;
