const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Tambahkan cors


const app = express();
const port = 2000;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/meterapp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());

const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
