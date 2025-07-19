import axios from 'axios';

const API_URL = '/api/bugs';

/**
 * Get all bugs
 * @returns {Promise} Promise with bugs data
 */
export const getAllBugs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bugs:', error);
    throw error;
  }
};

/**
 * Get a single bug by ID
 * @param {string} id Bug ID
 * @returns {Promise} Promise with bug data
 */
export const getBugById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bug ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new bug
 * @param {Object} bugData Bug data
 * @returns {Promise} Promise with created bug data
 */
export const createBug = async (bugData) => {
  try {
    const response = await axios.post(API_URL, bugData);
    return response.data;
  } catch (error) {
    console.error('Error creating bug:', error);
    throw error;
  }
};

/**
 * Update a bug
 * @param {string} id Bug ID
 * @param {Object} bugData Updated bug data
 * @returns {Promise} Promise with updated bug data
 */
export const updateBug = async (id, bugData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bugData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bug ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a bug
 * @param {string} id Bug ID
 * @returns {Promise} Promise with deletion status
 */
export const deleteBug = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bug ${id}:`, error);
    throw error;
  }
};