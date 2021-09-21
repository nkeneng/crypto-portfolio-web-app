import React, {Component, useEffect, useState} from 'react';
import AccountTable from "../../sections/home/AccountTable";
import Activeorders from "../../sections/home/Activeorders";
import Bitcoingraph from "../../sections/home/Bitcoingraph";
import Infographics from "../../sections/home/Infographics";
import Crypto from "../../sections/home/Crypto";
import Statistics from "../../sections/projectmanagement/Statistics";
import CoinGecko from "coingecko-api";
import {userProfileFetch} from "../../../reducers/actions";
import {connect} from "react-redux";
import Preloader from "../../layouts/Preloader";

const mapStateToProps = state => ({
    ...state.auth, ...state.accounts, ...state.assets, ...state.coingeckoExchanges
});

const mapDispatchToProps = {
    userProfileFetch
};

export const Content = (props) => {

    const [assets, setAssets] = useState([])
    const [accounts, setAccounts] = useState([])
    const [account, setAccount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const CoinGeckoClient = new CoinGecko();

    const calculatePercentage = (spentAmount, performanceUsd) => {
        if (spentAmount <= 0) {
            console.log('spentamount is 0');
            return 0
        } else {
            return (Math.round((performanceUsd * 100) / spentAmount)).toFixed(2);
        }
    }

    const getCoin = async (item) => {
        let el = await CoinGeckoClient.coins.fetch(item.id)
        let usdPrice = el.data.market_data['current_price']['usd']
        let spentAmount = item.unitPrice * item.quantity
        let currentAmount = usdPrice * item.quantity
        let performanceUsd = currentAmount - spentAmount
        let mergedAsset = {
            ...item,
            image: el.data.image['small'],
            usdPrice: usdPrice,
            spentAmount: spentAmount,
            currentAmount: currentAmount,
            performanceUsd: performanceUsd,
            pnl24: (el.data.market_data.price_change_percentage_24h * usdPrice) / 100,
            pnl24Percentage: el.data.market_data.price_change_percentage_24h,
            performancePercentage: calculatePercentage(spentAmount, performanceUsd)
        }
        setAssets(assets => [...assets, mergedAsset])
        return mergedAsset
    }

    useEffect(() => {
        if (props.accounts !== null) {
            if (accounts.length === props.accounts.length) {
                let globalAccount = {
                    totalInvested: 0,
                    pnl: 0,
                    pnlPercentage: 0,
                    totalAmount: 0,
                    pnl24: 0,
                    pnl24Percentage: 0,
                }

                for (let el of accounts) {
                    globalAccount.totalInvested += el.totalInvested
                    globalAccount.totalAmount += el.totalAmount
                    globalAccount.pnl += el.pnl
                    globalAccount.pnl24 += el.pnl24
                }
                globalAccount.pnlPercentage = calculatePercentage(globalAccount.totalInvested, globalAccount.pnl)
                globalAccount.pnl24Percentage = calculatePercentage(globalAccount.totalAmount, globalAccount.pnl24)
                setAccount(globalAccount)
                setIsLoading(false)
            }
        }
    }, [accounts]);


    const setAccountData = async () => {
        try {
            if (props.accounts) {
                for (let account of props.accounts) {
                    let tempAccount = accounts.filter(item => item.accountId === account.accountId)
                    if (tempAccount.length <= 0) {
                        console.log("new account = ", account);
                        if (props.coingeckoExchanges !== null) {
                            let newAccount = {
                                ...account,
                                totalInvested: 0,
                                pnl: 0,
                                pnlPercentage: 0,
                                totalAmount: 0,
                                pnl24: 0,
                                pnl24Percentage: 0,
                                numberOfAsset: 0,
                                image: ''
                            }
                            let el = props.coingeckoExchanges.filter(item => item.id === account.accountId)[0]
                            newAccount.image = el ? el.image : ''
                            let x = 0
                            for (let asset of props.assets.filter(item => item.account === newAccount.id)) {
                                let newAsset = await getCoin(asset, CoinGeckoClient)
                                newAccount.totalInvested += newAsset.spentAmount
                                newAccount.pnl += newAsset.performanceUsd
                                newAccount.pnl24 += newAsset.pnl24
                                newAccount.totalAmount += newAsset.currentAmount
                                newAccount.pnlPercentage = calculatePercentage(newAccount.totalInvested, newAccount.pnl)
                                newAccount.pnl24Percentage = calculatePercentage(newAccount.totalAmount, newAccount.pnl24)
                                newAccount.numberOfAsset = x + 1
                                x++
                            }
                            setAccounts(accounts => [...accounts, newAccount])
                        }
                    }
                }
            } else console.log("props.accounts empty ", props.accounts);

        } catch (e) {
            console.log("error on account update", e.message);
        }
    }

    useEffect(() => {
        if (!props.isFetchingAccounts) {
            if (props.accounts !== null && props.assets !== null) {
                if (props.accounts.length !== accounts.length) {
                    console.log("props.accounts.length ", props.accounts.length);
                    console.log("accounts.length ", accounts.length);
                    setIsLoading(true)
                    setAccountData()
                }
            }
        }
    }, [props.isFetchingAccounts, props.isFetchingCoingeckoExchanges])

    return (
        !isLoading ? <div className="ms-content-wrapper">
            <div className="row">
                <Statistics account={account}/>
                <Crypto account={account} specificAssets={assets}/>
                <Infographics specificAssets={assets} type={props.type} accounts={accounts}/>
                <Bitcoingraph/>
                <Activeorders type={props.type} accounts={accounts} account={account} specificAssets={assets}/>
                <AccountTable userData={props.userData} accounts={accounts}/>
            </div>
        </div> : <Preloader/>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
