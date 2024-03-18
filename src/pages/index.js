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
import { OverviewSales } from "src/sections/dashboard/stats-guides";
import { OverviewTasksProgress } from "src/sections/dashboard/dashboard-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { OverviewTotalUsers } from "src/sections/dashboard/dashboard-users";
import { OverviewTotalVideos } from "src/sections/overview/overviews-video";
import { OverviewTotalManager } from "src/sections/dashboard/dashboard-manager";
import { OverviewTotalBannie } from "src/sections/dashboard/dashboard-bannie";
import { OverviewTotalSignal } from "src/sections/dashboard/dashboard-total-guides";
import { OverviewTotalComment } from "src/sections/dashboard/dashboard-comment";
import { OverviewTotalRatings } from "src/sections/overview/overview-ratings";
import { OverviewTotalAdmin } from "src/sections/dashboard/dashboard-admin";
import axios from "axios";
import Navbar from "src/components/navbar/navbar-client";

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Accueil | LE GUIDE BJ</title>
      <meta   />
    </Head>
    <Navbar/>
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
         
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
