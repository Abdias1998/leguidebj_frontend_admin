import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import axios from "axios";
import { requete } from "src/env/requete";

export function CoverImageForm() {
  const [id, setId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("imageFile", imageFile);

    try {
      await axios.put(`${requete.video}/create/add_image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Gérer la réponse en cas de succès
      setIsSuccess(true);
      setDialogMessage("Image de couverture mise à jour avec succès");
    } catch (error) {
      // Gérer les erreurs
      setIsSuccess(false);
      setDialogMessage(
        "Erreur lors de la mise à jour de l'image de couverture: " +
          error.message
      );
    } finally {
      setOpenDialog(true);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID de la vidéo"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Soumettre
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Résultat</DialogTitle>
        <DialogContent>
          <Typography color={isSuccess ? "success" : "error"}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CoverImageForm;
