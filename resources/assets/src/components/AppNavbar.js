import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { fetchUserInfo } from '../redux/modules/user';
import { exportDemoData } from '../redux/modules/containers';


const mapStateToProps = ({ user }) => {
  return {
    user,
    isDemo: user.email === 'demo@demo.com'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    demoExportSelect: () => {
      console.log('demoExportSelect');
      dispatch(exportDemoData());
    },
    dispatch
  };
};

export class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AppNavbar';
    }
    componentDidMount()  {
      const {dispatch} = this.props;
      dispatch(fetchUserInfo());
    }    
    render() {
      const { user, isDemo, demoExportSelect } = this.props;

      return (
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
              { !isDemo && <NavItem eventKey={2} href="/demo" target="_blank">Demo</NavItem> }
              <NavDropdown eventKey={3} title={user.name || ""} id="basic-nav-dropdown">
                {(() => (
                  isDemo ?
                    [<MenuItem key="login" eventKey={3.1} href="/auth/login">Login</MenuItem>,
                    <MenuItem key="register" eventKey={3.2} href="/auth/register">Register</MenuItem>,
                    <MenuItem key="export" eventKey={3.2} href="#" onSelect={() => demoExportSelect()}>Export</MenuItem>] :

                    [<MenuItem key="logout" eventKey={3.1} href="/auth/logout">Logout</MenuItem>,
                    <MenuItem key="export" eventKey={3.2} href="/export">Export</MenuItem>,
                    <MenuItem key="import" eventKey={3.3} href="/import">Import</MenuItem>]
                ))()}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
