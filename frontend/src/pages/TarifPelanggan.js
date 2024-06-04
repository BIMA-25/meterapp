import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TablePagination, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const TarifPelanggan = () => {
  const [tarifData, setTarifData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentTarif, setCurrentTarif] = useState({ _id: '', tarif: '', kas: '' });

  useEffect(() => {
    fetchTarifData();
  }, []);

  const fetchTarifData = async () => {
    try {
      const response = await axios.get('http://localhost:2003/tarif');
      setTarifData(response.data);
    } catch (error) {
      console.error('Error fetching tarif data:', error);
    }
  };

  const handleEdit = (tarif) => {
    setCurrentTarif(tarif);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentTarif({ ...currentTarif, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(`http://localhost:2003/tarif/${currentTarif._id}`, currentTarif);
      fetchTarifData();
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error saving edited tarif:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Tarif Pelanggan
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="tarif-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tarif</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Kas</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarifData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                  <TableRow key={data._id}>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.tarif}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.kas}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(data)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'yellow',
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={tarifData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Tarif</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tarif"
            type="number"
            fullWidth
            name="tarif"
            value={currentTarif.tarif}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Kas"
            type="number"
            fullWidth
            name="kas"
            value={currentTarif.kas}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TarifPelanggan;
