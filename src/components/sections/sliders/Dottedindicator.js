import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

const slide = [
    { img: '../assets/img/slider-md/md-1.jpg' },
    { img: '../assets/img/slider-md/md-2.jpg' },
    { img: '../assets/img/slider-md/md-3.jpg' },
];

class Dottedindicator extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Slider with Dotted Indicator</h6>
                    </div>
                    <div className="ms-panel-body">
                        <Carousel className="ms-dotted-indicator-slider">
                            {slide.map((item, i) => (
                                <Carousel.Item key={i}>
                                    <img className="d-block w-100" src={item.img} alt="slide" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dottedindicator;