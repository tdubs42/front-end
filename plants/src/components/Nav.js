import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Nav = () => {
  return (
    <Router>
      <nav >
        <div >
          <h1 className='nav-header'>Water Your Plants!</h1>
        </div>
        <div className="navBar">
          <Link to="/">
            My Plants
          </Link>
          <Link to="/">
            Add Plant
          </Link>
          <Link to="/">
            Logout
          </Link>
        </div>
      </nav>
      <br></br>
    </Router>
  );
};

export default Nav;
