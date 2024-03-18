"use-client";
import PropTypes from "prop-types";

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";

import axios from "axios";
import { useEffect, useState } from "react";
import { getAdminRole, requete } from "src/env/requete";

export const DashboardTotalAdmin = (props) => {
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
              Total Admin Principal
            </Typography>
            <Typography variant="h4">{admins?.countIsAdminPrincipal}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UserCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalAdmin .propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
