import { Button, Divider, TextField } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import {
  accessProfileApiCall,
  loginWithGoogleApiCall,
  loginWithLocal,
} from "../../helpers/auth";

const Auth = (props: { mode: "login" | "signUp" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (props.mode === "login" && email.length > 0 && password.length > 0) {
      await loginWithLocal(email, password);
    }
  };

  const accessProfile = async () => {
    await accessProfileApiCall();
  };

  const handleLoginWithGoogle = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      await loginWithGoogleApiCall(credentialResponse.credential);
    }
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
      <Button onClick={accessProfile}>Profile</Button>
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
