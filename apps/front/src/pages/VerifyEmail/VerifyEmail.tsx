import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyUserEmailApiCall } from "../../helpers/auth.helper";
import { useAppDispatch } from "../../redux/hooks";
import { setSnackBar } from "../../redux/snackbarSlice";
import { setUser } from "../../redux/userSlice";

export const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token");

  const handleVerifyUser = async (token: string) => {
    console.log(token, " is the token");
    const userVerified = await verifyUserEmailApiCall(token);
    if (userVerified) {
      //navigate("/");
      dispatch(setUser(userVerified));
      dispatch(
        setSnackBar({
          isOpen: true,
          message: "Votre adresse email a bien été vérifiée",
          severity: "success",
        })
      );
    }
  };

  useEffect(() => {
    if (token) {
      handleVerifyUser(token);
    }
  }, [token]);

  return <Skeleton />;
};
