const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const marioModel = require('../models/marioModel');

// GET all Mario characters
router.get('/', async (req, res, next) => {
  try {
    const marios = await marioModel.find();
    res.json(marios);
  } catch (err) {
    next(err);
  }
});

// GET a Mario character by id
router.get('/:id', async (req, res, next) => {
  try {
    const mario = await marioModel.findById(req.params.id);
    if (!mario) return res.status(400).json({ message: 'Mario character not found' });
    res.json(mario);
  } catch (err) {
    next(err);
  }
});

// CREATE a Mario character
router.post('/', [
  body('name').notEmpty(),
  body('weight').isNumeric(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Name or weight is missing' });
  }
  try {
    const mario = new marioModel({
      name: req.body.name,
      weight: req.body.weight,
    });
    await mario.save();
    res.status(201).json(mario);
  } catch (err) {
    next(err);
  }
});

// UPDATE a Mario character by id
router.patch('/:id', [
  body('name').optional().notEmpty(),
  body('weight').optional().isNumeric(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid suggested changes' });
  }
  try {
    const mario = await marioModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mario) return res.status(400).json({ message: 'Mario character not found' });
    res.json(mario);
  } catch (err) {
    next(err);
  }
});

// DELETE a Mario character by id
router.delete('/:id', async (req, res, next) => {
  try {
    const mario = await marioModel.findByIdAndDelete(req.params.id);
    if (!mario) return res.status(400).json({ message: 'Mario character not found' });
    res.json({ message: 'Character deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;