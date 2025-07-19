import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBugs, deleteBug } from '../services/api';
import BugItem from './BugItem';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bugs on component mount
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const response = await getAllBugs();
        setBugs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bugs. Please try again later.');
        setLoading(false);
        console.error('Error fetching bugs:', err);
      }
    };

    fetchBugs();
  }, []);

  // Handle bug deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(id);
        // Update state to remove deleted bug
        setBugs(bugs.filter(bug => bug._id !== id));
      } catch (err) {
        setError('Failed to delete bug. Please try again.');
        console.error('Error deleting bug:', err);
      }
    }
  };

  // Intentional bug for debugging practice:
  // Uncomment to test error boundary
  // if (bugs.length > 0) {
  //   throw new Error('Intentional error for debugging practice');
  // }

  if (loading) {
    return <div data-testid="loading">Loading bugs...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" data-testid="error">{error}</div>;
  }

  return (
    <div data-testid="bug-list">
      <h2>Bug List</h2>
      <Link to="/add" className="btn btn-primary" data-testid="add-bug-btn">
        Add New Bug
      </Link>
      
      {bugs.length === 0 ? (
        <p data-testid="no-bugs-message">No bugs found. Add a new bug to get started.</p>
      ) : (
        <div className="bug-list">
          {bugs.map(bug => (
            <BugItem 
              key={bug._id} 
              bug={bug} 
              onDelete={() => handleDelete(bug._id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BugList;