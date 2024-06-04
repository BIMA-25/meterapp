const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Tambahkan cors

const app = express();
const PORT = process.env.PORT || 2002;

// Parse JSON bodies
app.use(bodyParser.json());

// Middleware CORS
app.use(cors()); // Mengizinkan akses dari semua domain, atur opsi jika diperlukan

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/meterapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define keuangan schema
const keuanganSchema = new mongoose.Schema({
  bulan: String,
  tahun: Number,
  setor: Number,
  listrik: Number,
  petugas: Number,
  lain_lain: Number,
  tersimpan: Number
});

// Define keuangan model
const Keuangan = mongoose.model('Keuangan', keuanganSchema);

// Create a new keuangan record
app.post('/keuangan', async (req, res) => {
  try {
    const { bulan, tahun, setor, listrik, petugas, lain_lain, tersimpan } = req.body;
    const keuangan = new Keuangan({ bulan, tahun, setor, listrik, petugas, lain_lain, tersimpan });
    await keuangan.save();
    res.status(201).json(keuangan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all keuangan records
app.get('/keuangan', async (req, res) => {
  try {
    const keuangan = await Keuangan.find();
    res.json(keuangan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get keuangan record by ID
app.get('/keuangan/:id', getKeuangan, (req, res) => {
  res.json(res.keuangan);
});

// Update keuangan record by ID
app.patch('/keuangan/:id', getKeuangan, async (req, res) => {
  const updates = req.body;
  Object.keys(updates).forEach(key => {
    res.keuangan[key] = updates[key];
  });

  try {
    const updatedKeuangan = await res.keuangan.save();
    res.json(updatedKeuangan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete keuangan record by ID
app.delete('/keuangan/:id', getKeuangan, async (req, res) => {
  try {
    await res.keuangan.deleteOne();
    res.json({ message: 'Keuangan record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get keuangan record by ID
async function getKeuangan(req, res, next) {
  let keuangan;
  try {
    keuangan = await Keuangan.findById(req.params.id);
    if (keuangan == null) {
      return res.status(404).json({ message: 'Keuangan record not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.keuangan = keuangan;
  next();
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
