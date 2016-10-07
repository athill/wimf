import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer }  from 'react-router-bootstrap';

import { fetchUserInfo } from '../../redux/modules/user';


const mapStateToProps = ({ user }) => {
  return {
    user,
    isDemo: user.email === 'demo@demo.com'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

class WimfNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'WimfNavbar';
    }
    componentDidMount()  {
      const {dispatch} = this.props;
      dispatch(fetchUserInfo());
    }    
    render() {
      const { user, isDemo } = this.props;

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
              { !isDemo && <NavItem eventKey={2} href="/demo" target='_blank'>Demo</NavItem> }
              <LinkContainer to='/containers'>
                <NavItem>Containers</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
                {(() => (
                  isDemo ?
                    [<MenuItem key='login' eventKey={3.1} href='/auth/login'>Login</MenuItem>,
                    <MenuItem key='register' eventKey={3.1} href='/auth/register'>Register</MenuItem>] :

                    [<MenuItem key='logout' eventKey={3.1} href='/auth/logout'>Logout</MenuItem>]
                ))()}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}


// const WimfNavbar = ({ user, isDemo }) => (
//   <Navbar inverse>
//     <Navbar.Header>
//       <Navbar.Brand>
//         <a href="#">What&apos;s in my Freezer?</a>
//       </Navbar.Brand>
//       <Navbar.Toggle />
//     </Navbar.Header>
//     <Navbar.Collapse>
//       <Nav>
        
//       </Nav>
//       <Nav pullRight>
//         { !isDemo && <NavItem eventKey={2} href="/demo" target='_blank'>Demo</NavItem> }
//         <LinkContainer to='/containers'>
//           <NavItem>Containers</NavItem>
//         </LinkContainer>
//         <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
//           {(() => (
//             isDemo ?
//               [<MenuItem key='login' eventKey={3.1} href='/auth/login'>Login</MenuItem>,
//               <MenuItem key='register' eventKey={3.1} href='/auth/register'>Register</MenuItem>] :

//               [<MenuItem key='logout' eventKey={3.1} href='/auth/logout'>Logout</MenuItem>]
//           ))()}
//         </NavDropdown>
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// );


export default connect(mapStateToProps, mapDispatchToProps)(WimfNavbar);