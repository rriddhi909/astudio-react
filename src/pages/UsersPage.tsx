import React, { useContext, useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Pagination,
  Container,
  Typography,
  Box,
  SelectChangeEvent,
  FormControl
} from '@mui/material';
import { UsersContext } from "../contexts/UsersContext";
import Filters from "../components/Filters";

const UsersPage: React.FC = () => {
  const {
    users,
    loading,
    limit,
    setLimit,
    page,
    setPage,
    totalUsers,
    fetchUsers,
  } = useContext(UsersContext)!;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalUsers / limit));
  }, [limit, totalUsers]);

  useEffect(() => {
    const skip = (page - 1) * limit;
    if(filterType && filterValue){
      fetchUsers(`/filter?key=${filterType}&value=${filterValue}&limit=${limit}&skip=${skip}`);
    }else{
      fetchUsers(`?limit=${limit}&skip=${skip}`);
    }
  }, [filterValue]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    console.log('event.target.value : ', event.target.value);
    
    setLimit(Number(event.target.value));
    setPage(1); // Reset to page 1 when TableCelle limit changes
  };

  // Handle client-side search
  const handleSearch = (value: string) => {
    setFilteredUsers(
      users.filter((user) =>
        Object.values(user).some((val: any) =>
          val.toString().toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  const handleFiltersChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;
     // Clear users if no filter is applied
    if (!value) {
      setFilterValue('');
      setFilterType('');
    }

    setFilterValue(value);
    setFilterType(type);
  };

  return (
    <Container>
      <Typography variant="h4" component="h4" gutterBottom>
        Home / Users
      </Typography>
      {/* <Box display="flex" flexDirection="column" gap={2}> */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Use Filters component inside a grid item */}
        <Filters
          onSearch={handleSearch}
          limit={limit}
          handleLimitChange={handleLimitChange}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        {["firstName", "userName", "email", "gender", "age", "bloodGroup"].map((field) => (
          <FormControl sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: '48%', md: '32%' } }} key={field}>
            <TextField
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="outlined"
              value={filterType === field ? filterValue : ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFiltersChange(event, field)}
              fullWidth
            />
          </FormControl>
        ))}
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: '100%', sm: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell>FIRST NAME</TableCell>
              <TableCell>LAST NAME</TableCell>
              <TableCell>MAIDEN NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>GENDER</TableCell>
              <TableCell>AGE</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>EYE COLOR</TableCell>
              <TableCell>BLOOD GROUP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
                <TableRow className="loader" >
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
            ) : (
              <>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.maidenName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.eyeColor}</TableCell>
                      <TableCell>{user.bloodGroup}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
      </Box>
    </Container>
  );
};

export default UsersPage;
