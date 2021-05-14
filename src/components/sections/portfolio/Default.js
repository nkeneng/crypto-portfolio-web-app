import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import default1 from '../../../assets/img/portfolio/portfolio-sm.jpg';
import default2 from '../../../assets/img/portfolio/portfolio-lg1.jpg';
import default3 from '../../../assets/img/portfolio/portfolio-lg2.jpg';
import default4 from '../../../assets/img/portfolio/portfolio-sm.jpg';
import default5 from '../../../assets/img/portfolio/portfolio-sm.jpg';
import default6 from '../../../assets/img/portfolio/portfolio-lg1.jpg';

const portfolio = [
    {
        photo: default1,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
    {
        photo: default2,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
    {
        photo: default3,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
    {
        photo: default4,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
    {
        photo: default5,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
    {
        photo: default6,
        title: "Minimal Cup with Coffee",
        likes: "(950)",
        comments: "(150)",
    },
]
class Default extends Component {
    render() {
        return (
            <div className="ms-panel">
                <div className="ms-panel-header">
                    <h6>Default Portfolio</h6>
                </div>
                <div className="ms-panel-body">
                    <div className="ms-portfolio card-columns">
                        {portfolio.map((item, i) => (
                            <Link key={i} className="card ms-portfolio-item" to="#">
                                <img src={item.photo} alt="Card" />
                                <div className="ms-portfolio-item-content">
                                    <h4>{item.title}</h4>
                                    <div className="item-content-inner">
                                        <span> <i className="material-icons">thumb_up</i> {item.likes} </span>
                                        <span> <i className="material-icons">chat_bubble</i> {item.comments} </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Default;