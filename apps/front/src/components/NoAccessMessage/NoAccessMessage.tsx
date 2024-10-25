import { Card, Paper, useMediaQuery } from "@mui/material";
import SexyBtn from "../SexyBtn/SexyBtn";
import styles from "./NoAccessMessage.module.css";
import { CheckCircle } from "@mui/icons-material";

export default function NoAccessMessage(props: {
  senderName: string;
  subscribeBtnAction: () => void;
}) {
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <Paper
      sx={{
        padding: bigScreen ? "2rem 6rem" : "1rem",
        height: bigScreen ? "80%" : "100%",
        background: "#212529",
      }}
    >
      <div className={styles.title}>Devenir membre premium</div>
      <p className={styles.description}>
        Pour lire les messages de {props.senderName}, vous devez souscrire à
        l'offre premium. <br></br>Un{" "}
        <span className={styles.elementsToBold}>paiement unique</span> de 40 €,
        et un accès à vie à tous les messages que vous recevrez sur la
        plateforme.
      </p>
      <div className={styles.subscribtionArgumentsContainer}>
        <div className={styles.subscriptionArgument}>
          <CheckCircle color="success" />
          <div className={styles.subscriptionArgumentText}>
            Voir et répondre à tous les messages
          </div>
        </div>
        <div className={styles.subscriptionArgument}>
          <CheckCircle color="success" />
          <div className={styles.subscriptionArgumentText}>Accès à vie</div>
        </div>
      </div>
      <Card
        className={styles.subscribeActionContainer}
        sx={{
          background: "#343a40",
          color: "white",
          padding: bigScreen ? "2rem" : "1rem",
        }}
        variant="elevation"
      >
        <div className={styles.subscribtionPriceContainer}>
          <div className={styles.priceAndCurrency}>
            <div>€</div>
            <div>40</div>
          </div>
          <p className={styles.subscribtionPriceDetail}>
            TTC - paiement unique
          </p>
        </div>
        <div className={styles.subscribeBtnContainer}>
          <SexyBtn onClick={props.subscribeBtnAction} text="Souscrire" />
        </div>
      </Card>
    </Paper>
  );
}
