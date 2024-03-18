import axios from "axios";

export const requete = {
  // admin: "http://localhost:7200/v1/admin",
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
