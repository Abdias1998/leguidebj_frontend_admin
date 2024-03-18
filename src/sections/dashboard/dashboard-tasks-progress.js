import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { requete } from 'src/env/requete';
export const DashboardTaskProgress = (props) => {
  const { value, sx } = props;
  const [users, setUsers] = useState([]);
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
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Task Progress
            </Typography>
            <Typography variant="h4">
              {users?.length}%
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={1000}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

DashboardTaskProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
