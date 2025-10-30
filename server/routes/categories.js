// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Mock categories data - replace with your actual database logic
const categories = [
  { _id: '1', name: 'Technology' },
  { _id: '2', name: 'Travel' },
  { _id: '3', name: 'Food' },
  { _id: '4', name: 'Lifestyle' },
  { _id: '5', name: 'Programming' }
];

// GET /api/categories - Get all categories
router.get('/', (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;