"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import BriefcaseIcon from "@heroicons/react/24/solid/BriefcaseIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";

export const OverviewTotalManager = (props) => {
  const [users, setUsers] = useState();

  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.admin}/admin_total_role`);
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
              Total Manager
            </Typography>
            <Typography variant="h4">{users?.countIsManager}</Typography>
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

OverviewTotalManager.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
