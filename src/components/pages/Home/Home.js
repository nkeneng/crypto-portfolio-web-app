import React, {Component, Fragment} from 'react';
import MetaTags from "react-meta-tags";
import Navbar from '../../layouts/Navbar';
import {connect} from "react-redux";
import {accountsListFetch, assetsListFetch, userLogout} from "../../../reducers/actions";
import Content from "./Content";


const mapStateToProps = state => ({
    ...state.auth, ...state.accounts, ...state.assets
});

const mapDispatchToProps = {
    accountsListFetch, assetsListFetch,userLogout
};


class Home extends Component {

    constructor(props) {
        super(props);
    }

    onLogout = () => {
        this.props.userLogout()
        this.props.history.push('/login');
    }

    render() {
        const {isAuthenticated, userData, accounts, assets} = this.props;

        return (
            <Fragment>
                <MetaTags>
                    <title>Mystic | Homepage</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body  ms-dark-theme" id="body">
                    <main className="body-content">
                        <Navbar isAuthenticated={isAuthenticated} userData={userData} logout={this.onLogout}/>
                        <Content isFetchingAccounts={this.props.isFetchingAccounts} isFetchingAssets={this.props.isFetchingAssets} accounts={accounts} assets={assets} type={'home'}/>
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
