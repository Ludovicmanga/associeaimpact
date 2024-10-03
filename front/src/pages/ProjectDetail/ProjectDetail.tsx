import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./ProjectDetail.module.css";
import { Card, Chip, Fab } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import SideBar from "../../components/SideBar/SideBar";
import { AiOutlineRise } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import GoogleMapReact from "google-map-react";
import { IoPerson } from "react-icons/io5";
import { PiSpeakerHighLight } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import { FaHandFist, FaMessage } from "react-icons/fa6";
import OpenPositionsCard from "../../components/openPositionsCard/openPositionsCard";
import { useEffect, useState } from "react";
import { getOneProjectApiCall } from "../../helpers/projects.helper";

export const ProjectDetail = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
  const [stakes, setStakes] = useState<string[]>([]);
  const [partnersWanted, setPartnersWanted] = useState<
    {
      id: string;
      role: string;
      description: string;
    }[]
  >([]);
  const [founder, setFounder] = useState<
    {
      name: string;
      entrepreneurialExperience: string;
    }[]
  >([]);

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
    }
    setIsLoading(false);
  };

  const handleGoToMessages = () => {
    navigate("/messages");
  };

  useEffect(() => {
    if (params.id) {
      handleGetOneProject(parseInt(params.id));
    }
  }, [params.id]);

  const defaultProps = {
    center: {
      lat: 48.87121268497986,
      lng: 2.3471133469957124,
    },
    zoom: 11,
  };

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
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContent}>
        <NavBar />
        <div className={styles.top}>
          <div>
            <div className={styles.title}>{name}</div>
            <div className={styles.postDate}>Posté le 9 avril 2024</div>
          </div>
        </div>
        <div className={styles.cardsSectionContainer}>
          <div className={styles.cardsSectionContainerLeft}>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <PiSpeakerHighLight size={18} />
                </div>
                <div className={styles.cardTitleText}>
                  Le projet en quelques mots
                </div>
              </div>
              <div className={styles.projectDescriptionTextContainer}>
                {description}
              </div>
            </Card>
            <Card className={styles.contentCard}>
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <FaMapMarkerAlt size={17} />
                </div>
                <div className={styles.cardTitleText}>Lieu du projet</div>
              </div>
              <div style={{ height: "20rem", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyDXxLmTjy7fb0p_I7YgZELDDGgRFzpJjZw",
                  }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                />
              </div>
            </Card>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <FaHandFist size={18} />
                </div>
                <div className={styles.cardTitleText}>Les enjeux du projet</div>
              </div>
              <div className={styles.projectDescriptionTextContainer}>
                {stakes.map((stake) => (
                  <Chip
                    label={stake}
                    sx={{
                      background: "#fff0f6",
                    }}
                    className={styles.stakeChip}
                  />
                ))}
              </div>
            </Card>
          </div>
          <div className={styles.cardsSectionContainerRight}>
            <Card className={styles.contentCard}>
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <AiOutlineRise size={18} />
                </div>
                <div className={styles.cardTitleText}>Etat du projet</div>
              </div>
              {/* 
// @ts-ignore */}
              <Bar options={options} data={barData} />
            </Card>
            <Card className={styles.contentCard}>
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <IoPerson size={18} />
                </div>
                <div className={styles.cardTitleText}>
                  Qui porte le projet ?
                </div>
              </div>
              <div className={styles.projetFounderAttribute}>
                <div className={styles.projetFounderAttributeName}>Prénom</div>
                <div>Marion</div>
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
                <div>J'ai déjà monté plusieurs entreprises</div>
              </div>
              <div className={styles.contactBtnContainer}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  onClick={handleGoToMessages}
                >
                  <FaMessage className={styles.contactBtnIcon} />
                  Contacter Marion
                </Fab>
              </div>
            </Card>
            <Card
              className={styles.contentCard}
              sx={{
                overflow: "scroll",
                maxHeight: "25rem",
              }}
            >
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <FaRegLightbulb size={18} />
                </div>
                <div className={styles.cardTitleText}>
                  Les besoins du projet
                </div>
              </div>
              {partnersWanted.map((partner) => (
                <div className={styles.openPositionsCardContainer}>
                  <OpenPositionsCard {...partner} />
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
