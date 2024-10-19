import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import styles from "./AddPartnerModal.module.css";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "2%",
};

export default function AddPartnerModal(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  setPartnersWanted: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        role: string;
        description: string;
      }[]
    >
  >;
}) {
  const [role, setRole] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleChangeRole = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setRole(e.target.value);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDescription(e.target.value);

  const handleAddPartner = () => {
    props.setPartnersWanted((curr) => [
      ...curr,
      {
        id: uuidv4(),
        role,
        description,
      },
    ]);
    props.setIsOpen(false);
  };

  React.useEffect(() => {
    setRole("");
    setDescription("");
  }, [props.isOpen]);

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.input}>
            <div className={styles.title}>Poste recherché</div>
            <TextField
              placeholder="Ex: CMO"
              value={role}
              onChange={handleChangeRole}
              fullWidth
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Description du poste</div>
            <TextField
              multiline
              minRows={2}
              placeholder="Ex: Je cherche quelqu'un pour m'aider sur toute la partie marketing, et rayonnement de la marque"
              value={description}
              onChange={handleChangeDescription}
              fullWidth
            />
          </div>
          <Button onClick={handleAddPartner} variant="contained">
            Ajouter associé
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
