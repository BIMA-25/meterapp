const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// CREATE
router.post('/', async (req, res) => {
    const customer = new Customer(req.body);
    try {
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer);
});

// UPDATE
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.nomor != null) {
        res.customer.nomor = req.body.nomor;
    }
    if (req.body.nama != null) {
        res.customer.nama = req.body.nama;
    }
    if (req.body.habismeter != null && req.body.habismeter instanceof Object) {
        res.customer.habismeter.push(req.body.habismeter);
    }
    try {
        const updatedCustomer = await res.customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', getCustomer, async (req, res) => {
    try {
        await res.customer.deleteOne();
        res.json({ message: 'Deleted Customer' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCustomer(req, res, next) {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.customer = customer;
    next();
}

module.exports = router;
