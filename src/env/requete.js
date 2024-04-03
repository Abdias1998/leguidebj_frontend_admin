import axios from "axios";

export const requete = {
//   admin: "http://localhost:7200/v1/admin",
//  destination: "http://localhost:7200/v1/destination",
 destination: "https://leguidebj-app.onrender.com/v1/destination",
  admin: "https://leguidebj-app.onrender.com/v1/admin",
  // user: "https://leguidebj-app.onrender.com/v1/users",
  // video: "http://localhost:7200/v1/video/preach",
  // comment: "",
  // ratings: "",
};

export const getAdminRole = async () => {
  const res = await axios.get(`${requete.admin}/admin_total_role`); 
  return res;
};
export const getGuideAll = async () => {
  const res = await axios.get(`${requete.admin}/get_all_guides`);
  return res;
};

export const getDateInscription = (createdAt) => {
  // Convertir la chaîne ISODate en objet Date
  const date = new Date(createdAt);

  // Extraire le jour, le mois et l'année de la date d'inscription
  const day = date.getDate();
  const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajouter 1
  const year = date.getFullYear();

  // Formater la date d'inscription comme JJ/MM/AAAA
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
