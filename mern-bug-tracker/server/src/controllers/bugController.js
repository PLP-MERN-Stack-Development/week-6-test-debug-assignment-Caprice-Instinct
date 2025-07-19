const Bug = require('../models/Bug');
const { validateBugData } = require('../utils/validation');
const { BadRequestError, NotFoundError } = require('../utils/errors');

/**
 * Get all bugs
 * @route GET /api/bugs
 */
const getAllBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bugs.length, data: bugs });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single bug
 * @route GET /api/bugs/:id
 */
const getBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      throw new NotFoundError(`Bug not found with id of ${req.params.id}`);
    }
    
    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new bug
 * @route POST /api/bugs
 */
const createBug = async (req, res, next) => {
  try {
    // Validate input data
    const { isValid, errors } = validateBugData(req.body);
    
    if (!isValid) {
      throw new BadRequestError(JSON.stringify(errors));
    }
    
    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a bug
 * @route PUT /api/bugs/:id
 */
const updateBug = async (req, res, next) => {
  try {
    let bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      throw new NotFoundError(`Bug not found with id of ${req.params.id}`);
    }
    
    // Validate input data if provided
    if (Object.keys(req.body).length > 0) {
      const { isValid, errors } = validateBugData({
        ...bug.toObject(),
        ...req.body
      });
      
      if (!isValid) {
        throw new BadRequestError(JSON.stringify(errors));
      }
    }
    
    bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a bug
 * @route DELETE /api/bugs/:id
 */
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      throw new NotFoundError(`Bug not found with id of ${req.params.id}`);
    }
    
    await bug.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
};