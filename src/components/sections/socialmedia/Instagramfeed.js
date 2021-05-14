import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const instagramfeed = [
    {
        userimg: '../assets/img/people/people-12.jpg',
        username: 'username24',
        postimg: '../assets/img/misc/misc-2.jpg',
        post: 'website design in progress',
        tags: [
            {
                tag: 'design'
            },
            {
                tag: 'ui'
            },
            {
                tag: 'ux'
            },
            {
                tag: 'website'
            },
        ],
        shareuser: [
            {
                img: '../assets/img/people/people-3.jpg'
            },
            {
                img: '../assets/img/people/people-5.jpg'
            },
        ]
    },
    {
        userimg: '../assets/img/people/people-7.jpg',
        username: 'username24',
        postimg: '../assets/img/misc/misc-4.jpg',
        post: 'website design in progress',
        tags: [
            {
                tag: 'design'
            },
            {
                tag: 'ui'
            },
            {
                tag: 'ux'
            },
            {
                tag: 'website'
            },
        ],
        shareuser: [
            {
                img: '../assets/img/people/people-10.jpg'
            },
            {
                img: '../assets/img/people/people-12.jpg'
            },
        ]
    },
];

class Instagramfeed extends Component {
    render() {
        return (
            <div className="col-xl-4 col-md-12">
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Instagram Feed</h6>
                    </div>
                    <div className="ms-panel-body p-0">
                        <ul className="ms-list ms-feed ms-instagram-feed">
                            {instagramfeed.map((item, i) => (
                                <li key={i} className="ms-list-item">
                                    <div className="media clearfix">
                                        <img src={item.userimg} className="ms-img-round ms-img-small" alt="people" />
                                        <div className="media-body">
                                            <h4 className="ms-feed-user">{item.username}</h4>
                                        </div>
                                    </div>
                                    <img className="ms-fb-feed-img" src={item.postimg} alt="post" />
                                    <div className="d-flex justify-content-between">
                                        <div className="ms-feed-controls">
                                            <i className="material-icons">favorite_border</i>
                                            <i className="material-icons">chat_bubble_outline</i>
                                        </div>
                                    </div>
                                    <ul className="ms-group-members clearfix">
                                        {item.shareuser.slice(0.2).map((item, i) => (
                                            <li key={i}> <img src={item.img} alt="member" /> </li>
                                        ))}
                                        <li className="ms-group-count">
                                            <p>Liked By <span className="ms-text-dark medium">user5</span> and <span className="ms-text-dark medium">37 others</span></p>
                                        </li>
                                    </ul>
                                    <p> <span className="ms-text-dark medium">{item.username}</span> {item.post} </p>
                                    <p> {item.tags.slice(0.4).map((item, i) => (<Link to="#" key={i} className="btn-link">#{item.tag}</Link>))}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instagramfeed;