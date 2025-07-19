import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BugForm from '../../components/BugForm';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');
// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: undefined }),
  useNavigate: () => jest.fn()
}));

describe('BugForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders form with empty fields in create mode', () => {
    render(
      <BrowserRouter>
        <BugForm />
      </BrowserRouter>
    );
    
    // Check if form elements are rendered
    expect(screen.getByTestId('bug-form')).toBeInTheDocument();
    expect(screen.getByTestId('title-input')).toHaveValue('');
    expect(screen.getByTestId('description-input')).toHaveValue('');
    expect(screen.getByTestId('status-input')).toHaveValue('open');
    expect(screen.getByTestId('priority-input')).toHaveValue('medium');
    expect(screen.getByTestId('created-by-input')).toHaveValue('');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit Bug');
  });
  
  test('validates form fields on submission', async () => {
    render(
      <BrowserRouter>
        <BugForm />
      </BrowserRouter>
    );
    
    // Submit form without filling required fields
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check if validation errors are displayed
    await waitFor(() => {
      expect(screen.getByTestId('title-error')).toBeInTheDocument();
      expect(screen.getByTestId('description-error')).toBeInTheDocument();
      expect(screen.getByTestId('created-by-error')).toBeInTheDocument();
    });
    
    // API should not be called
    expect(api.createBug).not.toHaveBeenCalled();
  });
  
  test('submits form with valid data', async () => {
    // Mock successful API call
    api.createBug.mockResolvedValueOnce({ data: {} });
    
    render(
      <BrowserRouter>
        <BugForm />
      </BrowserRouter>
    );
    
    // Fill out form
    fireEvent.change(screen.getByTestId('title-input'), {
      target: { name: 'title', value: 'Test Bug' }
    });
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { name: 'description', value: 'This is a test bug' }
    });
    fireEvent.change(screen.getByTestId('status-input'), {
      target: { name: 'status', value: 'in-progress' }
    });
    fireEvent.change(screen.getByTestId('priority-input'), {
      target: { name: 'priority', value: 'high' }
    });
    fireEvent.change(screen.getByTestId('created-by-input'), {
      target: { name: 'createdBy', value: 'Test User' }
    });
    
    // Submit form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check if API was called with correct data
    await waitFor(() => {
      expect(api.createBug).toHaveBeenCalledWith({
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'in-progress',
        priority: 'high',
        createdBy: 'Test User'
      });
    });
  });
});