import { Modal } from "@mui/material";
import styles from "./ViewPartnerModal.module.css";
import { Partner } from "../../types/types";

export function ViewPartnerModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  partner: Partner;
}) {
  return (
    <Modal open={props.isOpen} onClose={() => props.setIsOpen(false)}>
      <div className={styles.container}>
        <div>
          <label className={styles.label}>
            <div>🎖</div>
            <div className={styles.labelText}>Poste</div>
          </label>
          <div>{props.partner.role}</div>
        </div>
        <div className={styles.descriptionInput}>
          <label className={styles.label}>
            <div>📖</div>
            <div className={styles.labelText}>Description du poste</div>
          </label>
          <div>{props.partner.description}</div>
        </div>
      </div>
    </Modal>
  );
}
