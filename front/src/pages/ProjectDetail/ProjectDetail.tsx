import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProjectDetail = () => {
  let { id } = useParams();

  return (
    <div>
      <div>Dokin</div>
      <div>Phase du projet : déjà créé</div>
      <div>Dokin est une entreprise qui automatise la vie des financiers</div>
      <div>Photos / Vidéos</div>
      <div>Notre recherche : un CTO, un CPO</div>
      <div>Contacter Jean</div>
    </div>
  );
};
