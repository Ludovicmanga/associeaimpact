import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setSnackBar } from "../../redux/snackbarSlice";

export default function StripeReturnPage() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const getStripeInfos = async () => {
    if (sessionId) {
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/api/stripe/session-status?session_id=${sessionId}`,
          withCredentials: true,
        });
        if (res.data) {
          setStatus(res.data.status);
          setCustomerEmail(res.data.customer_email);
        }
      } catch (error) {
        console.error("Failed to fetch stripe info:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getStripeInfos();
  }, [sessionId]);

  useEffect(() => {
    if (status === "open") {
      navigate("/checkout");
    }
  }, [status, navigate]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (status === "complete") {
    navigate("/");
    dispatch(
      setSnackBar({
        isOpen: true,
        severity: "success",
        message: "Votre souscription au plan premium est active !",
      })
    );
  }

  return null;
}
