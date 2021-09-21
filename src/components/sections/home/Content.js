import React, {Component} from 'react';
import Infographics from './Infographics';
import Crypto from './Crypto';
import Bitcoingraph from './Bitcoingraph';
import Highlightsy from './Highlightsy';
import Orders from './Orders';
import Activeorders from './Activeorders';
import Orderstable from './Orderstable';
import AccountTable from './AccountTable';
import Scatterchart from './Scatterchart';
import Marketpos from './Marketpos';
import Statistics
    from "../projectmanagement/Statistics";
import CoinGecko from "coingecko-api";

class Content extends Component {

    constructor(props) {
        super();
        this.state = {
            assets: [],
            account: null,
            accounts: [],
            isLoading: true
        }
    }

    calculatePercentage(spentAmount, performanceUsd) {
        if (spentAmount <= 0) {
            console.log('spentamount is 0');
            return 0
        } else {
            return (Math.round((performanceUsd*100)/spentAmount)).toFixed(2);
        }
    }

    async getCoin(item, CoinGeckoClient) {
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
            performancePercentage: this.calculatePercentage(spentAmount, performanceUsd)
        }
        this.setState({
            assets: this.state.assets.concat([mergedAsset])
        })
        return mergedAsset
    }

    componentDidMount() {
        const CoinGeckoClient = new CoinGecko();

        const setAccountValue = async (newAccount, item) => {
            let newAsset = await this.getCoin(item, CoinGeckoClient)
            newAccount.totalInvested += newAsset.spentAmount
            newAccount.pnl += newAsset.performanceUsd
            newAccount.pnl24 += newAsset.pnl24
            newAccount.totalAmount += newAsset.currentAmount
            newAccount.pnlPercentage = this.calculatePercentage(newAccount.totalInvested, newAccount.pnl)
            newAccount.pnl24Percentage = this.calculatePercentage(newAccount.totalAmount, newAccount.pnl24)
            console.log("newAccount.totalAmount ", newAccount.totalAmount);
        }

        if (this.props.type !== 'home' && this.props.assets !== null) {
            let newAccount = {
                ...this.props.account,
                totalInvested: 0,
                pnl: 0,
                pnlPercentage: 0,
                totalAmount: 0,
                pnl24: 0,
                pnl24Percentage: 0,
            }
            this.props.assets.forEach(item => {
                setAccountValue(newAccount, item)
            })
            this.setState({account: newAccount})
        }
        this.setState({isLoading: false})
    }

    render() {
        return (
            !this.state.isLoading ? <div className="ms-content-wrapper">
                <div className="row">
                    <Statistics account={this.state.account}/>
                    <Crypto account={this.props.account} assets={this.state.assets}/>
                    <Infographics specificAssets={this.state.assets} type={this.props.type} accounts={this.props.accounts} data={this.props.data.bestPerformance}/>
                    <Bitcoingraph/>
                    <Activeorders specificAssets={this.state.assets} data={this.props.data}/>
                    {this.props.type !== 'home' ? < Orderstable account={this.props.account} specificAssets={this.state.assets}/> : <AccountTable/>}
                </div>
            </div> : 'Loading'
        );
    }
}

export default Content;
