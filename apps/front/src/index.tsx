import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./Router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Crisp } from "crisp-sdk-web";

Crisp.configure("82ba4699-244a-4e65-bcb0-8bbd2485d08b");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID!}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
