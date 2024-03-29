import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Setting from '../../layouts/Setting';
import Sidenav from '../../layouts/Sidenav';
import Content from '../../sections/defaultregister/Content';

class Defaultregister extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags> 
                    <title>Mystic | Default Register</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body ms-primary-theme ms-logged-out" id="body">
                    <Setting />
                    <Sidenav/>
                    <main className="body-content">
                        <Content/>
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default Defaultregister;