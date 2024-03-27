import { Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CardDestination({ destination, onEdit }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titre: destination.titre || "",
    duration: destination.duration || "",
    price: destination.price || "",
    texte: destination.texte || "",
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
        `${requete.destination}/update_destination/${destination._id}`,
        formData
      );

      if (response.status === 200) {
        // Modification réussie
        onEdit(); // Appeler la fonction de mise à jour après modification
        setIsEditModalOpen(false); // Fermez le modal de modification
      } else {
        // Erreur de modification
        console.error("Erreur lors de la modification.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification.", error);
    }
  };

  return (
    <div>
      <Card sx={{ width: 400 }}>
        <CardMedia
          component="img"
          height="200"
          image={destination.destination[1]}
          alt={destination.titre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {destination.titre}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Durée : {destination.duration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Prix : {destination.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Description : {destination.texte}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsEditModalOpen(true)}
            color="info"
          >
            Modifier
          </Button>
        </CardContent>
      </Card>
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Modifier les infos du guide</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Durée"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Prix"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Description"
                  name="texte"
                  value={formData.texte}
                  onChange={handleChange}
                  row={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
