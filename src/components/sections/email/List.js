import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavLink } from 'react-bootstrap';
import Scrollbar from 'react-perfect-scrollbar';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emaillist : [
                {
                    img: '../assets/img/people/people-3.jpg',
                    name: 'James Zathila',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-7.jpg',
                    name: 'Jhon Deo',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: true,
                    attachment: true,
                },
                {
                    img: '../assets/img/people/people-8.jpg',
                    name: 'Heather Brown',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-9.jpg',
                    name: 'Anna Wright',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-10.jpg',
                    name: 'Andy Wright',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-11.jpg',
                    name: 'James Anderson',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-12.jpg',
                    name: 'Raymart Sandiago',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-7.jpg',
                    name: 'Micheal John',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                },
                {
                    img: '../assets/img/people/people-8.jpg',
                    name: 'Mila Freign',
                    subject: '[WordPress] New Comment',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc',
                    time: '2 Hours ago',
                    pinned: false,
                    attachment: false,
                }
            ]
        }
    }
    pinnedToggle(item) {
        item.pinned = !item.pinned;
        this.setState({ emaillist: this.state.emaillist })
    }
    render() {
        return (
            <div className="ms-email-content">
                <Scrollbar className="ms-scrollable">
                    {this.state.emaillist.map((item, i) => (
                        <li key={i} className={item.pinned ? 'media ms-email clearfix pinned' : 'media ms-email clearfix'}>
                            <div className="ms-email-controls">
                                <label className="ms-checkbox-wrap">
                                    <input type="checkbox" defaultValue />
                                    <i className="ms-checkbox-check" />
                                </label>
                                <i className="material-icons ms-pin-email" onClick={(e) => this.pinnedToggle(item)}>flag</i>
                            </div>
                            <div className="ms-email-img mr-3 ">
                                <img src={item.img} className="ms-img-round" alt="people" />
                            </div>
                            <div className="media-body ms-email-details">
                                <span className="ms-email-sender">{item.name}</span>
                                <h6 className="ms-email-subject">{item.subject}</h6> <span className="ms-email-time">
                                    {
                                        item.attachment === true ? <Link to="#"><i className="material-icons">attachment</i></Link> : ''
                                    }
                                    {item.time}</span>
                                <p className="ms-email-msg">{item.text}</p>
                            </div>
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle as={NavLink} className="ms-hoverable-dropdown p-0 toggle-icon-none"><i className="material-icons">more_vert</i></Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-right">
                                    <li className="ms-dropdown-list">
                                        <Link className="media p-2" to="#">
                                            <div className="media-body">
                                                <span>Mark as read</span>
                                            </div>
                                        </Link>
                                        <Link className="media p-2 ms-pin-email" to="#">
                                            <div className="media-body">
                                                <span>Flag</span>
                                            </div>
                                        </Link>
                                        <Link className="media p-2" to="#">
                                            <div className="media-body">
                                                <span>Archive</span>
                                            </div>
                                        </Link>
                                        <Link className="media p-2" to="#">
                                            <div className="media-body">
                                                <span>Delete</span>
                                            </div>
                                        </Link>
                                    </li>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ))}
                </Scrollbar>
            </div>
        );
    }
}

export default List;