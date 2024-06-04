import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent } from '@mui/material';

const CatatMeter = () => {
  // State untuk nilai input
  const [nama, setNama] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [habisMeter, setHabisMeter] = useState("");

  // State untuk hasil inputan
  const [inputData, setInputData] = useState([]);

  // State untuk nilai pencarian
  const [searchNama, setSearchNama] = useState("");
  const [searchBulan, setSearchBulan] = useState("");
  const [searchTahun, setSearchTahun] = useState("");

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Menambahkan input ke dalam array inputData
    setInputData([...inputData, { nama, bulan, tahun, habisMeter }]);
    // Reset nilai input setelah disubmit
    resetForm();
  };

  // Fungsi untuk mereset nilai input
  const resetForm = () => {
    setNama("");
    setBulan("");
    setTahun("");
    setHabisMeter("");
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    // Lakukan pencarian berdasarkan nilai searchQuery
    // Anda bisa menambahkan logika pencarian sesuai kebutuhan aplikasi Anda di sini
    console.log("Melakukan pencarian dengan nama:", searchNama, "bulan:", searchBulan, "tahun:", searchTahun);
  };

  // Filter hasil input berdasarkan nilai pencarian
  const filteredData = inputData.filter(item =>
    item.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
    item.bulan.toLowerCase().includes(searchBulan.toLowerCase()) &&
    item.tahun.toLowerCase().includes(searchTahun.toLowerCase())
  );

  return (
    <Box>
      <Card variant="outlined" sx={{ borderWidth: '2px' }}> {/* Menetapkan ketebalan garis tepi */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Catat Meter
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama"
                  variant="outlined"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Bulan"
                  variant="outlined"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Tahun"
                  variant="outlined"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Habis Meter"
                  variant="outlined"
                  value={habisMeter}
                  onChange={(e) => setHabisMeter(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button type="submit" variant="contained" color="primary">
                  Simpan
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Box mt={2}>
        <Card variant="outlined" sx={{ borderWidth: '2px' }}> {/* Menetapkan ketebalan garis tepi */}
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tercatat
            </Typography>
            <Box mt={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Nama"
                    variant="outlined"
                    value={searchNama}
                    onChange={(e) => setSearchNama(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Bulan"
                    variant="outlined"
                    value={searchBulan}
                    onChange={(e) => setSearchBulan(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Tahun"
                    variant="outlined"
                    value={searchTahun}
                    onChange={(e) => setSearchTahun(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" onClick={handleSearch}>
                    Cari
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nomor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nama</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Bulan</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Tahun</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Habis Meter</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.nomor}</TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>{item.bulan}</TableCell>
                        <TableCell>{item.tahun}</TableCell>
                        <TableCell>{item.habisMeter}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CatatMeter;
