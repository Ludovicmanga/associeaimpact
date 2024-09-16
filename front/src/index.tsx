import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./pages/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "project-details/:id",
    element: <ProjectDetail />,
  },
  {
    path: "/login",
    element: <Auth mode="login" />,
  },
  {
    path: "/sign-up ",
    element: <Auth mode="signUp" />,
  },
  {
    path: "/",
    element: <ProjectsList />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="64170857284-2lvdbtgele6jkol12l7p1q5jsqo8r4c4.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
