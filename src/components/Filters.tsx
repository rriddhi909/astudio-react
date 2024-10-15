import React, { useState } from 'react';
import {
  TextField,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';

interface FiltersProps {
  onSearch: (value: string) => void;
  limit: number;
  handleLimitChange: (event: SelectChangeEvent<number>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSearch, limit, handleLimitChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  // Handle search change for client-side filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Pass the search value to parent for client-side filtering
  };

  return (
    <>
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }} className='limit-select'>
        <InputLabel id="demo-simple-select-helper-label">Entries</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={limit}
          onChange={handleLimitChange
          }
          label="Entries"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>

      </FormControl>
      {/* Search Icon and Input */}
      {searchInputVisible ? (
        <FormControl sx={{ flexGrow: 1 }} >
          <TextField
            id="outlined-search"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            label="Search here..."
          />
        </FormControl>
      ) : (
        <Button onClick={() => setSearchInputVisible(!searchInputVisible)}>
          🔍
        </Button>
      )}
      </div>
    </>
  );
};

export default Filters;
