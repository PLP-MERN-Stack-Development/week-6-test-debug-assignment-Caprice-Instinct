const express = require('express');
const {
  getAllBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
} = require('../controllers/bugController');

const router = express.Router();

router.route('/')
  .get(getAllBugs)
  .post(createBug);

router.route('/:id')
  .get(getBug)
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;