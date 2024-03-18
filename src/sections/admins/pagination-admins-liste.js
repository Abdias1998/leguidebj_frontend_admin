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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { requete } from "src/env/requete";
import { Scrollbar } from "src/components/scrollbar";
import { Container } from "@mui/system";

const itemsPerPageOptions = [5, 10, 25, 50, 100, 150, 200, 300];

const AdminPagination = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[1]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const res = await axios.get(`${requete.admin}/retrieve_all_admin`);
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

    const filtered = data.filter((admin) => {
      if (admin.name && typeof admin.name === "string") {
        return admin.name.toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteAdmin = (admin) => {
    setVideoToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      try {
        const response = await axios.delete(`${requete.admin}/delete_admin/${videoToDelete._id}`);

        if (response.status === 200) {
          setInfoMessage("Suppression réussie.");
          setIsSuccess(true);
        } else {
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
      <h1>Pagination</h1>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Rechercher Admin (Nom)"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500, marginRight: 2 }}
        />
        <Button variant="contained" onClick={getAdmins}>
          Recherche
        </Button>
      </Card>
      <Scrollbar>
        <Card style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tel</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((admin) => (
                <TableRow key={admin._id}>
                
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.tel}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteAdmin(admin)}
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
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

      <Dialog open={isDeleteModalOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir supprimer cet administrateur ?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isInfoModalOpen} onClose={closeInfoModal}>
        <DialogTitle>{isSuccess ? "Succès" : "Erreur"}</DialogTitle>
        <DialogContent>{infoMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeInfoModal} color="primary">
            OK
          </Button>
        </DialogActions> 
      </Dialog>
    </div>
  );
};

export default AdminPagination;
