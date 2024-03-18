"use-client";
import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useEffect, useState } from "react";
import axios from "axios";
import { requete } from "src/env/requete";
import { useAuthContext } from "src/contexts/auth-context";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const [data, setDatas] = useState([]);
  const authContext = useAuthContext();
  const user = authContext.user;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // État pour le modal d'informations
  const [infoMessage, setInfoMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Pour gérer le style du message d'informations
  const handleDeleteVideo = (video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };
 
  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        // Envoyer une requête de suppression
        const response = await axios.delete(`${requete.admin}/delete_admin/${videoToDelete._id}`);

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

  const getAdmins = async () => {
    const res = await axios.get(`${requete.admin}/retrieve_all_admin`);
    setDatas(res.data);
    console.log("data", data);
  };
  useEffect(() => {
    getAdmins();
  }, []);
  const { sx } = props;
  // const { orders = [], sx } = props;

  return (
   <>
   {  <Card sx={sx}>
      <CardHeader title="Liste des admins" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tel</TableCell>
                <TableCell>Supprimer admin</TableCell>
                <TableCell sortDirection="desc">Role</TableCell>
                {/* <TableCell>Status</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((order) => {
                return (
                  <TableRow hover key={order._id}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.tel}</TableCell>
                      <TableCell>{order.role}</TableCell>
                    <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteVideo(order)}
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                    {/* <TableCell>
                      <SeverityPill color={statusMap[order.status]}>{order.status}</SeverityPill>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
        {/* Modal pour la confirmation de suppression */}
        <Dialog open={isDeleteModalOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir supprimer ce manager ?</DialogContent>
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

    </Card>
    
    }
   </>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
