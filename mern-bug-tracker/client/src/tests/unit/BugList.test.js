import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BugList from '../../components/BugList';
import * as api from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

// Mock BugItem component to simplify testing
jest.mock('../../components/BugItem', () => {
  return function MockBugItem({ bug }) {
    return <div data-testid={`bug-item-${bug._id}`}>{bug.title}</div>;
  };
});

describe('BugList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders loading state initially', () => {
    // Mock API call but don't resolve it yet
    api.getAllBugs.mockImplementation(() => new Promise(() => {}));
    
    render(
      <BrowserRouter>
        <BugList />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  
  test('renders bugs when loaded successfully', async () => {
    // Mock successful API response
    const mockBugs = [
      {
        _id: '1',
        title: 'Bug 1',
        description: 'Description 1',
        status: 'open',
        priority: 'high',
        createdBy: 'User 1'
      },
      {
        _id: '2',
        title: 'Bug 2',
        description: 'Description 2',
        status: 'in-progress',
        priority: 'medium',
        createdBy: 'User 2'
      }
    ];
    
    api.getAllBugs.mockResolvedValueOnce({ data: mockBugs });
    
    render(
      <BrowserRouter>
        <BugList />
      </BrowserRouter>
    );
    
    // Wait for bugs to load
    await waitFor(() => {
      expect(screen.getByTestId('bug-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('bug-item-2')).toBeInTheDocument();
    });
    
    expect(api.getAllBugs).toHaveBeenCalledTimes(1);
  });
  
  test('renders error message when API call fails', async () => {
    // Mock API error
    api.getAllBugs.mockRejectedValueOnce(new Error('API Error'));
    
    render(
      <BrowserRouter>
        <BugList />
      </BrowserRouter>
    );
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
  
  test('renders empty state when no bugs exist', async () => {
    // Mock empty bugs array
    api.getAllBugs.mockResolvedValueOnce({ data: [] });
    
    render(
      <BrowserRouter>
        <BugList />
      </BrowserRouter>
    );
    
    // Wait for no-bugs message
    await waitFor(() => {
      expect(screen.getByTestId('no-bugs-message')).toBeInTheDocument();
    });
  });
});