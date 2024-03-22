import React, { useEffect, useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import Image from 'next/image'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { requete } from "src/env/requete";
import { Scrollbar } from "src/components/scrollbar";

import { Container } from "@mui/system";
import VideoPlayer from "./customer-modified-video";

const initialData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
  { id: 8, name: "Item 8" },
  { id: 9, name: "Item 9" },
  { id: 10, name: "Item 10" },
];

const itemsPerPageOptions = [5, 10, 25, 50, 100, 150, 200, 300];

const PaginationPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[1]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDesactiveModalOpen, setIsDesactiveModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [videoToDesactive, setVideoToDesactive] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // État pour le modal d'informations
  const [infoMessage, setInfoMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Pour gérer le style du message d'informations
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const handleEditVideo = (video) => {
    setVideoToEdit(video);
    setIsEditModalOpen(true);
  };
  // Lorsque vous soumettez le formulaire de modification avec succès :
  const handleEditSuccess = () => {
    setIsEditModalOpen(false); // Fermez le modal de modification
    setIsInfoModalOpen(true); // Ouvrez le modal d'informations
    setIsEditSuccess(true); // Affichez un message de succès
  };

  // Composant de formulaire de modification
  const EditVideoForm = () => {
    const [formData, setFormData] = useState({
      firstName: videoToEdit?.firstName || "",
      lastName: videoToEdit?.lastName || "",
      email: videoToEdit?.email || "",
      tel: videoToEdit?.tel || "",
      description: videoToEdit?.description || "",
      country: videoToEdit?.country || "",
      zone: videoToEdit?.zone || "",
      language: videoToEdit?.language || "",
      experience: videoToEdit?.experience || "",
      available: videoToEdit?.available || "",

      // Ajoutez ici d'autres champs de formulaire
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Envoyer une requête de modification avec les données de formData
        const response = await axios.put(
          `${requete.admin}/update_guide/${videoToEdit._id}`,
          formData
        );

        if (response.status === 200) {
          // Modification réussie
          
          handleEditSuccess(); // Fermez le modal de modification et affichez un message de succès
          setInfoMessage(response.data.message);
          setIsSuccess(true);
        } else {
          // Erreur de modification
          console.error("Erreur lors de la modification.");
        }
      } catch (error) {
        console.error("Erreur lors de la modification.", error);
      }
    };
    const africanCountries = [
      "Algérie",
      "Angola",
      "Bénin",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cameroun",
      "Cap-Vert",
      "République Centrafricaine",
      "Tchad",
      "Comores",
      "Congo",
      "République Démocratique Du Congo",
      "Djibouti",
      "Égypte",
      "Guinée Équatoriale",
      "Érythrée",
      "Éthiopie",
      "Gabon",
      "Gambie",
      "Guinée",
      "Guinée-Bissau",
      "Côte d'Ivoire",
      "Kenya",
      "Lesotho",
      "Libye",
      "Liberia",
      "Madagascar",
      "Malawi",
      "Mali",
      "Mauritanie",
      "Maurice",
      "Maroc",
      "Mozambique",
      "Namibie",
      "Niger",
      "Nigeria",
      "Rwanda",
      "Sao Tomé-et-Principe",
      "Sénégal",
      "Seychelles",
      "Sierra Leone",
      "Somalie",
      "Afrique Du Sud",
      "Soudan Du Sud",
      "Swaziland",
      "Soudan",
      "Tanzanie",
      "Togo",
      "Tunisie",
      "Ouganda",
      "Zambie",
      "Zimbabwe"
    ];
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Nom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Prénom"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              row={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Disponibilité"
              name="available"
              value={formData.available}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Expérience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Téléphone"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
            />
          </Grid>
        
          <Grid item xs={12}>
                <Select
          fullWidth
          label="Pays"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          {africanCountries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
                </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Zone touristique"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Langue"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </Grid>

          {/* Ajoutez ici d'autres champs de formulaire */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  function truncate(str, n) {
    return str?.length > n ? str?.substr(0, n - 1) + "..." : str;
  }

  const getVideo = async () => {
    try {
      const res = await axios.get(`${requete.admin}/get_all_guides`);
      setData(res.data);
      setFilteredData(res.data);
      setInfoMessage("Requête réussie !");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setInfoMessage("Erreur lors de la requête.");
      setIsSuccess(false);
    } finally {
      // setIsInfoModalOpen(true);
    }
  };
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Pour suivre la première rendu

  useEffect(() => {
    getVideo();
    setIsSuccess(false);
  }, [isInitialLoad]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleSearch = (e) => {
  //   const searchValue = e.target.value;
  //   setSearchTerm(searchValue);

  //   const filtered = data.filter((item) => {
  //     if (item.zone && typeof item.zone === "string") {
  //       return item.zone.toLowerCase().includes(searchValue.toLowerCase());
  //     }
  //     return false;
  //   });
  //   setFilteredData(filtered);
  // };
  const handleSearch = (e) => {
    const searchValue = e.target.value // Convertir la valeur de recherche en minuscules
setSearchTerm(searchValue)
    const filtered = data.filter((item) => {
      // Vérifier si la zone correspond à la valeur de recherche
      if (item.zone && item.zone.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si la langue correspond à la valeur de recherche
      if (item.language && item.language.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si l'e-mail correspond à la valeur de recherche
      if (item.email && item.email.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si le nom correspond à la valeur de recherche
      if (item.names && item.names.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si le numéro de téléphone correspond à la valeur de recherche
      if (item.tel && item.tel.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si la disponibilité correspond à la valeur de recherche
      if (item.available && item.available.toLowerCase().includes(searchValue)) {
        return true;
      }
      // Vérifier si le pays correspond à la valeur de recherche
      if (item.country && item.country.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false; // Aucune correspondance trouvée
    });
  
    setFilteredData(filtered); // Mettre à jour les données filtrées
  };
  

  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteVideo = (video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const handleDesactiveVideo = (video) => {
    setVideoToDesactive(video);
    setIsDesactiveModalOpen(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        // Envoyer une requête de suppression
        const response = await axios.delete(`${requete.admin}/delete_guide/${videoToDelete._id}`);

        if (response.status === 200) {
          // Suppression réussie
          setInfoMessage("Suppression réussie.");
          setIsSuccess(true);
        } else {
          // Erreur de suppression
          setInfoMessage("Erreur lors de la suppression.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error(error);
        setInfoMessage("Erreur lors de la suppression.");
        setIsSuccess(false);
      } finally {
        setIsInfoModalOpen(true);
        setIsDeleteModalOpen(false);
      }
    }
  };
  const confirmDesactive = async () => {
    if (videoToDesactive) {
      try {
        // Envoyer une requête de suppression
        const response = await axios.put(`${requete.admin}/disebale-guide/${videoToDesactive._id}`);

        if (response.status === 200) {
          // Suppression réussie
          setInfoMessage("Désactivation réussie.");
          setIsSuccess(true);
        } else {
          // Erreur de suppression
          setInfoMessage("Erreur lors de la désactivation.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error(error);
        setInfoMessage("Erreur lors de la désactivation.");
        setIsSuccess(false);
      } finally {
        setIsInfoModalOpen(true);
        setIsDesactiveModalOpen(false);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  const cancelDesactive = () => {
    setIsDesactiveModalOpen(false);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };
  function getDateInscription(createdAt) {
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

  return (
    <div>
    
      {/* <VideoPlayer /> */}
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Rechercher Guide (title or genre)"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500, marginRight: 2 }}
        />
        <Button variant="contained" onClick={getVideo}>
          Recherche
        </Button>
      </Card>
      <Scrollbar>
        <Card style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Profil</TableCell>
              <TableCell>names</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Supprimer</TableCell>
                <TableCell>Modifier</TableCell>
                <TableCell>Désactiver</TableCell>
               
                <TableCell>Membre dépuis</TableCell>

                <TableCell>Code</TableCell>
                <TableCell>Tel</TableCell>
                <TableCell>Pays</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Disponibilité</TableCell>
                <TableCell>Expérience</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow style={{background:item.is_active !== true ? "gray": "green"}} key={item._id}>
             
             <TableCell>{ <Image style={{borderRadius:"100%"}} 
      src={item.document[0]} decoding="async" loading="lazy" data-nimg="1"
      alt="Picture of the author"
      width={50} 
      height={50} 
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />}</TableCell>
             <TableCell>{item.names}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteVideo(item)}
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEditVideo(item)} color="info">
                      Modifier
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDesactiveVideo(item)}
                      color="warning"
                    >
                    Désactiver
                    </Button>
                  </TableCell>

                  <TableCell>{`${ getDateInscription(item.createdAt)}`}</TableCell>
          
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{`${item.tel}`}</TableCell>
                  <TableCell>{`${item.country}`}</TableCell>
                  <TableCell>{item.language}</TableCell>
                  <TableCell>{item.zone}</TableCell>
                  <TableCell>{item.available}</TableCell>
                  <TableCell>{item.experience}</TableCell>
                  <TableCell>{truncate(item.description, 50)}</TableCell>
                  <TableCell>{item._id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={itemsPerPageOptions}
          />
        </Card>
      </Scrollbar>

      {/* Modal pour la confirmation de suppression */}
      <Dialog open={isDeleteModalOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir supprimer ce guide ?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDesactiveModalOpen} onClose={cancelDesactive}>
        <DialogTitle>Confirmer la dsactivation</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir désactiver ce guide ?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDesactive} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDesactive} color="error">
            Désactiver
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal d'informations pour la requête */}
      <Dialog open={isInfoModalOpen} onClose={closeInfoModal}>
        <DialogTitle>{isSuccess ? "Succès" : "Erreur"}</DialogTitle>
        <DialogContent>{infoMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeInfoModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Modifier les infos du guide </DialogTitle>
        <DialogContent>
          <EditVideoForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaginationPage;
