const express = require('express');
const Rental = require('../models/rental');
const { onlyAuthUser } = require('../controllers/users');

const router = express.Router();

router.post('/', onlyAuthUser, async (req, res) => {
  try {
    const rentalData = req.body;

    const createdRental = await Rental.create(rentalData);

    return res.status(201).json(createdRental); // ✅ Return the newly created rental
  } catch (error) {
    res.status(500).json({ message: 'Error creating rental', error });
  }
});

// GET /api/rentals - Fetch all rentals
router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rentals', error });
  }
});

// GET /api/rentals/:id - Fetch a rental by ID
router.get('/:id', async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rental', error });
  }
});

module.exports = router;