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
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { OverviewTotalUsers } from "src/sections/overview/overview-users";
import { OverviewTotalVideos } from "src/sections/overview/overviews-video";
import { OverviewTotalManager } from "src/sections/overview/overview-manager";
import { OverviewTotalUsersBannie } from "src/sections/overview/overview-bannie";
import { OverviewTotalGuide } from "src/sections/overview/overview-signal";
import { OverviewTotalComment } from "src/sections/overview/overview-comment";
import { OverviewTotalRatings } from "src/sections/overview/overview-ratings";
import { OverviewTotalAdmin } from "src/sections/overview/overview-admin";
import axios from "axios";
import { OverviewTotalGuideIsActive } from "src/sections/overview/overview-isactive";
import { useAuthContext } from "src/contexts/auth-context";
import { requete } from "src/env/requete";
import { Manager } from "./manager";

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
        <Grid container spacing={3}>
          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid> */}

          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid> */}

          {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid> */}
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalUsers sx={{ height: "100%" }} value="$15k" />
          </Grid>
          {/* <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalVideos sx={{ height: "100%" }} value="$15k" />
          </Grid> */}
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalAdmin sx={{ height: "100%" }} value="$15k" />
          </Grid>

          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalManager sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalUsersBannie sx={{ height: "100%" }} value="$15k" />
          </Grid>

          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalGuide sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalComment sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalGuideIsActive sx={{ height: "100%" }} value="$15k" />
          </Grid>

          {/* <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalRatings sx={{ height: "100%" }} value="$15k" />
          </Grid> */}

          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: "Last year",
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[1, 15, 22]}
              labels={["Desktop", "Tablet", "Phone"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewLatestProducts
              products={[
                {
                  id: "5ece2c077e39da27658aa8a9",
                  image: "/assets/products/product-1.png",
                  name: "Healthcare Erbology",
                  updatedAt: subHours(now, 6).getTime(),
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  image: "/assets/products/product-2.png",
                  name: "Makeup Lancome Rouge",
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  image: "/assets/products/product-5.png",
                  name: "Skincare Soja CO",
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                },
                {
                  id: "a6ede15670da63f49f752c89",
                  image: "/assets/products/product-6.png",
                  name: "Makeup Lipstick",
                  updatedAt: subDays(subHours(now, 3), 3).getTime(),
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Healthcare Ritual",
                  updatedAt: subDays(subHours(now, 5), 6).getTime(),
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewLatestOrders sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    <Manager />
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
