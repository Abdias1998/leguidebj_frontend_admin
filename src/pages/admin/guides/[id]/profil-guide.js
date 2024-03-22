import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";


import { requete } from "src/env/requete";

const now = new Date();
export async function getServerSideProps(context) {
  const { params } = context;
  const { userId } = params;

  // Utilisez l'ID de l'utilisateur pour récupérer les données spécifiques à cet utilisateur
  const user = await fetchUserData(userId);

  return {
    props: {
      user,
    },
  };
}

const Page = ({ user }) => (
  <>
    <Head>
      <title>Dashboard | LE GUIDE BJ</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <h1>Page Destination</h1>
        {/* Utilisez les données de l'utilisateur ici */}
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;


