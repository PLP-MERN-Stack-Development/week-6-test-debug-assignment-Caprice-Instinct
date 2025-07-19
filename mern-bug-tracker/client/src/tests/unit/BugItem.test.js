import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BugItem from '../../components/BugItem';

// Mock bug data
const mockBug = {
  _id: '123',
  title: 'Test Bug',
  description: 'This is a test bug',
  status: 'open',
  priority: 'high',
  createdBy: 'Test User'
};

// Mock delete function
const mockDelete = jest.fn();

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BugItem Component', () => {
  test('renders bug information correctly', () => {
    renderWithRouter(<BugItem bug={mockBug} onDelete={mockDelete} />);
    
    // Check if bug details are displayed
    expect(screen.getByText(mockBug.title)).toBeInTheDocument();
    expect(screen.getByText(mockBug.description)).toBeInTheDocument();
    expect(screen.getByText(`Reported by: ${mockBug.createdBy}`)).toBeInTheDocument();
    expect(screen.getByTestId('status-badge')).toHaveTextContent(mockBug.status);
    expect(screen.getByTestId('priority-badge')).toHaveTextContent(`${mockBug.priority} priority`);
  });
  
  test('calls delete function when delete button is clicked', () => {
    renderWithRouter(<BugItem bug={mockBug} onDelete={mockDelete} />);
    
    // Click delete button
    fireEvent.click(screen.getByTestId('delete-bug-btn'));
    
    // Check if delete function was called
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
  
  test('renders correct links for view and edit', () => {
    renderWithRouter(<BugItem bug={mockBug} onDelete={mockDelete} />);
    
    // Check if links have correct hrefs
    const viewLink = screen.getByTestId('view-bug-btn');
    const editLink = screen.getByTestId('edit-bug-btn');
    
    expect(viewLink).toHaveAttribute('href', `/bug/${mockBug._id}`);
    expect(editLink).toHaveAttribute('href', `/edit/${mockBug._id}`);
  });
});