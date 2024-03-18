import React, { useState } from "react";
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import axios from "axios";
import { requete } from "src/env/requete";
import AdminPagination from "src/sections/admins/pagination-admins-liste";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tel: "",
    role: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${requete.admin}/register_admin_role`, formData);
      if (response.status === 201) {
        setIsSuccess(true);
        setDialogMessage(response.data.message);
        console.log(response.data.message);
      } 
    } catch (error) {
      setIsSuccess(false);
      setDialogMessage(error.response.data.message);
    } finally {
      setOpenDialog(true);
    }
    // Réinitialiser le formulaire après la soumission
    setFormData({
      email: "",
      password: "",
      tel: "",
      role: "",
    });
  };
  

  return (
    <>
      <Head>
        <title>Administrateurs | Le Guide BJ</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Gestion des administrateurs</Typography>
              
              </Stack>
              <div>
                <Button
                  startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
     
            <Box mt={4}>
              <Typography variant="h6">Ajouter un admin</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="tel"
                      name="tel"
                      label="Telephone"
                      variant="outlined"
                      value={formData.tel}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <Select
                        id="role"
                        name="role"
                        label="Role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="manager_sup">Super Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>

              <AdminPagination/>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Résultat</DialogTitle>
              <DialogContent>
                <Typography color={isSuccess ? "success" : "error"}>{dialogMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Fermer
                </Button>
              </DialogActions>
            </Dialog>{" "}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
