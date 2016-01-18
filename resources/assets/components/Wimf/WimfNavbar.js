import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const mapStateToProps = ({ user }) => {
  return {
    user
  };
}

const WimfNavbar = ({ user }) => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">What&apos;s in my Freezer?</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Link Right</NavItem>
        <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default connect(mapStateToProps)(WimfNavbar);