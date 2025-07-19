import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div className="container">
        <h1>Bug Tracker</h1>
        <nav>
          <ul style={navStyle}>
            <li>
              <Link to="/" style={linkStyle}>Home</Link>
            </li>
            <li>
              <Link to="/add" style={linkStyle}>Add Bug</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '1rem',
  marginBottom: '1rem'
};

const navStyle = {
  display: 'flex',
  listStyle: 'none'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: '1rem'
};

export default Header;