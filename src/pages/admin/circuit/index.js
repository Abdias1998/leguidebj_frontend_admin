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
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales, StatsGuideByYear } from "src/sections/dashboard/stats-guides";
import { DashboardTaskProgress} from "src/sections/dashboard/dashboard-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { DashboardTotalUsers} from "src/sections/dashboard/dashboard-users";
import { OverviewTotalVideos } from "src/sections/overview/overviews-video";
import { DashboardTotalManager, OverviewTotalManager } from "src/sections/dashboard/dashboard-manager";
import { DashboardTotalUsersBannie } from "src/sections/dashboard/dashboard-bannie";
import { DashboardTotalGuide, OverviewTotalGuide } from "src/sections/dashboard/dashboard-total-guides";
import { DashboardTotalComment, OverviewTotalComment } from "src/sections/dashboard/dashboard-comment";
import { OverviewTotalRatings } from "src/sections/overview/overview-ratings";
import { DashboardTotalAdmin} from "src/sections/dashboard/dashboard-admin";
import axios from "axios";
import { DashboardTotalGuideIsActive, OverviewTotalGuideIsActive } from "src/sections/overview/overview-isactive";
import { useAuthContext } from "src/contexts/auth-context";
import { requete } from "src/env/requete";
import { OverviewStatUsers, StatsUsersByYear } from "src/sections/dashboard/stats-users";
import { OverviewStatDestination } from "src/sections/overview/overview-stats-destination";
import { OverviewStatPartenaire } from "src/sections/overview/overview-stat-pattenaire";
axios.defaults.withCredentials = true;
const now = new Date();

const handleSubmitManager = (event) => {
  event.preventDefault();
  setLoading(true);

  const data = new FormData(event.currentTarget);
  // console.log({
  //   identifier: data.get("email"),
  //   password: data.get("password"),
  // });
  axios
    .post(`${requete.admin}/register_admin_role/${user._id}`, {
      email: data.get("email"),
      tel: data.get("tel"),
      role: data.get("role"),
      password: data.get("password"),
    })
    .then((res) => {})
    .catch((error) => {});
};
const Page = () => (
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
        <h1>Page Circuit</h1>

      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
