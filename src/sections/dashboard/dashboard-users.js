"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import PersonIcon from "@heroicons/react/24/solid/UserIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";
import { useAuthContext } from "src/contexts/auth-context";

export const DashboardTotalUsers = (props) => {
  const [users, setUsers] = useState([]);
  const authContext = useAuthContext();
  const user = authContext.user;
  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.admin}/get_all_users`);
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
              Total Utilisateurs
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalUsers.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
