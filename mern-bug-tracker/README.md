# Bug Tracker Application

A MERN stack application for tracking and managing bugs in software projects. This application demonstrates comprehensive testing and debugging techniques in a full-stack JavaScript environment.

## Features

- Create, read, update, and delete bug reports
- Filter and sort bugs by status and priority
- Responsive UI for desktop and mobile devices
- Comprehensive error handling and validation
- Extensive test coverage

## Technology Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Testing**: Jest, React Testing Library, Supertest

## Project Structure

```
mern-bug-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   └── tests/          # Frontend tests
│   │       ├── unit/       # Unit tests
│   │       └── integration/ # Integration tests
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── tests/              # Backend tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Setup Instructions

1. Clone the repository
   ```
   git clone <repository-url>
   cd mern-bug-tracker
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bug-tracker
   ```

5. Start the development servers
   - For the backend:
     ```
     cd server
     npm run dev
     ```
   - For the frontend:
     ```
     cd client
     npm start
     ```

## Testing

### Backend Tests

Run backend tests:
```
cd server
npm test
```

Generate coverage report:
```
cd server
npm run test:coverage
```

### Frontend Tests

Run frontend tests:
```
cd client
npm test
```

## Debugging Techniques

This project demonstrates several debugging techniques:

1. **Server-side debugging**:
   - Custom error classes for better error identification
   - Comprehensive error middleware
   - Console logging with meaningful context

2. **Client-side debugging**:
   - React Error Boundaries for graceful error handling
   - Component-level error states
   - Console logging with component context

3. **API debugging**:
   - Request/response logging
   - Error status codes and messages
   - Validation error details

## Testing Approach

1. **Unit Testing**:
   - Individual component testing
   - Utility function testing
   - Isolated API controller testing

2. **Integration Testing**:
   - API endpoint testing with database interactions
   - Component interaction testing
   - Form submission and validation testing

3. **Error Handling Testing**:
   - Testing error boundaries
   - Testing API error responses
   - Testing form validation errors

## License

MIT