import {
  Autocomplete,
  Button,
  Chip,
  Fab,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./ProjectCreation.module.css";
import { useEffect, useState } from "react";
import { FaClock, FaFire, FaRegQuestionCircle } from "react-icons/fa";
import { Add } from "@mui/icons-material";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";

const ProjectCreation = () => {
  const [projectState, setProjectState] = useState("idea");
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);

  const [partnersList, setPartnersList] = useState<
    {
      id: string;
      role: string;
      description: string;
    }[]
  >([]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        <div className={styles.mainContent}>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Nom du projet</div>
            <TextField placeholder="Ex: Carbone 4" fullWidth />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Description du projet</div>
            <TextField
              multiline
              placeholder="Ex: Carbone 4 est une entreprise de conseil en énergie et décarbonation"
              fullWidth
              minRows={5}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Lieu du projet</div>
            <Autocomplete
              disablePortal
              options={["Paris", "Londres", "Monaco"]}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Etat du projet</div>
            <FormControl fullWidth>
              <Select
                value={projectState}
                label="Age"
                onChange={(e) => setProjectState(e.target.value)}
              >
                <MenuItem value="idea">
                  <div className={styles.projectStateItem}>
                    <FaRegQuestionCircle color="#f59f00" />
                    <div className={styles.projectStateItemText}>Idée</div>
                  </div>
                </MenuItem>
                <MenuItem value="launched">
                  <div className={styles.projectStateItem}>
                    <FaClock color="#f59f00" />
                    <div className={styles.projectStateItemText}>
                      Lancement récent
                    </div>
                  </div>
                </MenuItem>
                <MenuItem value="success">
                  <div className={styles.projectStateItem}>
                    <FaFire color="#f59f00" />
                    <div className={styles.projectStateItemText}>
                      Succès commercial
                    </div>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>
              Votre poste dans l'entreprise
            </div>
            <TextField placeholder="Ex: CEO" fullWidth />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Enjeux traités</div>
            <Autocomplete
              disablePortal
              options={["Agriculture", "Energie", "Social"]}
              renderInput={(params) => <TextField {...params} />}
              multiple
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>
              Votre recherche d'associés
            </div>
            <div>
              {partnersList.map((partner) => (
                <Chip
                  className={styles.cofounderChip}
                  label={partner.role}
                  onDelete={() =>
                    setPartnersList((curr) =>
                      curr.filter((p) => p.id !== partner.id)
                    )
                  }
                />
              ))}
            </div>
            <Button onClick={() => setAddPartnerModalOpen(true)}>
              <Add />
              {partnersList.length === 0
                ? "Ajouter"
                : "Ajouter un nouvel associé recherché"}
            </Button>
          </div>
          <div className={styles.submitBtnContainer}>
            <Fab
              color="primary"
              size="large"
              variant="extended"
              sx={{
                width: "30%",
              }}
            >
              Créer le projet
            </Fab>
          </div>
        </div>
      </div>
      <AddPartnerModal
        isOpen={addPartnerModalOpen}
        onClose={() => setAddPartnerModalOpen(false)}
        setPartnersList={setPartnersList}
        setIsOpen={setAddPartnerModalOpen}
      />
    </div>
  );
};

export default ProjectCreation;
