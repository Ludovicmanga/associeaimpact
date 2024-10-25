import { Modal } from "@mui/material";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCallback } from "react";
import styles from "./PaymentModal.module.css";

const stripePromise = loadStripe("pk_test_z5x89OfwkEg8eXOJNMx384xK00KNJoz6oP");

export const PaymentModal = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const handleClose = () => props.setIsOpen(false);

  return (
    <Modal open={props.isOpen} onClose={handleClose}>
      <div>
        <ModalContent />
      </div>
    </Modal>
  );
};

const ModalContent = () => {
  const fetchClientSecret = useCallback(async () => {
    const res = await axios(
      "http://localhost:8080/api/stripe/create-checkout-session",
      {
        method: "post",
        withCredentials: true,
      }
    );
    return res.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div className={styles.container}>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default PaymentModal;
