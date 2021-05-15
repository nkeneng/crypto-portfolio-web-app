import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavLink } from 'react-bootstrap';
import logosmdark from '../../assets/img/logo-sm-dark.png';
import people5 from '../../assets/img/people/people-5.jpg';

class Navbar extends Component {

    render() {
        const {isAuthenticated,userData, logout} = this.props;

        return (
            <nav className="navbar ms-navbar">
                <div className="ms-aside-toggler ms-toggler pl-0" data-target="#ms-side-nav" data-toggle="slideLeft" onClick={this.navToggle}>
                </div>
                <div className="logo-sn logo-sm ms-d-block-sm">
                    <Link className="pl-0 ml-0 text-center navbar-brand mr-0" to="/"><img src={logosmdark} alt="logo" /> </Link>
                </div>
                <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
                    <Dropdown className="ms-nav-item ms-nav-user">
                        <Dropdown.Toggle as={NavLink} id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 toggle-icon-none"> <img className="ms-user-img ms-img-round float-right" src={people5} alt="people" /> </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                            <li className="dropdown-menu-header">
                                <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome,{userData != null  ? userData.name:''}</span></h6>
                            </li>
                            <li className="dropdown-divider" />
                            <li className="ms-dropdown-list">
                                <Link className="media fs-14 p-2" to="/prebuilt-pages/user-profile"> <span><i className="flaticon-gear mr-2" /> Account Settings</span> </Link>
                            </li>
                            <li className="dropdown-divider" />
                            <li className="dropdown-menu-footer">
                                <a className="media fs-14 p-2" onClick={logout}> <span><i className="flaticon-shut-down mr-2" /> Logout</span> </a>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </nav>
        );
    }
}

export default Navbar;