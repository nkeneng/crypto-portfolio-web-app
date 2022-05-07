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
    var ethPrice = 0
    var btcPrice = 0

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
        let basePrice = el.data.market_data['current_price'][item.vsCurrency]
        let spentAmount = (item.unitPrice * item.quantity)
        let currentAmount = usdPrice * item.quantity
        let currentAmountBaseCurrency = 0

        if (item.vsCurrency === 'btc') {
            currentAmountBaseCurrency = basePrice * item.quantity
        } else if (item.vsCurrency === 'eth') {
            currentAmountBaseCurrency = basePrice * item.quantity
        }
        let performance = item.vsCurrency === 'usd' || item.vsCurrency === undefined ? currentAmount - spentAmount : currentAmountBaseCurrency - spentAmount
        let mergedAsset = {
            ...item,
            image: el.data.image['small'],
            usdPrice: usdPrice,
            basePrice: basePrice,
            spentAmount: spentAmount,
            currentAmount: currentAmount,
            performanceUsd: (item.vsCurrency === 'btc' ? performance * btcPrice : item.vsCurrency === 'eth' ? performance * ethPrice : performance),
            pnl24: (el.data.market_data.price_change_percentage_24h * usdPrice) / 100,
            pnl24Percentage: item.leverage ? (el.data.market_data.price_change_percentage_24h) * item.leverage : el.data.market_data.price_change_percentage_24h,
            performancePercentage: item.leverage ? calculatePercentage(spentAmount, performance) * item.leverage : calculatePercentage(spentAmount, performance)
        }
        setAssets(assets => [...assets, mergedAsset])
        return mergedAsset
    }

    const setAccountData = async () => {

        // fetch btc and eth price
        let btcData = await CoinGeckoClient.coins.fetch('bitcoin')
        btcPrice = btcData.data.market_data['current_price']['usd']
        let ethData = await CoinGeckoClient.coins.fetch('ethereum')
        ethPrice = ethData.data.market_data['current_price']['usd']

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
        console.log("assets.length > currentAssets.length", assets.length, currentAssets.length);
        if (assets.length < currentAssets.length || assets.length <= 0) {
            for (let asset of currentAssets) {
                if (assets.filter(item => item.id === asset.id).length <= 0) {
                    newAccount = await setAccountValue(newAccount, asset)
                }
            }
        } else {
            setAssets([])
            newAccount = {
                ...currentAccount,
                totalInvested: 0,
                pnl: 0,
                pnlPercentage: 0,
                totalAmount: 0,
                pnl24: 0,
                pnl24Percentage: 0,
            }
            for (let asset of currentAssets) {
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
        console.log("fetching", props.isFetchingAssets);
        // if the fetching is completed
        if (!props.isFetchingAssets) {
            // if the assets are not null
            if (props.assets !== null) {
                // if there are new assets or it's loading for the first time
                if ((currentAssets.length !== assets.length) || currentAssets.length <= 0) {
                    console.log('changed');
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
