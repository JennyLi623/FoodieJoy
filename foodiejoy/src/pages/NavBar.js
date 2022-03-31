import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import './../css/navbar.css';

class NavBar extends Component {
  render() {
    const { handleLogOut, loggedIn, name } = this.props;
    return (
      <Navbar style={{background: "burlywood"}} variant="dark" expand="lg" className="navbar-wrapper">
        <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>FoodieJoy</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {!loggedIn &&
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
            }
            {!loggedIn &&
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            }
            {loggedIn &&
                <NavLink to="/profile" className="nav-link">{"Hi, "+name}</NavLink>
            }
            {loggedIn &&
                <Nav.Link to="/main" onClick={() => handleLogOut()}>LogOut</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
