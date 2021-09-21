import React, {useEffect, useState} from 'react';
import CoinGecko from "coingecko-api";
import Statistics from "../../sections/projectmanagement/Statistics";
import Crypto from "../../sections/home/Crypto";
import Infographics from "../../sections/home/Infographics";
import Bitcoingraph from "../../sections/home/Bitcoingraph";
import Activeorders from "../../sections/home/Activeorders";
import Orderstable from "../../sections/home/Orderstable";
import Preloader from "../../layouts/Preloader";


const Content = (props) => {

    const [assets, setAssets] = useState([])
    const [account, setAccount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const CoinGeckoClient = new CoinGecko();

    const currentAccount = props.accounts.filter(item => item.name === props.accountname)[0]
    const currentAssets = props.assets.filter(item => item.account === currentAccount.id)


    const calculatePercentage = (spentAmount, performanceUsd) => {
        if (spentAmount <= 0) {
            console.log('spentamount is 0');
            return 0
        } else {
            return (((performanceUsd * 100) / spentAmount)).toFixed(2);
        }
    }

    const getCoin = async (item, CoinGeckoClient) => {
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

    const setAccountData = async () => {
        let newAccount = account
        if (newAccount == null) {
            newAccount = {
                ...currentAccount,
                totalInvested: 0,
                pnl: 0,
                pnlPercentage: 0,
                totalAmount: 0,
                pnl24: 0,
                pnl24Percentage: 0,
            }
        }
        for (let asset of currentAssets) {
            if (assets.filter(item => item.id === asset.id).length <= 0) {
                newAccount = await setAccountValue(newAccount, asset)
            }
        }
        setAccount(newAccount)
        setIsLoading(false)
    }

    const setAccountValue = async (newAccount, item) => {
        let newAsset = await getCoin(item, CoinGeckoClient)
        newAccount.totalInvested += newAsset.spentAmount
        newAccount.pnl += newAsset.performanceUsd
        newAccount.pnl24 += newAsset.pnl24
        newAccount.totalAmount += newAsset.currentAmount
        newAccount.pnlPercentage = calculatePercentage(newAccount.totalInvested, newAccount.pnl)
        newAccount.pnl24Percentage = calculatePercentage(newAccount.totalAmount, newAccount.pnl24)
        return newAccount
    }

    useEffect(() => {
        console.log("fetching");
        // if the fetching is completed
        if (!props.isFetchingAssets) {
            // if the assets are not null
            if (props.assets !== null) {
                // if there are new assets or it's loading for the first time
                if ((currentAssets.length !== assets.length) || currentAssets.length <= 0) {
                    setIsLoading(true)
                    setAccountData()
                }
            }
        }
    }, [props.isFetchingAssets])


    return (
        !isLoading ? <div className="ms-content-wrapper">
            <div className="row">
                <Statistics account={account}/>
                <Crypto specificAssets={assets}/>
                <Infographics specificAssets={assets} type={props.type}/>
                <Bitcoingraph/>
                <Activeorders account={account} specificAssets={assets}/>
                < Orderstable account={account} specificAssets={assets}/>
            </div>
        </div> : <Preloader/>
    );
}

export default Content;
