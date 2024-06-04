import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';

const EditKeuangan = () => {
  const { id } = useParams(); // Get the id parameter from the URL

  const [keuangan, setKeuangan] = useState({
    bulan: '',
    tahun: '',
    setor: '',
    listrik: '',
    petugas: '',
    lainLain: '',
    tersimpan: ''
  });

  useEffect(() => {
    // Fetch keuangan data by id from the backend when the component mounts
    const fetchKeuanganById = async () => {
      try {
        const response = await axios.get(`http://localhost:2002/keuangan/${id}`);
        setKeuangan(response.data);
      } catch (error) {
        console.error('Error fetching keuangan data by id:', error);
      }
    };
    fetchKeuanganById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKeuangan({ ...keuangan, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2002/keuangan/${id}`, keuangan);
      console.log('Keuangan data updated successfully!');
      // Redirect back to the original page after editing
      // You can use useHistory hook here if you're not using functional component with React Router
    } catch (error) {
      console.error('Error updating keuangan data:', error);
    }
  };

  return (
    <Box>
      <Card variant="outlined" sx={{ borderWidth: '2px', marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Edit Keuangan
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <Grid container spacing={2} alignItems="flex-end">
              {/* Render input fields for editing */}
              {/* Example: */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Bulan"
                  variant="outlined"
                  name="bulan"
                  value={keuangan.bulan}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Other input fields go here... */}

              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary">
                  Simpan Perubahan
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditKeuangan;
