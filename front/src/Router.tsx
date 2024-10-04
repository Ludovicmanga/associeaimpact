import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail";
import Auth from "./pages/Auth/Auth";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import { useEffect, useState } from "react";
import { checkAuthApiCall } from "./helpers/auth.helper";
import { Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUser } from "./redux/userSlice";
import ProjectCreation from "./pages/ProjectCreation/ProjectCreation";
import Messages from "./pages/Messages/Messages";

const routesWhenLoggedIn = createBrowserRouter([
  {
    path: "project-details/:id",
    element: <ProjectDetail />,
  },
  {
    path: "/login",
    element: <Auth mode="login" />,
  },
  {
    path: "/sign-up",
    element: <Auth mode="signUp" />,
  },
  {
    path: "/create-project",
    element: <ProjectCreation />,
  },
  {
    path: "/messages/:id",
    element: <Messages />,
  },
  {
    path: "/",
    element: <ProjectsList />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

const routesWhenLoggedOut = createBrowserRouter([
  {
    path: "/login",
    element: <Auth mode="login" />,
  },
  {
    path: "/sign-up ",
    element: <Auth mode="signUp" />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
]);

const Router = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.user);
  let router = userState ? routesWhenLoggedIn : routesWhenLoggedOut;

  const handleCheckAuth = async () => {
    try {
      const res = await checkAuthApiCall();
      if (res.data) {
        setIsLoaded(true);
        dispatch(setUser(res.data));
      }
    } catch (e: any) {
      if (e.status === 401) {
        setIsLoaded(true);
        dispatch(setUser(null));
      }
    }
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return isLoaded ? <RouterProvider router={router} /> : <Skeleton />;
};

export default Router;
