
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'; // Import your App component
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import More from './More/More'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
