import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

//// actions
import { toggleAddForm } from '../../actions/itemForm';

//// components
import {Icon} from '../common/common';

const AddButton = ({clickHandler}) => {
  return <Icon icon='plus-square' onClick={e => {e.preventDefault(); clickHandler();  }} />
};
AddButton.defaultProps = {
  addButtonClickHandler: e => e
};


const mapStateToProps = ({ user }) => {
  return {
    user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addButtonClickHandler: () => {
      dispatch(toggleAddForm());
    }
  };
};

const WimfNavbar = ({ user, addButtonClickHandler }) => (
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
        <NavItem eventKey={1} href="#">
          <AddButton clickHandler={addButtonClickHandler} />
        </NavItem>
        <NavItem eventKey={2} href="/demo" target='_blank'>Demo</NavItem>
        <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} href='/auth/logout'>Logout</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);


export default connect(mapStateToProps, mapDispatchToProps)(WimfNavbar);