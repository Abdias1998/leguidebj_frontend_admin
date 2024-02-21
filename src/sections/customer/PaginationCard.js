import React, { useEffect, useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

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
} from "@mui/material";
import axios from "axios";
import { requete } from "src/env/requete";
import { Scrollbar } from "src/components/scrollbar";
import ReactPlayer from "react-player";
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
  const [videoToDelete, setVideoToDelete] = useState(null);
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
      title: videoToEdit?.title || "",
      description: videoToEdit?.description || "",
      director: videoToEdit?.director || "",
      duration: videoToEdit?.duration || "",
      releaseYear: videoToEdit?.releaseYear || "",
      keywords: videoToEdit?.keywords || "",
      genre: videoToEdit?.genre || "",
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
        const response = await axios.put(`${requete.video}/update/${videoToEdit._id}`, formData);

        if (response.status === 200) {
          // Modification réussie
          handleEditSuccess(); // Fermez le modal de modification et affichez un message de succès
        } else {
          // Erreur de modification
          console.error("Erreur lors de la modification.");
        }
      } catch (error) {
        console.error("Erreur lors de la modification.", error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              name="title"
              value={formData.title}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Release Year"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Mots clés"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Genre"
              name="genre"
              value={formData.genre}
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
      const res = await axios.get(`${requete.video}/read`);
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

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filtered = data.filter((item) => {
      if (item.keywords && typeof item.keywords === "string") {
        return item.keywords.toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteVideo = (video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        // Envoyer une requête de suppression
        const response = await axios.delete(`${requete.video}/delete/${videoToDelete._id}`);

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

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <VideoPlayer />
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search customer (title or genre)"
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
          Search
        </Button>
      </Card>
      <Scrollbar>
        <Card style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edite</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Des</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Durée/Année</TableCell>
                <TableCell>Ratings/comments</TableCell>
                <TableCell>Lien video url</TableCell>
                <TableCell>Lien cover url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteVideo(item)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEditVideo(item)} color="info">
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>{item.title}</TableCell>
                  <TableCell>{truncate(item.description, 50)}</TableCell>
                  <TableCell>{item.director}</TableCell>
                  <TableCell>{`${item.duration}min/ ${item.releaseYear}`}</TableCell>
                  <TableCell>{`${item.ratings?.length}note/ ${item.comments?.length}comments`}</TableCell>
                  <TableCell>{item.videoUrl}</TableCell>
                  <TableCell>{item.coverImage}</TableCell>
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
        <DialogContent>Êtes-vous sûr de vouloir supprimer cette vidéo ?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
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
        <DialogTitle>Modifier la vidéo</DialogTitle>
        <DialogContent>
          <EditVideoForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaginationPage;
