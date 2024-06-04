import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TablePagination, TextField, Grid } from '@mui/material';

const ManagemenAkun = () => {
  // State untuk menyimpan data pelanggan dan admin
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [adminAccounts, setAdminAccounts] = useState([
    { id: 1, username: 'admin1', password: 'adminpassword1' },
    { id: 2, username: 'admin2', password: 'adminpassword2' },
    { id: 3, username: 'admin3', password: 'adminpassword3' },
    { id: 4, username: 'admin4', password: 'adminpassword4' },
  ]);

  // Pagination state untuk akun pelanggan
  const [customerPage, setCustomerPage] = useState(0);
  const [customerRowsPerPage, setCustomerRowsPerPage] = useState(3);

  // Pagination state untuk akun admin
  const [adminPage, setAdminPage] = useState(0);
  const [adminRowsPerPage, setAdminRowsPerPage] = useState(3);

  // Search state untuk akun pelanggan
  const [customerSearch, setCustomerSearch] = useState("");

  // Search state untuk akun admin
  const [adminSearch, setAdminSearch] = useState("");

  // Form state untuk menambah pelanggan baru
  const [newCustomer, setNewCustomer] = useState({ Nama: '', Nomor: '' });

  // Form state untuk menambah admin baru
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });

  // State untuk menampilkan form tambah pelanggan atau admin
  const [addCustomerFormVisible, setAddCustomerFormVisible] = useState(false);
  const [addAdminFormVisible, setAddAdminFormVisible] = useState(false);

  // Fetch data pelanggan dari API
  useEffect(() => {
    axios.get('http://localhost:2000/customers')
      .then(response => {
        setCustomerAccounts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customer accounts!", error);
      });
  }, []);

  const handleDeleteCustomer = (id) => {
    const updatedAccounts = customerAccounts.filter(account => account.id !== id);
    setCustomerAccounts(updatedAccounts);
  };

  const handleEditCustomer = (id) => {
    console.log('Edit customer account with id:', id);
  };

  const handleAddCustomer = () => {
    setAddCustomerFormVisible(true);
  };

  const handleDeleteAdmin = (id) => {
    const updatedAccounts = adminAccounts.filter(account => account.id !== id);
    setAdminAccounts(updatedAccounts);
  };

  const handleEditAdmin = (id) => {
    console.log('Edit admin account with id:', id);
  };

  const handleAddAdmin = () => {
    setAddAdminFormVisible(true);
  };

  const handleCustomerPageChange = (event, newPage) => {
    setCustomerPage(newPage);
  };

  const handleCustomerRowsPerPageChange = (event) => {
    setCustomerRowsPerPage(parseInt(event.target.value, 10));
    setCustomerPage(0);
  };

  const handleAdminPageChange = (event, newPage) => {
    setAdminPage(newPage);
  };

  const handleAdminRowsPerPageChange = (event) => {
    setAdminRowsPerPage(parseInt(event.target.value, 10));
    setAdminPage(0);
  };

  const filteredCustomerAccounts = customerAccounts.filter(account =>
    account.Nama?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredAdminAccounts = adminAccounts.filter(account =>
    account.username?.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleSaveNewCustomer = () => {
    axios.post('http://localhost:2000/customers', newCustomer)
      .then(response => {
        // Add new customer to state
        setCustomerAccounts([...customerAccounts, response.data]);
        // Reset form
        setNewCustomer({ Nama: '', Nomor: '' });
        setAddCustomerFormVisible(false);
      })
      .catch(error => {
        console.error("There was an error saving the new customer!", error);
      });
  };

  const handleSaveNewAdmin = () => {
    console.log('Save new admin:', newAdmin);
    // Tambahkan logika untuk menyimpan admin baru ke state atau backend
    // Reset form setelah menyimpan
    setNewAdmin({ username: '', password: '' });
    setAddAdminFormVisible(false);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Kelola Akun Pelanggan
          </Typography>
          <Box mb={2} display="flex" alignItems="center">
            <Button variant="contained" onClick={handleAddCustomer} sx={{ marginRight: 2 }}>Tambah Akun Pelanggan</Button>
          </Box>
          {/* Form untuk menambah pelanggan baru */}
          {addCustomerFormVisible && (
            <Box mb={2}>
              <TextField
                label="Nama"
                variant="outlined"
                value={newCustomer.Nama}
                onChange={(e) => setNewCustomer({ ...newCustomer, Nama: e.target.value })}
              />
              <TextField
                label="Nomor"
                variant="outlined"
                value={newCustomer.Nomor}
                onChange={(e) => setNewCustomer({ ...newCustomer, Nomor: e.target.value })}
              />
              <Button variant="contained" onClick={handleSaveNewCustomer} sx={{ marginLeft: 2 }}>Simpan</Button>
            </Box>
          )}
          <Box mb={2} display="flex" alignItems="center">
            <TextField
              label="Cari"
              variant="outlined"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="customer-account-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nomor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nama</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomerAccounts.slice(customerPage * customerRowsPerPage, customerPage * customerRowsPerPage + customerRowsPerPage).map((account) => (
                  <TableRow key={account.id}>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{account.Nomor}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{account.Nama}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditCustomer(account.id)}
                        sx={{
                          marginRight: 1,
                          '&:hover': {
                            backgroundColor: 'yellow',
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteCustomer(account.id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'red',
                            color: 'white',
                          },
                        }}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={filteredCustomerAccounts.length}
              rowsPerPage={customerRowsPerPage}
              page={customerPage}
              onPageChange={handleCustomerPageChange}
              onRowsPerPageChange={handleCustomerRowsPerPageChange}
            />
          </TableContainer>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Kelola Akun Admin
          </Typography>
          <Box mb={2} display="flex" alignItems="center">
            <Button variant="contained" onClick={handleAddAdmin} sx={{ marginRight: 2 }}>Tambah Akun Admin</Button>
          </Box>
          {/* Form untuk menambah admin baru */}
          {addAdminFormVisible && (
            <Box mb={2}>
              <TextField
                label="Username"
                variant="outlined"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              />
              <TextField
                label="Password"
                variant="outlined"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              />
              <Button variant="contained" onClick={handleSaveNewAdmin} sx={{ marginLeft: 2 }}>Simpan</Button>
            </Box>
          )}
          <Box mb={2} display="flex" alignItems="center">
            <TextField
              label="Cari"
              variant="outlined"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="admin-account-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAdminAccounts.slice(adminPage * adminRowsPerPage, adminPage * adminRowsPerPage + adminRowsPerPage).map((account) => (
                  <TableRow key={account.id}>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{account.username}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{account.password}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditAdmin(account.id)}
                        sx={{
                          marginRight: 1,
                          '&:hover': {
                            backgroundColor: 'yellow',
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteAdmin(account.id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'red',
                            color: 'white',
                          },
                        }}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={filteredAdminAccounts.length}
              rowsPerPage={adminRowsPerPage}
              page={adminPage}
              onPageChange={handleAdminPageChange}
              onRowsPerPageChange={handleAdminRowsPerPageChange}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagemenAkun;
