const mongoose = require('mongoose');

const HabisMeterSchema = new mongoose.Schema({
    bulan: Number,
    tahun: Number,
    habis: Number,
    kas: Number,
    tarif: Number,
    tagihan: Number
});

const CustomerSchema = new mongoose.Schema({
    nomor: Number,
    nama: String,
    habismeter: [HabisMeterSchema]
});

module.exports = mongoose.model('Customer', CustomerSchema);
