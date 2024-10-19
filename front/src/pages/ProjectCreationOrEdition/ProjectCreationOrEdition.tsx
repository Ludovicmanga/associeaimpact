import {
  Autocomplete,
  Button,
  Chip,
  Fab,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./ProjectCreationOrEdition.module.css";
import { useEffect, useState } from "react";
import { FaClock, FaFire, FaRegQuestionCircle } from "react-icons/fa";
import { Add } from "@mui/icons-material";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import {
  createProjectApiCall,
  deleteProjectApiCall,
  editProjectApiCall,
  getOneProjectApiCall,
} from "../../helpers/projects.helper";
import { ProjectState } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setSnackBar } from "../../redux/snackbarSlice";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import {
  MapHandler,
  PlaceAutocomplete,
} from "../../components/GoogleMapsAPI/GoogleMapsAPI";
import { stakesList } from "../../types/constants";

export default function ProjectCreationOrEdition(props: {
  mode: "creation" | "edition";
}) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [founderRole, setFounderRole] = useState("");
  const [state, setState] = useState<ProjectState>(ProjectState.idea);
  const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false);
  const [stakes, setStakes] = useState<string[]>([]);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [partnersWanted, setPartnersWanted] = useState<
    {
      id: string;
      role: string;
      description: string;
    }[]
  >([]);

  const handleCreateProject = async () => {
    const createdProject = await createProjectApiCall({
      name,
      state,
      stakes,
      founderRole,
      description,
      place,
      partnersWanted,
    });
    if (createdProject) {
      navigate("/");
      dispatch(
        setSnackBar({
          isOpen: true,
          severity: "success",
          message: "Votre projet a bien été créé",
        })
      );
    }
  };

  const handleEditProject = async () => {
    setIsLoading(true);
    if (params.id) {
      const editedProject = await editProjectApiCall({
        id: parseInt(params.id),
        name,
        state,
        stakes,
        founderRole,
        description,
        place,
        partnersWanted,
      });
      if (editedProject) {
        navigate("/");
        dispatch(
          setSnackBar({
            isOpen: true,
            severity: "success",
            message: "Votre projet a bien été modifié",
          })
        );
      }
    }
  };
  const handleDeleteProject = async () => {
    setIsLoading(true);
    if (params.id) {
      const deletedRes = await deleteProjectApiCall(parseInt(params.id));
      if (deletedRes) {
        navigate("/");
        dispatch(
          setSnackBar({
            isOpen: true,
            severity: "success",
            message: "Votre projet a bien été supprimé",
          })
        );
      }
    }
  };

  const handleFillInitialEditInput = async () => {
    const projectId = params.id;
    if (projectId) {
      const res = await getOneProjectApiCall(parseInt(projectId));
      if (res) {
        setDescription(res.description);
        setName(res.name);
        setState(res.state);
        setPlace(res.place);
        setStakes(res.stakes);
        setPartnersWanted(res.partnersWanted);
      }
    }
  };

  const API_KEY = "AIzaSyDXxLmTjy7fb0p_I7YgZELDDGgRFzpJjZw";

  useEffect(() => {
    if (props.mode === "edition") {
      handleFillInitialEditInput();
    }
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        <Paper
          elevation={7}
          sx={{
            margin: "2rem 6rem",
          }}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
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
                <div className={styles.questionTitle}>
                  Description du projet
                </div>
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
                <APIProvider
                  apiKey={API_KEY}
                  solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
                >
                  <PlaceAutocomplete onPlaceSelect={setPlace} />
                </APIProvider>
              </div>
              <div className={styles.questionContainer}>
                <div className={styles.questionTitle}>Etat du projet</div>
                <FormControl fullWidth>
                  <Select
                    value={state}
                    label="Age"
                    onChange={(e) => setState(e.target.value as ProjectState)}
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
                  options={stakesList}
                  renderInput={(params) => (
                    <TextField placeholder="Ex: Agriculture" {...params} />
                  )}
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
              <div
                className={
                  props.mode === "creation"
                    ? `${styles.submitBtnContainer} ${styles.submitBtnContainerCreationMode}`
                    : `${styles.submitBtnContainer} ${styles.submitBtnContainerEditionMode}`
                }
              >
                {props.mode === "creation" ? (
                  <Button
                    onClick={handleCreateProject}
                    color="primary"
                    size="large"
                    variant="contained"
                    sx={{
                      width: "40%",
                    }}
                  >
                    Créer le projet
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleEditProject}
                      size="large"
                      variant="contained"
                      sx={{
                        margin: "0 1rem",
                      }}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      onClick={handleDeleteProject}
                      color="error"
                      size="large"
                      variant="outlined"
                      sx={{
                        margin: "0 1rem",
                      }}
                    >
                      Supprimer le projet
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </Paper>
      </div>
      <AddPartnerModal
        isOpen={addPartnerModalOpen}
        onClose={() => setAddPartnerModalOpen(false)}
        setPartnersWanted={setPartnersWanted}
        setIsOpen={setAddPartnerModalOpen}
      />
    </div>
  );
}
