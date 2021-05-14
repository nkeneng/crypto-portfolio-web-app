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
        photo: default5,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
    {
        photo: default2,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
    {
        photo: default3,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
    {
        photo: default4,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
    {
        photo: default1,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
    {
        photo: default6,
        name: "Minimal Cup with Coffee",
        desc: "Portfolio - Showcase",
    },
]
class Minimal extends Component {
    render() {
        return (
            <div className="ms-panel">
                <div className="ms-panel-header">
                    <h6>Minimal Portfolio</h6>
                </div>
                <div className="ms-panel-body">
                    <div className="ms-portfolio ms-portfolio-minimal card-columns">
                        {portfolio.map((item, i) => (
                            <Link key={i} className="card ms-portfolio-item" to="#">
                                <img src={item.photo} alt="Card" />
                                <div className="ms-portfolio-item-content">
                                    <h4>{item.name}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Minimal;