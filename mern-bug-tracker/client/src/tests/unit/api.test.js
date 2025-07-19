import axios from 'axios';
import { getAllBugs, getBugById, createBug, updateBug, deleteBug } from '../../services/api';

// Mock axios
jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('getAllBugs', () => {
    test('fetches bugs successfully', async () => {
      const mockData = {
        data: {
          success: true,
          count: 2,
          data: [
            { _id: '1', title: 'Bug 1' },
            { _id: '2', title: 'Bug 2' }
          ]
        }
      };
      
      axios.get.mockResolvedValueOnce(mockData);
      
      const result = await getAllBugs();
      
      expect(axios.get).toHaveBeenCalledWith('/api/bugs');
      expect(result).toEqual(mockData.data);
    });
    
    test('handles errors when fetching bugs', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
      
      // Spy on console.error
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      await expect(getAllBugs()).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('/api/bugs');
      expect(console.error).toHaveBeenCalled();
      
      // Restore console.error
      console.error.mockRestore();
    });
  });
  
  describe('getBugById', () => {
    test('fetches a bug by ID successfully', async () => {
      const mockData = {
        data: {
          success: true,
          data: { _id: '123', title: 'Test Bug' }
        }
      };
      
      axios.get.mockResolvedValueOnce(mockData);
      
      const result = await getBugById('123');
      
      expect(axios.get).toHaveBeenCalledWith('/api/bugs/123');
      expect(result).toEqual(mockData.data);
    });
  });
  
  describe('createBug', () => {
    test('creates a bug successfully', async () => {
      const bugData = {
        title: 'New Bug',
        description: 'Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      };
      
      const mockData = {
        data: {
          success: true,
          data: { _id: '123', ...bugData }
        }
      };
      
      axios.post.mockResolvedValueOnce(mockData);
      
      const result = await createBug(bugData);
      
      expect(axios.post).toHaveBeenCalledWith('/api/bugs', bugData);
      expect(result).toEqual(mockData.data);
    });
  });
  
  describe('updateBug', () => {
    test('updates a bug successfully', async () => {
      const bugId = '123';
      const updateData = {
        title: 'Updated Bug',
        status: 'in-progress'
      };
      
      const mockData = {
        data: {
          success: true,
          data: { _id: bugId, ...updateData }
        }
      };
      
      axios.put.mockResolvedValueOnce(mockData);
      
      const result = await updateBug(bugId, updateData);
      
      expect(axios.put).toHaveBeenCalledWith(`/api/bugs/${bugId}`, updateData);
      expect(result).toEqual(mockData.data);
    });
  });
  
  describe('deleteBug', () => {
    test('deletes a bug successfully', async () => {
      const bugId = '123';
      
      const mockData = {
        data: {
          success: true,
          data: {}
        }
      };
      
      axios.delete.mockResolvedValueOnce(mockData);
      
      const result = await deleteBug(bugId);
      
      expect(axios.delete).toHaveBeenCalledWith(`/api/bugs/${bugId}`);
      expect(result).toEqual(mockData.data);
    });
  });
});