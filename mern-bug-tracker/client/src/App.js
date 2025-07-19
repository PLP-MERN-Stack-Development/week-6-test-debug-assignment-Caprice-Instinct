import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BugList from './components/BugList';
import BugForm from './components/BugForm';
import BugDetails from './components/BugDetails';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<BugList />} />
            <Route path="/add" element={<BugForm />} />
            <Route path="/edit/:id" element={<BugForm />} />
            <Route path="/bug/:id" element={<BugDetails />} />
          </Routes>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;