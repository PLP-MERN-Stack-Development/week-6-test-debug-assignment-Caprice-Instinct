import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBugById, deleteBug } from '../services/api';

const BugDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBug = async () => {
      try {
        setLoading(true);
        const response = await getBugById(id);
        setBug(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bug details. Please try again later.');
        setLoading(false);
        console.error('Error fetching bug details:', err);
      }
    };
    
    fetchBug();
  }, [id]);
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete bug. Please try again.');
        console.error('Error deleting bug:', err);
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  if (loading) {
    return <div data-testid="loading">Loading bug details...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger" data-testid="error">{error}</div>;
  }
  
  if (!bug) {
    return <div className="alert alert-danger" data-testid="not-found">Bug not found</div>;
  }
  
  return (
    <div className="bug-details" data-testid="bug-details">
      <h2>{bug.title}</h2>
      
      <div className="card">
        <div className="bug-info">
          <p><strong>Description:</strong> {bug.description}</p>
          <p><strong>Status:</strong> {bug.status}</p>
          <p><strong>Priority:</strong> {bug.priority}</p>
          <p><strong>Reported by:</strong> {bug.createdBy}</p>
          <p><strong>Created:</strong> {formatDate(bug.createdAt)}</p>
          <p><strong>Last Updated:</strong> {formatDate(bug.updatedAt)}</p>
        </div>
        
        <div className="bug-actions" style={{ marginTop: '1rem' }}>
          <Link 
            to={`/edit/${bug._id}`} 
            className="btn btn-success"
            data-testid="edit-button"
          >
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            data-testid="delete-button"
          >
            Delete
          </button>
          <Link 
            to="/" 
            className="btn"
            data-testid="back-button"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BugDetails;