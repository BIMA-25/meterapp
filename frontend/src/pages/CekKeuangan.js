import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TablePagination, Grid, TextField } from '@mui/material';

const CekKeuangan = () => {
  // Dummy data untuk contoh
  const [financialData, setFinancialData] = useState([
    { id: 1, bulan: 'Januari', tahun: '2023', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    { id: 2, bulan: 'Februari', tahun: '2023', setor: '60000', listrik: '25000', petugas: '6000', lainLain: '12000', tersimpan: '17000' },
    { id: 14, bulan: 'April', tahun: '2023', setor: '80000', listrik: '35000', petugas: '8000', lainLain: '16000', tersimpan: '21000' },
    { id: 11, bulan: 'Januari', tahun: '2023', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    { id: 211, bulan: 'Februari', tahun: '2023', setor: '60000', listrik: '25000', petugas: '6000', lainLain: '12000', tersimpan: '17000' },
    { id: 31, bulan: 'Maret', tahun: '2023', setor: '70000', listrik: '30000', petugas: '7000', lainLain: '14000', tersimpan: '19000' },
    { id: 1411, bulan: 'April', tahun: '2023', setor: '80000', listrik: '35000', petugas: '8000', lainLain: '16000', tersimpan: '21000' },
    { id: 132, bulan: 'Januari', tahun: '2023', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    { id: 232, bulan: 'Februari', tahun: '2024', setor: '60000', listrik: '25000', petugas: '6000', lainLain: '12000', tersimpan: '17000' },
    { id: 315, bulan: 'Maret', tahun: '2024', setor: '70000', listrik: '30000', petugas: '7000', lainLain: '14000', tersimpan: '19000' },
    { id: 451, bulan: 'April', tahun: '2024', setor: '80000', listrik: '35000', petugas: '8000', lainLain: '16000', tersimpan: '21000' },
    { id: 155, bulan: 'Januari', tahun: '2024', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    { id: 25, bulan: 'Februari', tahun: '2024', setor: '60000', listrik: '25000', petugas: '6000', lainLain: '12000', tersimpan: '17000' },
    { id: 3515, bulan: 'Maret', tahun: '2024', setor: '70000', listrik: '30000', petugas: '7000', lainLain: '14000', tersimpan: '19000' },
    { id: 4155, bulan: 'April', tahun: '2024', setor: '80000', listrik: '35000', petugas: '8000', lainLain: '16000', tersimpan: '21000' },
    { id: 133, bulan: 'Januari', tahun: '2024', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    { id: 248, bulan: 'Februari', tahun: '2024', setor: '60000', listrik: '25000', petugas: '6000', lainLain: '12000', tersimpan: '17000' },
    { id: 3869, bulan: 'Maret', tahun: '2024', setor: '70000', listrik: '30000', petugas: '7000', lainLain: '14000', tersimpan: '19000' },
    { id: 48448, bulan: 'April', tahun: '2024', setor: '80000', listrik: '35000', petugas: '8000', lainLain: '16000', tersimpan: '21000' },
    { id: 18448, bulan: 'Januari', tahun: '2024', setor: '50000', listrik: '20000', petugas: '5000', lainLain: '10000', tersimpan: '15000' },
    // Tambahkan data hingga mencapai 12 baris
  ]);

  // State untuk nilai pencarian
  const [searchTahun, setSearchTahun] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12); // Menetapkan jumlah baris per halaman menjadi 12

  const handleSearch = () => {
    const filteredData = financialData.filter(data => {
      return data.tahun.toLowerCase().includes(searchTahun.toLowerCase());
    });
    setFinancialData(filteredData);
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
            Cek Keuangan
          </Typography>
          <Box mb={2} display="flex" alignItems="center">
            <TextField
              label="Tahun"
              variant="outlined"
              value={searchTahun}
              onChange={(e) => setSearchTahun(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>Cari</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="financial-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bulan</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tahun</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Setor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Listrik</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Petugas</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Lain-lain</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tersimpan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financialData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                  <TableRow key={data.id}>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.bulan}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.tahun}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.setor}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.listrik}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.petugas}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.lainLain}</TableCell>
                    <TableCell sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>{data.tersimpan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[12, 24, 48]}
              component="div"
              count={financialData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CekKeuangan;
