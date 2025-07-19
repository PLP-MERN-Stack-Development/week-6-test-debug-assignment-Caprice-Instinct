import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBug, getBugById, updateBug } from '../services/api';

const BugForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    createdBy: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Fetch bug data if in edit mode
  useEffect(() => {
    const fetchBug = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const response = await getBugById(id);
          setFormData(response.data);
          setLoading(false);
        } catch (err) {
          setSubmitError('Failed to fetch bug data. Please try again.');
          setLoading(false);
          console.error('Error fetching bug:', err);
        }
      }
    };
    
    fetchBug();
  }, [id, isEditMode]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot be more than 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot be more than 500 characters';
    }
    
    if (!formData.createdBy.trim()) {
      newErrors.createdBy = 'Your name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setSubmitError('');
      
      if (isEditMode) {
        await updateBug(id, formData);
      } else {
        await createBug(formData);
      }
      
      setLoading(false);
      navigate('/');
    } catch (err) {
      setSubmitError('Failed to save bug. Please try again.');
      setLoading(false);
      console.error('Error saving bug:', err);
    }
  };
  
  if (loading && isEditMode) {
    return <div data-testid="loading">Loading bug data...</div>;
  }
  
  return (
    <div>
      <h2>{isEditMode ? 'Edit Bug' : 'Report New Bug'}</h2>
      
      {submitError && (
        <div className="alert alert-danger" data-testid="submit-error">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} data-testid="bug-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            data-testid="title-input"
          />
          {errors.title && (
            <div className="text-danger" data-testid="title-error">
              {errors.title}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            data-testid="description-input"
          ></textarea>
          {errors.description && (
            <div className="text-danger" data-testid="description-error">
              {errors.description}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            data-testid="status-input"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            className="form-control"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            data-testid="priority-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="createdBy">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            data-testid="created-by-input"
          />
          {errors.createdBy && (
            <div className="text-danger" data-testid="created-by-error">
              {errors.createdBy}
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          data-testid="submit-button"
        >
          {loading ? 'Saving...' : isEditMode ? 'Update Bug' : 'Submit Bug'}
        </button>
      </form>
    </div>
  );
};

export default BugForm;