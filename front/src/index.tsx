import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail";
import { Routes, Route, useParams } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "project-details/:id",
    element: <ProjectDetail />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
