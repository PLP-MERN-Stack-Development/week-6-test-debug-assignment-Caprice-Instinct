const { validateBugData } = require('../../src/utils/validation');

describe('Bug Validation', () => {
  test('should validate a valid bug', () => {
    const bugData = {
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'open',
      priority: 'medium',
      createdBy: 'Test User'
    };
    
    const { isValid, errors } = validateBugData(bugData);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
  
  test('should invalidate a bug with missing title', () => {
    const bugData = {
      description: 'This is a test bug',
      status: 'open',
      priority: 'medium',
      createdBy: 'Test User'
    };
    
    const { isValid, errors } = validateBugData(bugData);
    expect(isValid).toBe(false);
    expect(errors.title).toBeDefined();
  });
  
  test('should invalidate a bug with title too long', () => {
    const bugData = {
      title: 'A'.repeat(101), // 101 characters
      description: 'This is a test bug',
      status: 'open',
      priority: 'medium',
      createdBy: 'Test User'
    };
    
    const { isValid, errors } = validateBugData(bugData);
    expect(isValid).toBe(false);
    expect(errors.title).toBeDefined();
  });
  
  test('should invalidate a bug with invalid status', () => {
    const bugData = {
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'invalid-status',
      priority: 'medium',
      createdBy: 'Test User'
    };
    
    const { isValid, errors } = validateBugData(bugData);
    expect(isValid).toBe(false);
    expect(errors.status).toBeDefined();
  });
});