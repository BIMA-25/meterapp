const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Tambahkan cors

const app = express();
const PORT = process.env.PORT || 2003;

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

// Define tarif schema
const tarifSchema = new mongoose.Schema({
  tarif: Number,
  kas: Number
});

// Define tarif model
const Tarif = mongoose.model('Tarif', tarifSchema);

// Create a new tarif record
app.post('/tarif', async (req, res) => {
  try {
    const { tarif, kas } = req.body;
    const newTarif = new Tarif({ tarif, kas });
    await newTarif.save();
    res.status(201).json(newTarif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tarif records
app.get('/tarif', async (req, res) => {
  try {
    const tarifRecords = await Tarif.find();
    res.json(tarifRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tarif record by ID
app.get('/tarif/:id', getTarif, (req, res) => {
  res.json(res.tarif);
});

// Update tarif record by ID
app.patch('/tarif/:id', getTarif, async (req, res) => {
  const updates = req.body;
  Object.keys(updates).forEach(key => {
    res.tarif[key] = updates[key];
  });

  try {
    const updatedTarif = await res.tarif.save();
    res.json(updatedTarif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete tarif record by ID
app.delete('/tarif/:id', getTarif, async (req, res) => {
  try {
    await res.tarif.deleteOne();
    res.json({ message: 'Tarif record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get tarif record by ID
async function getTarif(req, res, next) {
  let tarif;
  try {
    tarif = await Tarif.findById(req.params.id);
    if (tarif == null) {
      return res.status(404).json({ message: 'Tarif record not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.tarif = tarif;
  next();
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});