import { Box, Container, Grid } from "@mui/material";
import { DashboardTaskProgress } from "src/sections/dashboard/dashboard-tasks-progress";

export default function Navbar() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
       

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <DashboardTaskProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
        
      
        </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
