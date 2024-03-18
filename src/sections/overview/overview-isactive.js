"use-client";
import PropTypes from "prop-types";

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";

export const DashboardTotalGuideIsActive = (props) => {
  const [users, setUsers] = useState();

  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.admin}/get_all_guides_active!`);
    return res;
  };
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Guide Active et Désactiver
            </Typography>
            <Typography variant="h4">{users?.countIsActive}</Typography>
            <Typography variant="h4">{users?.countIsDiseable}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>

            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalGuideIsActive.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
