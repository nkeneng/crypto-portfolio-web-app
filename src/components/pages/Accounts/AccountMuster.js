import React, {Fragment, useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import Navbar from '../../layouts/Navbar';
import {connect} from "react-redux";
import {accountsListFetch, assetsListFetch, userLogout} from "../../../reducers/actions";
import Content from "./Content";

const mapStateToProps = state => ({
    ...state.accounts, ...state.assets, ...state.auth
});

const mapDispatchToProps = {
    assetsListFetch, accountsListFetch,userLogout
};


const AccountMuster = (props) => {

    useEffect(() => {
        if (props.assets.length === 0) {
            console.log('fetch assets');
            props.assetsListFetch(props.userData.id)
        }
    }, [])

    const onLogout = () => {
        props.userLogout()
        props.history.push('/login');
    }

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
                    <Navbar isAuthenticated={props.isAuthenticated} userData={props.userData} logout={onLogout}/>
                    <Content accountname={props.match.params.accountname} isFetchingAssets={props.isFetchingAssets} assets={props.assets} accounts={props.accounts}/>
                </main>
            </div>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMuster);
