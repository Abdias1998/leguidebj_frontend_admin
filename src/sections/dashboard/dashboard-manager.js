"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import BriefcaseIcon from "@heroicons/react/24/solid/BriefcaseIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAdminRole, requete } from "src/env/requete";

export const DashboardTotalManager = (props) => {
  const [admins, setAdmins] = useState();

  const { value, sx } = props;

  useEffect(() => {
    getAdminRole().then((res) => {
      setAdmins(res.data);
    });
  }, []);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Manager
            </Typography>
            <Typography variant="h4">{admins?.countIsManager}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <BriefcaseIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalManager.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
