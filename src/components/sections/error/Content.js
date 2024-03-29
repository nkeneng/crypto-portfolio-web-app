import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
    render() {
        return (
            <main className="body-content ms-error-404">
                {/* Body Content Wrapper */}
                <div className="ms-content-wrapper">
                    <i className="flaticon-computer" />
                    <h1>Error 404</h1>
                    <h3>Oops! Page Not Found!</h3>
                    <p>The link you followed may be broken, or the page has been removed</p>
                    <Link to="/" className="btn btn-white"> <i className="material-icons">arrow_back</i> Back Home</Link>
                </div>
            </main>
        );
    }
}

export default Content;