import React from 'react';
import { Link } from 'react-router-dom';

const BugItem = ({ bug, onDelete }) => {
  // Get appropriate status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'open':
        return '#e74c3c'; // Red
      case 'in-progress':
        return '#f39c12'; // Orange
      case 'resolved':
        return '#2ecc71'; // Green
      default:
        return '#7f8c8d'; // Gray
    }
  };

  // Get appropriate priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c'; // Red
      case 'medium':
        return '#f39c12'; // Orange
      case 'low':
        return '#3498db'; // Blue
      default:
        return '#7f8c8d'; // Gray
    }
  };

  return (
    <div className="card" data-testid="bug-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
          <p>Reported by: {bug.createdBy}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <span 
              style={{ 
                backgroundColor: getStatusBadgeColor(bug.status),
                color: 'white',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}
              data-testid="status-badge"
            >
              {bug.status}
            </span>
            <span 
              style={{ 
                backgroundColor: getPriorityBadgeColor(bug.priority),
                color: 'white',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}
              data-testid="priority-badge"
            >
              {bug.priority} priority
            </span>
          </div>
        </div>
        <div>
          <Link 
            to={`/bug/${bug._id}`} 
            className="btn btn-primary"
            data-testid="view-bug-btn"
          >
            View
          </Link>
          <Link 
            to={`/edit/${bug._id}`} 
            className="btn btn-success"
            data-testid="edit-bug-btn"
          >
            Edit
          </Link>
          <button 
            onClick={onDelete} 
            className="btn btn-danger"
            data-testid="delete-bug-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugItem;