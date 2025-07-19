import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BugDetails from '../../components/BugDetails';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useNavigate: () => jest.fn()
}));

describe('BugDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders loading state initially', () => {
    // Mock API call but don't resolve it yet
    api.getBugById.mockImplementation(() => new Promise(() => {}));
    
    render(
      <BrowserRouter>
        <BugDetails />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  
  test('renders bug details when loaded successfully', async () => {
    // Mock successful API response
    const mockBug = {
      _id: '123',
      title: 'Test Bug',
      description: 'Test Description',
      status: 'open',
      priority: 'high',
      createdBy: 'Test User',
      createdAt: '2023-04-01T12:00:00.000Z',
      updatedAt: '2023-04-01T12:00:00.000Z'
    };
    
    api.getBugById.mockResolvedValueOnce({ data: mockBug });
    
    render(
      <BrowserRouter>
        <BugDetails />
      </BrowserRouter>
    );
    
    // Wait for bug details to load
    await waitFor(() => {
      expect(screen.getByTestId('bug-details')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText(/Test Description/)).toBeInTheDocument();
    expect(api.getBugById).toHaveBeenCalledWith('123');
  });
  
  test('renders error message when API call fails', async () => {
    // Mock API error
    api.getBugById.mockRejectedValueOnce(new Error('API Error'));
    
    render(
      <BrowserRouter>
        <BugDetails />
      </BrowserRouter>
    );
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
  
  test('renders not found message when bug does not exist', async () => {
    // Mock null bug response
    api.getBugById.mockResolvedValueOnce({ data: null });
    
    render(
      <BrowserRouter>
        <BugDetails />
      </BrowserRouter>
    );
    
    // Wait for not found message
    await waitFor(() => {
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });
  });
});