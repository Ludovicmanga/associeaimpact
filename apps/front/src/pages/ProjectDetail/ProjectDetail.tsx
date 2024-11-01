import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./ProjectDetail.module.css";
import { Avatar, Card, Chip, Fab } from "@mui/material";
import { FaCrown } from "react-icons/fa";
import SideBar from "../../components/SideBar/SideBar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { PiEmptyThin } from "react-icons/pi";
import { FaMessage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getOneProjectApiCall } from "../../helpers/projects.helper";
import { EntrepreneurialExperience } from "../../types/enums";
import GoogleMapsAPI from "../../components/GoogleMapsAPI/GoogleMapsAPI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNeedToLoginModal } from "../../redux/needToLoginModalSlice";
import { handleGetCreationDate } from "../../utils/utils";
import { Partner } from "../../types/types";
import { ViewPartnerModal } from "../../components/ViewPartnerModal/ViewPartnerModal";

export const ProjectDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const loggedUserState = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [stakes, setStakes] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [partnersWanted, setPartnersWanted] = useState<Partner[]>([]);
  const [founder, setFounder] = useState<{
    id: number;
    name: string;
    entrepreneurialExperience: string;
  }>();
  const [selectedPartner, setSelectedPartner] = useState<Partner>();
  const [viewPartnerModalIsOpen, setViewPartnerModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleGetOneProject = async (id: number) => {
    const res = await getOneProjectApiCall(id);
    if (res) {
      setDescription(res.description);
      setName(res.name);
      setState(res.state);
      setPlace(res.place);
      setStakes(res.stakes);
      setPartnersWanted(res.partnersWanted);
      setFounder(res.founder);
      setCreatedAt(res.createdAt);
    }
    setIsLoading(false);
  };

  const handleGoToMessages = () => {
    if (loggedUserState) {
      if (founder && founder.id) {
        navigate(`/messages/${founder.id}`);
      }
    } else {
      dispatch(
        setNeedToLoginModal({
          isOpen: true,
          message: "Vous devez vous connecter pour envoyer un message",
        })
      );
    }
  };

  useEffect(() => {
    if (params.id) {
      handleGetOneProject(parseInt(params.id));
    }
  }, [params.id]);

  const barData = {
    labels: [""],
    datasets: [
      {
        label: "Etat du projet",
        data: [state],
        backgroundColor: "#f783ac",
        barThickness: "150",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            const labels: { 0: string; 1: string; 2: string; 3: string } = {
              0: " ",
              1: "Idée",
              2: "Lancement récent",
              3: "Succès commercial",
            };
            return labels[value as 0 | 1 | 2 | 3] || value;
          },
          stepSize: 1,
        },
        min: 0,
        max: 3,
      },
    },
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContent}>
        <NavBar
          startElement={
            <div className={styles.top}>
              <div>
                <div className={styles.title}>{name}</div>
                <div className={styles.postDate}>
                  Posté {handleGetCreationDate(createdAt!)}
                </div>
              </div>
            </div>
          }
        />

        <div className={styles.cardsSectionContainer}>
          <div className={styles.cardsSection}>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>📃</div>
                <div className={styles.cardTitleText}>
                  Le projet en quelques mots
                </div>
              </div>
              <div className={styles.projectDescriptionTextContainer}>
                {description}
              </div>
            </Card>
            <Card
              className={styles.contentCard}
              sx={{
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>🌐</div>
                <div className={styles.cardTitleText}>Lieu du projet</div>
              </div>
              <div style={{ height: "20rem", width: "100%" }}>
                <GoogleMapsAPI selectedPlace={place} />
              </div>
            </Card>
          </div>
          <div className={styles.cardsSection}>
            <Card
              className={styles.contentCard}
              sx={{
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>🚀</div>
                <div className={styles.cardTitleText}>Etat du projet</div>
              </div>
              {/* 
// @ts-ignore */}
              <Bar options={options} data={barData} />
            </Card>
            <Card
              className={styles.contentCard}
              sx={{
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>🦸‍♂️</div>
                <div className={styles.cardTitleText}>
                  Qui porte le projet ?
                </div>
              </div>
              <div className={styles.projetFounderAttribute}>
                <div className={styles.projetFounderAttributeName}>Prénom</div>
                <div>{founder?.name}</div>
              </div>
              <div className={styles.projetFounderAttribute}>
                <div className={styles.projetFounderAttributeName}>
                  Poste dans le projet
                </div>
                <div>CFO</div>
              </div>
              <div className={styles.projetFounderAttribute}>
                <div className={styles.projetFounderAttributeName}>
                  Experience dans l'entrepreneuriat
                </div>
                <div>
                  {founder?.entrepreneurialExperience ===
                  EntrepreneurialExperience.neverFounder
                    ? "Je n'ai jamais créé d'entreprise"
                    : founder?.entrepreneurialExperience ===
                      EntrepreneurialExperience.onceFounder
                    ? "J'ai déjà créé une entreprise"
                    : founder?.entrepreneurialExperience ===
                      EntrepreneurialExperience.serialFounder
                    ? "J'ai déjà créé plusieurs entreprises"
                    : ""}
                </div>
              </div>
              <div className={styles.contactBtnContainer}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  onClick={handleGoToMessages}
                  disabled={founder?.id === loggedUserState?.id}
                >
                  <FaMessage className={styles.contactBtnIcon} />
                  Contacter {founder?.name}
                </Fab>
              </div>
            </Card>
          </div>
          <div className={styles.cardsSection}>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>⭐</div>
                <div className={styles.cardTitleText}>Les enjeux du projet</div>
              </div>
              <div className={styles.projectDescriptionTextContainer}>
                {stakes.length === 0 ? (
                  <div className={styles.noDataInformationBox}>
                    <PiEmptyThin />
                    <div className={styles.noDataInformationText}>
                      Aucun enjeu n'a été renseigné
                    </div>
                  </div>
                ) : (
                  stakes.map((stake) => (
                    <Chip
                      key={stake}
                      label={stake}
                      sx={{
                        background: "#fff0f6",
                      }}
                      className={styles.stakeChip}
                    />
                  ))
                )}
              </div>
            </Card>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
                borderRadius: "25px",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>🤞</div>
                <div className={styles.cardTitleText}>
                  Les besoins du projet
                </div>
              </div>
              <div className={styles.openPositionCardsContainer}>
                {partnersWanted.length === 0 ? (
                  <div className={styles.noDataInformationBox}>
                    <PiEmptyThin />
                    <div className={styles.noDataInformationText}>
                      Aucun besoin d'associés n'a été spécifié
                    </div>
                  </div>
                ) : (
                  partnersWanted.map((partner) => (
                    <div
                      onClick={() => {
                        setSelectedPartner(partner);
                        setViewPartnerModalIsOpen(true);
                      }}
                    >
                      <Card
                        key={partner.id}
                        className={styles.openPositionsCardContainer}
                        sx={{
                          padding: "1.5rem 0.3rem",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          sx={{
                            background: "#f1f3f5",
                          }}
                        >
                          <FaCrown color="#ffe066" size={15} />
                        </Avatar>
                        <div className={styles.openPostionCardTextContainer}>
                          <div className={styles.openPositionCardsTitle}>
                            {partner.role}
                          </div>
                          <div className={styles.openPositionCardsDescription}>
                            {partner.description.substring(0, 30)}...
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {selectedPartner && (
        <ViewPartnerModal
          isOpen={viewPartnerModalIsOpen}
          setIsOpen={setViewPartnerModalIsOpen}
          partner={selectedPartner}
        />
      )}
    </div>
  );
};
