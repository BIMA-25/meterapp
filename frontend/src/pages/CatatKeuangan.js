import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent } from '@mui/material';
import axios from 'axios';

const CatatKeuangan = () => {
  // State untuk menyimpan data keuangan dari API
  const [keuanganData, setKeuanganData] = useState([]);
  
  // State untuk nilai input
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [setor, setSetor] = useState("");
  const [listrik, setListrik] = useState("");
  const [petugas, setPetugas] = useState("");
  const [lain_lain, setLainLain] = useState("");
  const [tersimpan, setTersimpan] = useState("");
  
  // State untuk nilai pencarian
  const [searcBulan, setsearcBulan] = useState("");
  const [searchTahun, setSearchTahun] = useState("");

  // State untuk menyimpan ID data yang sedang diedit
  const [editedId, setEditedId] = useState(null);

  // Fungsi untuk mengambil data keuangan dari API
  const fetchKeuanganData = async () => {
    try {
      const response = await axios.get('http://localhost:2002/keuangan');
      setKeuanganData(response.data);
    } catch (error) {
      console.error('Error fetching keuangan data:', error);
    }
  };

  // Panggil fungsi fetchKeuanganData saat komponen dimuat pertama kali
  useEffect(() => {
    fetchKeuanganData();
  }, []);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editedId) {
        // Jika ada editedId, artinya kita sedang dalam mode pengeditan data
        const response = await axios.patch(`http://localhost:2002/keuangan/${editedId}`, {
          bulan,
          tahun,
          setor,
          listrik,
          petugas,
          lain_lain,
          tersimpan
        });

        if (response.status === 200) {
          console.log('Data keuangan berhasil diperbarui!');
          fetchKeuanganData(); // Ambil ulang data keuangan setelah berhasil diperbarui
          resetForm(); // Reset form setelah berhasil diperbarui
          setEditedId(null); // Reset editedId setelah berhasil diperbarui
        } else {
          console.error('Gagal memperbarui data keuangan');
        }
      } else {
        // Jika tidak ada editedId, artinya kita sedang dalam mode penambahan data baru
        const response = await axios.post('http://localhost:2002/keuangan', {
          bulan,
          tahun,
          setor,
          listrik,
          petugas,
          lain_lain,
          tersimpan
        });

        if (response.status === 201) {
          console.log('Data keuangan berhasil disimpan!');
          fetchKeuanganData(); // Ambil ulang data keuangan setelah berhasil disimpan
          resetForm(); // Reset form setelah berhasil disimpan
        } else {
          console.error('Gagal menyimpan data keuangan');
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  // Fungsi untuk mereset nilai input
  const resetForm = () => {
    setBulan("");
    setTahun("");
    setSetor("");
    setListrik("");
    setPetugas("");
    setLainLain("");
    setTersimpan("");
  };

  // Fungsi untuk menangani edit data
  const handleEdit = (id) => {
    // Logika untuk mengedit data
    console.log("Mengedit data dengan id:", id);
    // Set editedId ke ID data yang sedang diedit
    setEditedId(id);
    // Ambil data yang sedang diedit berdasarkan ID
    const editedData = keuanganData.find(item => item._id === id);
    // Isi nilai input dengan data yang sedang diedit
    setBulan(editedData.bulan);
    setTahun(editedData.tahun);
    setSetor(editedData.setor);
    setListrik(editedData.listrik);
    setPetugas(editedData.petugas);
    setLainLain(editedData.lain_lain);
    setTersimpan(editedData.tersimpan);
  };

  // Filter hasil input berdasarkan nilai pencarian
  const filteredData = keuanganData.filter(item =>
    (searcBulan === "" || item.bulan?.toLowerCase().includes(searcBulan.toLowerCase())) &&
    (searchTahun === "" || item.tahun.toString().includes(searchTahun))
  );

  return (
    <Box>
      <Card variant="outlined" sx={{ borderWidth: '2px', marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Catat Keuangan
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Bulan"
                  variant="outlined"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tahun"
                  variant="outlined"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Setor"
                  variant="outlined"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Listrik"
                  variant="outlined"
                  value={listrik}
                  onChange={(e) => setListrik(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Petugas"
                  variant="outlined"
                  value={petugas}
                  onChange={(e) => setPetugas(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Lain-lain"
                  variant="outlined"
                  value={lain_lain}
                  onChange={(e) => setLainLain(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tersimpan"
                  variant="outlined"
                  value={tersimpan}
                  onChange={(e) =>setTersimpan(e.target.value)}
                  required // input wajib diisi
                />
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary">
                  {editedId ? 'Update' : 'Simpan'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ borderWidth: '2px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pencarian
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Bulan"
                variant="outlined"
                value={searcBulan}
                onChange={(e) => setsearcBulan(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Tahun"
                variant="outlined"
                value={searchTahun}
                onChange={(e) => setSearchTahun(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bulan</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tahun</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Setor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Listrik</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Petugas</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Lain-lain</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tersimpan</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.bulan}</TableCell>
                    <TableCell>{item.tahun}</TableCell>
                    <TableCell>{item.setor}</TableCell>
                    <TableCell>{item.listrik}</TableCell>
                    <TableCell>{item.petugas}</TableCell>
                    <TableCell>{item.lain_lain}</TableCell>
                    <TableCell>{item.tersimpan}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleEdit(item._id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Box>
  );
};

export default CatatKeuangan;

