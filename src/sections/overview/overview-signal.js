"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
// import BanIcon from "@heroicons/react/24/solid/BanIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";

export const OverviewTotalGuide = (props) => {
  const [users, setUsers] = useState([]);

  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.admin}/get_all_guides`);
    return res;
  };
  useEffect(() => {
    getUsers().then((res) => {
      //   console.log(data);
      setUsers(res.data);
    });
  }, []);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Guide
            </Typography>
            <Typography variant="h4">{users?.length}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalGuide.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
