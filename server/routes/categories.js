const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { categorySchema } = require('../validators/categoryValidator');

// GET all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// CREATE new category
router.post('/', async (req, res, next) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

module.exports = router;