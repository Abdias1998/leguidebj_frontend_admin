"use-client";
import PropTypes from "prop-types";
// import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";

export const DashboardTotalUsersBannie = (props) => {
  const [users, setUsers] = useState([]);

  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.admin}/users_total_order`);
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
              Total Utilisateurs Bannie
            </Typography>
            <Typography variant="h4">{users?.bannedUserCount}</Typography>
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalUsersBannie.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
