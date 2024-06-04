const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Tambahkan cors

const app = express();
const PORT = process.env.PORT || 2001;

app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/meterapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define admin schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Define admin model
const Admin = mongoose.model('Admin', adminSchema);

// Create a new admin
app.post('/admins', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all admins
app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin by ID
app.get('/admins/:id', getAdmin, (req, res) => {
  res.json(res.admin);
});

// Update admin by ID
app.patch('/admins/:id', getAdmin, async (req, res) => {
  if (req.body.username != null) {
    res.admin.username = req.body.username;
  }
  if (req.body.password != null) {
    res.admin.password = req.body.password;
  }
  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete admin by ID
app.delete('/admins/:id', getAdmin, async (req, res) => {
  try {
    await res.admin.deleteOne();
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAdmin(req, res, next) {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.admin = admin;
  next();
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
