import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

// Create a component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Suppress console errors during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary Component', () => {
  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  
  test('renders fallback UI when error occurs', () => {
    // We need to suppress the error boundary warning in the test
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    // Check if fallback UI is rendered
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('The application encountered an unexpected error.')).toBeInTheDocument();
    
    // Clean up
    console.error.mockRestore();
  });
});