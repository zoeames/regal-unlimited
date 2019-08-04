import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state= {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggle = this.toggle.bind(this);

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <i className="fas fa-popcorn"></i> Movies
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink tag={RRNavLink} to='/movies/list'>List</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink tag={RRNavLink} to='/movies/new'>New</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            <NavItem>
              <NavLink onClick={this.logMeOut}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="MyNavbar">
        <Navbar color="dark" dark expand="md">
          <Link to="/home" className='navbar-brand'>Regal Unlimited</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
