import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import { Accordion, NavLink } from 'react-bootstrap';

import logo from '../../assets/img/logo.png';

class Sidenav extends Component {
    navToggle = () => {
        document.getElementById('body').classList.toggle('ms-aside-left-open');
        document.getElementById('ms-side-nav').classList.toggle('ms-aside-open');
        document.getElementById('overlayleft').classList.toggle('d-block');
    }
    render() {
        return (
            <Fragment>
                {/* Overlays */}
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" id="overlayleft" data-target="#ms-side-nav" data-toggle="slideLeft" onClick={this.navToggle} />
                {/* Sidebar Navigation Left */}
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/"> <img src={logo} alt="logo" /> </Link>
                    </div>
                    {/* Navigation */} 
                    <Accordion defaultActiveKey="0" className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        {/* Dashboard */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="0" className="has-chevron active">
                                <span><i className="material-icons fs-16">dashboard</i>Dashboard </span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <ul id="dashboard" aria-labelledby="dashboard" data-parent="#side-nav-accordion">
                                    <li> <Link to="/">Crypto Currency</Link> </li>
                                    <li> <Link to="/dashboard/web-analytics"> Web Analytics </Link> </li>
                                    <li> <Link to="/dashboard/social-media">Social Media</Link> </li>
                                    <li> <Link to="/dashboard/project-management">Project Management</Link> </li>
                                    <li> <Link to="/dashboard/client-management">Client Management</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Dashboard */}
                        <li className="menu-item">
                            <Link to="/widgets">
                                <span><i className="material-icons fs-16">widgets</i>Widgets</span>
                            </Link>
                        </li>
                        {/* Basic UI Elements */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="1" className="has-chevron">
                                <span><i className="material-icons fs-16">filter_list</i>Basic UI Elements</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/ui-basic/accordions">Accordions</Link> </li>
                                    <li> <Link to="/ui-basic/alerts">Alerts</Link> </li>
                                    <li> <Link to="/ui-basic/buttons">Buttons</Link> </li>
                                    <li> <Link to="/ui-basic/breadcrumbs">Breadcrumbs</Link> </li>
                                    <li> <Link to="/ui-basic/badges">Badges</Link> </li>
                                    <li> <Link to="/ui-basic/cards">Cards</Link> </li>
                                    <li> <Link to="/ui-basic/progress-bars">Progress Bars</Link> </li>
                                    <li> <Link to="/ui-basic/preloaders">Pre-loaders</Link> </li>
                                    <li> <Link to="/ui-basic/pagination">Pagination</Link> </li>
                                    <li> <Link to="/ui-basic/tabs">Tabs</Link> </li>
                                    <li> <Link to="/ui-basic/typography">Typography</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Basic UI Elements */}
                        {/* Advanced UI Elements */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="2" className="has-chevron">
                                <span><i className="material-icons fs-16">code</i>Advanced UI Element</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/ui-advanced/draggables">Draggables</Link> </li>
                                    <li> <Link to="/ui-advanced/sliders">Sliders</Link> </li>
                                    <li> <Link to="/ui-advanced/modals">Modals</Link> </li>
                                    <li> <Link to="/ui-advanced/rating">Rating</Link> </li>
                                    <li> <Link to="/ui-advanced/tour">Tour</Link> </li>
                                    <li> <Link to="/ui-advanced/cropper">Cropper</Link> </li>
                                    <li> <Link to="/ui-advanced/range-slider">Range Slider</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* /Advanced UI Elements */}
                        <li className="menu-item">
                            <Link to="/animation">
                                <span><i className="material-icons fs-16">format_paint</i>Animations</span>
                            </Link>
                        </li>
                        {/* Form Elements */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="3" className="has-chevron">
                                <span><i className="material-icons fs-16">input</i>Form Elements</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/form/form-elements">Form Elements</Link> </li>
                                    <li> <Link to="/form/form-layout">Form Layouts</Link> </li>
                                    <li> <Link to="/form/form-validation">Form Validation</Link> </li>
                                    <li> <Link to="/form/form-wizard">Form Wizard</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Form Elements */}
                        {/* Charts */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="4" className="has-chevron">
                                <span><i className="material-icons fs-16">equalizer</i>Charts</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/charts/chartjs">Chart JS</Link> </li>
                                    <li> <Link to="/charts/google-charts">Morris Chart</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Charts */}
                        {/* Tables */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="5" className="has-chevron">
                                <span><i className="material-icons fs-16">tune</i>Tables</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/tables/basic-tables">Basic Tables</Link> </li>
                                    <li> <Link to="/tables/data-tables">Data tables</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Tables */}
                        {/* Popups */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="6" className="has-chevron">
                                <span><i className="material-icons fs-16">message</i>Popups</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="6">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/popups/sweet-alerts">Sweet Alerts</Link> </li>
                                    <li> <Link to="/popups/toast">Toast</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Popups */}
                        {/* Icons */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="7" className="has-chevron">
                                <span><i className="material-icons fs-16">border_color</i>Icons</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="7">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/icons/fontawesome">Fontawesome</Link> </li>
                                    <li> <Link to="/icons/flaticons">Flaticons</Link> </li>
                                    <li> <Link to="/icons/materialize">Materialize</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Icons */}
                        {/* Maps */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="8" className="has-chevron">
                                <span><i className="material-icons fs-16">map</i>Maps</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="8">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/maps/google-maps">Google Maps</Link> </li>
                                    <li> <Link to="/maps/vector-maps">Vector Maps</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Maps */}
                        {/*  */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="9" className="has-chevron">
                                <span><i className="material-icons fs-16">insert_drive_file</i>Pages</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="9">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <Accordion>
                                        <li className="menu-item">
                                            <Accordion.Toggle as={NavLink} variant="link" eventKey="10" className="has-chevron">
                                                Authentication
                                        </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="10">
                                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                                    <li> <Link to="/prebuilt-pages/default-login">Default Login</Link> </li>
                                                    <li> <Link to="/prebuilt-pages/modal-login">Modal Login</Link> </li>
                                                    <li> <Link to="/prebuilt-pages/default-register">Default Registration</Link> </li>
                                                    <li> <Link to="/prebuilt-pages/modal-register">Modal Registration</Link> </li>
                                                    <li> <Link to="/prebuilt-pages/lock-screen">Lock Screen</Link> </li>
                                                </ul>
                                            </Accordion.Collapse>
                                        </li>
                                    </Accordion>
                                    <li> <Link to="/prebuilt-pages/coming-soon">Coming Soon</Link> </li>
                                    <li> <Link to="/prebuilt-pages/error">Error Page</Link> </li>
                                    <li className="menu-item"> <Link to="/prebuilt-pages/faq"> FAQ </Link> </li>
                                    <li className="menu-item"> <Link to="/prebuilt-pages/portfolio"> Portfolio </Link> </li>
                                    <li className="menu-item"> <Link to="/prebuilt-pages/user-profile"> User Profile </Link> </li>
                                    <li className="menu-item"> <Link to="/prebuilt-pages/invoice"> Invoice </Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/*  */}
                        {/* Apps */}
                        <li className="menu-item">
                            <Accordion.Toggle as={NavLink} variant="link" eventKey="11" className="has-chevron">
                                <span><i className="material-icons fs-16">phone_iphone</i>Apps</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="11">
                                <ul id="basic-elements" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                    <li> <Link to="/apps/chat">Chat</Link> </li>
                                    <li> <Link to="/apps/email">Email</Link> </li>
                                    <li> <Link to="/apps/to-do-list">To-do List</Link> </li>
                                </ul>
                            </Accordion.Collapse>
                        </li>
                        {/* Apps */}
                    </Accordion>
                </Scrollbar>
            </Fragment>
        );
    }
}

export default Sidenav;