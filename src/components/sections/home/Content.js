import React, { Component } from 'react';
import Infographics from './Infographics';
import Crypto from './Crypto';
import Bitcoingraph from './Bitcoingraph';
import Highlightsy from './Highlightsy';
import Orders from './Orders';
import Activeorders from './Activeorders';
import Orderstable from './Orderstable';
import Scatterchart from './Scatterchart';
import Marketpos from './Marketpos';
import Statistics
    from "../projectmanagement/Statistics";

class Content extends Component {
    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <Statistics/>
                    <Crypto/>
                    <Infographics/>
                    <Bitcoingraph/>
                    <Activeorders/>
                    <Orderstable/>
                </div>
            </div>
        );
    }
}

export default Content;