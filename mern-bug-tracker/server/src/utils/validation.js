/**
 * Validates bug data
 * @param {Object} bugData - The bug data to validate
 * @returns {Object} - Object containing validation errors or empty if valid
 */
const validateBugData = (bugData) => {
  const errors = {};

  // Validate title
  if (!bugData.title) {
    errors.title = 'Title is required';
  } else if (bugData.title.length > 100) {
    errors.title = 'Title cannot be more than 100 characters';
  }

  // Validate description
  if (!bugData.description) {
    errors.description = 'Description is required';
  } else if (bugData.description.length > 500) {
    errors.description = 'Description cannot be more than 500 characters';
  }

  // Validate status
  if (bugData.status && !['open', 'in-progress', 'resolved'].includes(bugData.status)) {
    errors.status = 'Status must be one of: open, in-progress, resolved';
  }

  // Validate priority
  if (bugData.priority && !['low', 'medium', 'high'].includes(bugData.priority)) {
    errors.priority = 'Priority must be one of: low, medium, high';
  }

  // Validate createdBy
  if (!bugData.createdBy) {
    errors.createdBy = 'Creator name is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateBugData
};