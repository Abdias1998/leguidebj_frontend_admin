"use-client";
import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import MovieIcon from "@heroicons/react/24/solid/FilmIcon"; // Remplacez FilmIcon par le nom de l'icône appropriée

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { requete } from "src/env/requete";

export const OverviewTotalVideos = (props) => {
  const [videos, setVideo] = useState([]);
  const { value, sx } = props;
  const getVideo = async () => {
    const res = await axios.get(`${requete.video}/read`);
    return res;
  };
  useEffect(() => {
    getVideo().then((res) => {
      //   console.log(data);
      setVideo(res.data);
    });
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Vidéos
            </Typography>
            <Typography variant="h4">{videos?.length}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <MovieIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalVideos.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
