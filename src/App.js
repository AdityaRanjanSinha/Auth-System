import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import './App.css'
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


