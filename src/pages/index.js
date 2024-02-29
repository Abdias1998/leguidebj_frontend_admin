import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Button, SvgIcon, Typography } from "@mui/material";

import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { OverviewTotalUsers } from "src/sections/overview/overview-users";
import { OverviewTotalVideos } from "src/sections/overview/overviews-video";
import { OverviewTotalManager } from "src/sections/overview/overview-manager";
import { OverviewTotalBannie } from "src/sections/overview/overview-bannie";
import { OverviewTotalSignal } from "src/sections/overview/overview-signal";
import { OverviewTotalComment } from "src/sections/overview/overview-comment";
import { OverviewTotalRatings } from "src/sections/overview/overview-ratings";
import { OverviewTotalAdmin } from "src/sections/overview/overview-admin";
import axios from "axios";

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Accueil | LE GUIDE BJ</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: La plateforme est en developpement
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            La page que vous avez démandé est en maintenance
          </Typography>
          <Button
            component={NextLink}
            href="/admin/auth/login"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Aller à la page de connexion
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
