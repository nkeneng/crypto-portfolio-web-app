import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Navbar from '../layouts/Navbar';
import Content from '../sections/home/Content';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags> 
                    <title>Mystic | Homepage</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body  ms-dark-theme " id="body">
                    <main className="body-content">
                        <Navbar/>
                        <Content/>
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default Home;