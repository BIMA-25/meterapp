import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TablePagination, Grid } from '@mui/material';

const CekTagihan = () => {
  // Dummy data untuk contoh
  const [billingData, setBillingData] = useState([
    { id: 1, nomor: '1', nama: 'Pelanggan 1', bulan: 'Januari', tahun: '2023', habis: '100 kWh', kas: 'Rp. 50.000', tarif: 'Rp. 2.000/kWh', tagihan: 'Rp. 200.000' },
    { id: 2, nomor: '1', nama: 'Pelanggan 2', bulan: 'Februari', tahun: '2023', habis: '150 kWh', kas: 'Rp. 75.000', tarif: 'Rp. 2.000/kWh', tagihan: 'Rp. 300.000' },
    { id: 3, nomor: '1', nama: 'suti', bulan: 'Maret', tahun: '2027', habis: '200 kWh', kas: 'Rp. 100.000', tarif: 'Rp. 2.000/kWh', tagihan: 'Rp. 400.000' },
    { id: 4,nomor: '1',  nama: 'Pelanggan 4', bulan: 'April', tahun: '2023', habis: '250 kWh', kas: 'Rp. 125.000', tarif: 'Rp. 2.000/kWh', tagihan: 'Rp. 500.000' },
  ]);

  // State untuk nilai pencarian
  const [searchNama, setSearchNama] = useState("");
  const [searchBulan, setSearchBulan] = useState("");
  const [searchTahun, setSearchTahun] = useState("");
  const [searchDone, setSearchDone] = useState(false);

  // State untuk pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleSearch = () => {
    if (searchNama.trim() === "") {
      alert("Nama harus diisi!");
      return;
    }
    setSearchDone(true);
    const filteredData = billingData.filter(data => {
      return (
        data.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
        data.bulan.toLowerCase().includes(searchBulan.toLowerCase()) &&
        data.tahun.toLowerCase().includes(searchTahun.toLowerCase())
      );
    });
    setBillingData(filteredData);
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
            Cek Tagihan
          </Typography>
          <Box mb={2} display="flex" alignItems="center">
            <TextField
              label="Nama"
              variant="outlined"
              value={searchNama}
              onChange={(e) => setSearchNama(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <TextField
              label="Bulan"
              variant="outlined"
              value={searchBulan}
              onChange={(e) => setSearchBulan(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <TextField
              label="Tahun"
              variant="outlined"
              value={searchTahun}
              onChange={(e) => setSearchTahun(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>Cari</Button>
          </Box>
          {searchDone && billingData.length > 0 && (
            <TableContainer component={Paper}>
              <Table aria-label="billing-table">
                <TableHead>
                  <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nomor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nama</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Bulan</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tahun</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Habis</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Kas</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tarif</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tagihan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.nomor}</TableCell>
                      <TableCell>{data.nama}</TableCell>
                      <TableCell>{data.bulan}</TableCell>
                      <TableCell>{data.tahun}</TableCell>
                      <TableCell>{data.habis}</TableCell>
                      <TableCell>{data.kas}</TableCell>
                      <TableCell>{data.tarif}</TableCell>
                      <TableCell>{data.tagihan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={billingData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CekTagihan;
