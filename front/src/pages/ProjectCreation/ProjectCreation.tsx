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
import { useState } from "react";
import { FaClock, FaFire, FaRegQuestionCircle } from "react-icons/fa";
import { Add } from "@mui/icons-material";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import { createProjectApiCall } from "../../helpers/projects.helper";
import { ProjectState } from "../../types/types";

const ProjectCreation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [founderRole, setFounderRole] = useState("");
  const [state, setProjectState] = useState<ProjectState>(ProjectState.idea);
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);
  const [stakes, setStakes] = useState<string[]>([]);
  const [place, setPlace] = useState("");
  const [partnersWanted, setPartnersWanted] = useState<
    {
      id: string;
      role: string;
      description: string;
    }[]
  >([]);

  const handleCreateProject = async () => {
    const projectCreated = createProjectApiCall({
      name,
      state,
      stakes,
      founderRole,
      description,
      place,
      partnersWanted,
    });
  };

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
            <TextField
              placeholder="Ex: Carbone 4"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Description du projet</div>
            <TextField
              multiline
              placeholder="Ex: Carbone 4 est une entreprise de conseil en énergie et décarbonation"
              fullWidth
              minRows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Lieu du projet</div>
            <Autocomplete
              disablePortal
              options={["Paris", "Londres", "Monaco"]}
              renderInput={(params) => <TextField {...params} />}
              value={place}
              onChange={(e, value) => setPlace(value!)}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Etat du projet</div>
            <FormControl fullWidth>
              <Select
                value={state}
                label="Age"
                onChange={(e) =>
                  setProjectState(e.target.value as ProjectState)
                }
              >
                <MenuItem value={ProjectState.idea}>
                  <div className={styles.projectStateItem}>
                    <FaRegQuestionCircle color="#f59f00" />
                    <div className={styles.projectStateItemText}>Idée</div>
                  </div>
                </MenuItem>
                <MenuItem value={ProjectState.recentlyLaunched}>
                  <div className={styles.projectStateItem}>
                    <FaClock color="#f59f00" />
                    <div className={styles.projectStateItemText}>
                      Lancement récent
                    </div>
                  </div>
                </MenuItem>
                <MenuItem value={ProjectState.commercialSuccess}>
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
            <TextField
              value={founderRole}
              onChange={(e) => setFounderRole(e.target.value)}
              placeholder="Ex: CEO"
              fullWidth
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>Enjeux traités</div>
            <Autocomplete
              disablePortal
              options={["Agriculture", "Energie", "Social"]}
              renderInput={(params) => <TextField {...params} />}
              multiple
              onChange={(e, values) => setStakes(values)}
              value={stakes}
            />
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.questionTitle}>
              Votre recherche d'associés
            </div>
            <div>
              {partnersWanted.map((partner) => (
                <Chip
                  className={styles.cofounderChip}
                  label={partner.role}
                  onDelete={() =>
                    setPartnersWanted((curr) =>
                      curr.filter((p) => p.id !== partner.id)
                    )
                  }
                />
              ))}
            </div>
            <Button onClick={() => setAddPartnerModalOpen(true)}>
              <Add />
              {partnersWanted.length === 0
                ? "Ajouter"
                : "Ajouter un nouvel associé recherché"}
            </Button>
          </div>
          <div className={styles.submitBtnContainer}>
            <Fab
              onClick={handleCreateProject}
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
        setPartnersWanted={setPartnersWanted}
        setIsOpen={setAddPartnerModalOpen}
      />
    </div>
  );
};

export default ProjectCreation;
