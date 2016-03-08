import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


const mapStateToProps = ({ user }) => {
  return {
    user,
    isDemo: user.email === 'demo@demo.com'
  };
};

const WimfNavbar = ({ user, isDemo }) => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">What&apos;s in my Freezer?</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        
      </Nav>
      <Nav pullRight>
        { !isDemo && <NavItem eventKey={2} href="/demo" target='_blank'>Demo</NavItem> }
        <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
          {(() => (
            isDemo ?
              [<MenuItem eventKey={3.1} href='/auth/login'>Login</MenuItem>,
              <MenuItem eventKey={3.1} href='/auth/register'>Register</MenuItem>] :

              [<MenuItem eventKey={3.1} href='/auth/logout'>Logout</MenuItem>]
          ))()}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);


export default connect(mapStateToProps)(WimfNavbar);