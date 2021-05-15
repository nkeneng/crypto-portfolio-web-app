import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Navbar from '../layouts/Navbar';
import Content from '../sections/home/Content';
import {requests} from "../../agent";
import {
    userLogout,
    userProfileFetch,
    userSetId
} from "../../actions/actions";
import {connect} from "react-redux";


const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId, userLogout
};

class Home extends Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if (token) {
            requests.setToken(token);
        }
    }

    onLogout = () =>{
        this.props.userLogout()
        this.props.history.push('/login');
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if (userId) {
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userData, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData === null) {
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated, userData, userLogout} = this.props;
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
                        <Navbar isAuthenticated={isAuthenticated} userData={userData} logout={this.onLogout} />
                        <Content/>
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);