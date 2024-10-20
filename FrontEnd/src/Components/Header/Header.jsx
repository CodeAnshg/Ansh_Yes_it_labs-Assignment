import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
      <header>
          <NavLink to="/" className="btn" activeClassName="active">Home</NavLink>
          <NavLink to="/login" className="btn" activeClassName="active">Login</NavLink>
          <NavLink to="/signup" className="btn" activeClassName="active">SignUp</NavLink>
          <NavLink to="/users" className="btn" activeClassName="active">Users</NavLink>
      </header>
  )
}

export default Header;
