import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { fetchUserInfo, logout } from '../modules/user';
// import { exportDemoData } from '../redux/modules/containers';


const mapStateToProps = ({ user }) => {
  return {
    user,
    isDemo: user.email === 'demo@demo.com'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // demoExportSelect: () => {
    //   console.log('demoExportSelect');
    //   dispatch(exportDemoData());
    // },
    logoutUser: () => dispatch(logout()), 
    dispatch
  };
};

class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AppNavbar';
    }
    componentDidMount()  {
      const {dispatch, user} = this.props;
      if (user.authenticated) {
        dispatch(fetchUserInfo());
      }
    }    
    render() {
      const { user, isDemo, logoutUser, demoExportSelect } = this.props;
      console.log('user', user);
      return (
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">What&apos;s in my Freezer?</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

            </Nav>
            <Nav pullRight>
              { !isDemo &&  <NavItem eventKey={2} href="/demo" target="_blank">Demo</NavItem> }
              { !user.authenticated ? 
                <LinkContainer key="register" to="/register"><NavItem eventKey={3.2}>Register</NavItem></LinkContainer> : 
                <NavDropdown eventKey={3} title={user.name || ""} id="basic-nav-dropdown">
                  {
                    isDemo ?
                      [<LinkContainer key="login" to="/login"><MenuItem eventKey={3.1}>Login</MenuItem></LinkContainer>,
                      <LinkContainer key="register" to="/register"><MenuItem eventKey={3.2}>Register</MenuItem></LinkContainer>,
                      <MenuItem key="export" eventKey={3.2} href="#" onSelect={() => demoExportSelect()}>Export</MenuItem>] :

                      [<MenuItem key="logout" eventKey={3.1} href="#" onSelect={() => logoutUser()}>Logout</MenuItem>,
                      <LinkContainer key="export" to="/export"><MenuItem eventKey={3.2}>Export</MenuItem></LinkContainer>,
                      <LinkContainer key="import" to="/import"><MenuItem eventKey={3.3}>Import</MenuItem></LinkContainer>]
                  }
                </NavDropdown>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
