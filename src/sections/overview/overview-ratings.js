"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import { requete } from "src/env/requete";

export const OverviewTotalRatings = (props) => {
  const [users, setUsers] = useState();

  const { value, sx } = props;
  const getUsers = async () => {
    const res = await axios.get(`${requete.user}/all-ratings`);
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
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Note Vidéo
            </Typography>
            <Typography variant="h4">{users?.totalRatings}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <StarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalRatings.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
