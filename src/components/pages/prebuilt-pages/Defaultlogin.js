import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../../sections/defaultlogin/Content';

class Defaultlogin extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {history} = this.props
        return (
            <Fragment>
                <MetaTags>
                    <title>Mystic | Default Login</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body ms-dark-theme ms-logged-out" id="body">
                    <main className="body-content">
                        <Content history={history}/>
                    </main>
                </div>
            </Fragment>
        );
    }


}

export default Defaultlogin;
