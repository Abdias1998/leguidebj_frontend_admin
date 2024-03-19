import { useCallback, useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  Grid,
  TextField,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  Select,
  MenuItem,
} from "@mui/material";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import axios from "axios";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import CoverImageForm from "src/sections/customer/customer-validate";
import PaginationCard from "src/sections/customer/PaginationCard";
import { requete } from "src/env/requete";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika Visser",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];
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

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    zone: "",
    country: "",
    experience: "",
    description: "",
    available : "",
    document: null,
    // imageFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
const handleSendPdf =async () =>{
  const res = await axios.get(`${requete.admin}/send_pdf_all_guide`)

  try {
    if(res.status === 201){
      alert('Liste envoyé')
    } 
  } catch (error) {
    console.log(error);
  }
 


  
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      // Utilisez Axios pour envoyer les données au serveur
      const response = await axios.post(`${requete.admin}/register_guide`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
  };
  
  return (
    <>
      <Head>
        <title>Les Guides | Le Guide BJ</title>
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
                <Typography variant="h4">Liste des Guides</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => handleSendPdf()}
                >
                Envoyer la liste des guides
                </Button>
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
           
            <PaginationCard />
            {/* <CustomersTable
              // count={data.length}
              // items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}
          </Stack>
          <br />
          <Typography variant="h4">Créer un guide</Typography>
          <Container>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Prénom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                <Select
          fullWidth
          label="Pays"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        >
          {africanCountries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Zone touristique"
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expérience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Disponibilité"
                    name="available"
                    value={formData.available }
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="document"
                    onChange={handleFileChange}
                    multiple
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <input
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    onChange={handleFileChange}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Créer un guide
                  </Button>
                </Grid>
              </Grid>
            </form>
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
          </Container>
          <br /> <br />
          <div>{/* <CoverImageForm /> */}</div>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
