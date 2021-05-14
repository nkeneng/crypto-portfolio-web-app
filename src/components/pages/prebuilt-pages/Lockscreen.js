import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../../sections/lockscreen/Content';

class Lockscreen extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags> 
                    <title>Mystic | Lock Screen</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body ms-primary-theme" id="body">
                    <Content/>
                </div>
            </Fragment>
        );
    }
}

export default Lockscreen;