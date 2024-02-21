//

import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Button,
} from "@mui/material";
import React, { useState } from "react";

export const CustomersSearch = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState("");

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search customer (title or genre)"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500, marginRight: 2 }}
        value={searchCriteria}
        onChange={(e) => setSearchCriteria(e.target.value)}
      />
      <Button variant="contained">Search</Button>
    </Card>
  );
};
