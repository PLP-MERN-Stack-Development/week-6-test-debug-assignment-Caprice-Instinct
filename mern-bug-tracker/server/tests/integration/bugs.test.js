const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/index');
const Bug = require('../../src/models/Bug');

// Import test setup
require('../setup');

describe('Bug API', () => {
  describe('GET /api/bugs', () => {
    test('should get all bugs', async () => {
      // Create test bugs
      await Bug.create([
        {
          title: 'Test Bug 1',
          description: 'Test Description 1',
          status: 'open',
          priority: 'high',
          createdBy: 'Test User'
        },
        {
          title: 'Test Bug 2',
          description: 'Test Description 2',
          status: 'in-progress',
          priority: 'medium',
          createdBy: 'Test User'
        }
      ]);
      
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
    
    test('should return empty array when no bugs exist', async () => {
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
  });
  
  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const bugData = {
        title: 'New Bug',
        description: 'New Bug Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(bugData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(bugData.title);
      
      // Verify bug was saved to database
      const bug = await Bug.findById(res.body.data._id);
      expect(bug).toBeTruthy();
    });
    
    test('should return 400 if validation fails', async () => {
      const bugData = {
        // Missing title
        description: 'New Bug Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(bugData);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    test('should return 400 if status is invalid', async () => {
      const bugData = {
        title: 'Test Bug',
        description: 'Test Description',
        status: 'invalid-status', // Invalid status
        priority: 'high',
        createdBy: 'Test User'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(bugData);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('GET /api/bugs/:id', () => {
    test('should get a single bug', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      });
      
      const res = await request(app).get(`/api/bugs/${bug._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(bug._id.toString());
    });
    
    test('should return 404 if bug not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/bugs/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      });
      
      const updateData = {
        title: 'Updated Bug',
        status: 'in-progress'
      };
      
      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(updateData.title);
      expect(res.body.data.status).toBe(updateData.status);
      expect(res.body.data.description).toBe(bug.description); // Unchanged field
      
      // Verify bug was updated in database
      const updatedBug = await Bug.findById(bug._id);
      expect(updatedBug.title).toBe(updateData.title);
      expect(updatedBug.status).toBe(updateData.status);
    });
    
    test('should return 404 if bug to update not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/bugs/${fakeId}`)
        .send({ title: 'Updated Bug' });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    test('should return 400 if update data is invalid', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      });
      
      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send({ status: 'invalid-status' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        createdBy: 'Test User'
      });
      
      const res = await request(app).delete(`/api/bugs/${bug._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      // Verify bug was deleted from database
      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });
    
    test('should return 404 if bug to delete not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/bugs/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});