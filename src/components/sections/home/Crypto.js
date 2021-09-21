import React from 'react';
import Slider from 'react-slick';

const Crypto = (props) => {


    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        slidesToShow: 7,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 7,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3
                }
            }
        ]
    }
    return (
        <div className="col-md-12">
            <div className="ms-panel">
                <Slider className="ms-panel-body p-0 ms-crypto-overview-slider" {...settings}>
                    {props.specificAssets !== undefined && props.specificAssets !== null ? props.specificAssets.map((item, i) => (
                        <div key={i} className="ms-crypto-overview">
                            <img width={30} height={30} style={{display: 'inline', marginRight: '5px'}} src={item.image} alt=""/>
                            <span>{item.name} <span
                                className={item.performancePercentage > 0 ? 'text-success' : 'text-danger'}>{item.performancePercentage > 0 ? '+' : ''}{item.performancePercentage}%</span></span>
                        </div>
                    )) : null}
                </Slider>
            </div>
        </div>
    );
}

export default Crypto;
