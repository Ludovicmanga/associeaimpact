import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProjectDetail } from "../pages/ProjectDetail/ProjectDetail";
import Auth from "../pages/Auth/Auth";
import ProjectsList from "../pages/ProjectsList/ProjectsList";
import { useEffect, useState } from "react";
import { checkAuthApiCall } from "../helpers/auth.helper";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/userSlice";
import ProjectCreation from "../pages/ProjectCreationOrEdition/ProjectCreationOrEdition";
import Messages from "../pages/Messages/Messages";
import StripeReturnPage from "../components/StripeReturnPage/StripeReturnPage";
import { setSnackBar } from "../redux/snackbarSlice";
import MyProfile from "../pages/MyProfile/MyProfile";
import { VerifyEmail } from "../pages/VerifyEmail/VerifyEmail";
import { ProjectsListSkeleton } from "../components/Skeletons/ProjectsListSkeleton/ProjectsListSkeleton";
import styles from "./Router.module.css";

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
    element: <ProjectCreation mode="creation" />,
  },
  {
    path: "/edit-project/:id",
    element: <ProjectCreation mode="edition" />,
  },
  {
    path: "/messages/:id?",
    element: <Messages />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/my-projects",
    element: <ProjectsList mode="my projects" />,
  },
  {
    path: "/return",
    element: <StripeReturnPage />,
  },
  {
    path: "/",
    element: <ProjectsList mode="all projects" />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

const routesWhenLoggedOut = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList mode="all projects" />,
  },
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
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
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

  const handleCloseSnackbar = () => {
    dispatch(setSnackBar(null));
  };

  const snackbarState = useAppSelector((state) => state.snackbar);

  return isLoaded ? (
    <>
      <RouterProvider router={router} />
      <Snackbar
        open={snackbarState?.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarState?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarState?.message}
        </Alert>
      </Snackbar>
    </>
  ) : (
    <div className={styles.skeletonContainer}>
      <div className={styles.sideBarSkeleton}>
        <Skeleton variant="rectangular" height={650} />
      </div>
      <div className={styles.mainContentSkeleton}>
        <ProjectsListSkeleton />
      </div>
    </div>
  );
};

export default Router;
