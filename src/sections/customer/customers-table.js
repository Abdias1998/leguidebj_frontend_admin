import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import axios from "axios";
import { useEffect, useState } from "react";

export const CustomersTable = (props) => {
  const [data, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // État pour les données filtrées

  function truncate(str, n) {
    return str?.length > n ? str?.substr(0, n - 1) + "..." : str;
  }
  const getVideo = async () => {
    const res = await axios.get("http://localhost:7200/v1/video/preach/read");
    return res;
  };

  useEffect(() => {
    getVideo().then((res) => {
      //   console.log(data);
      setDatas(res.data);
    });
  }, []);
  const {
    count = 0,
    // data = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < data.length;
  const selectedAll = data.length > 0 && selected.length === data.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>releaseYear</TableCell>
                <TableCell>director</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Interaction</TableCell>
                <TableCell>Commentaire</TableCell>
                <TableCell>Lien</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((customer) => {
                const isSelected = selected.includes(customer._id);

                return (
                  <TableRow hover key={customer._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack aligndata="center" direction="row" spacing={2}>
                        <Avatar
                          src={"/assets/avatars/avatar-carson-darrin.png"}
                        >
                          {getInitials(customer.title)}
                        </Avatar>
                        <TableCell>{customer._id}</TableCell>
                        <Typography variant="subtitle2">
                          {customer.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{truncate(customer.description, 20)}</TableCell>
                    <TableCell>{customer.genre}</TableCell>
                    <TableCell>{customer.releaseYear}</TableCell>
                    <TableCell>{customer.director}</TableCell>
                    <TableCell>{customer.duration}</TableCell>
                    <TableCell>{customer.ratings?.length}</TableCell>
                    <TableCell>{customer.comments?.length}</TableCell>
                    <TableCell>{customer.videoUrl}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  data: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
