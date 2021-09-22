import React, {Component, Fragment} from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {assetsListFetch, userProfileFetch} from "../../../reducers/actions";
import CoinGecko from "coingecko-api";
import {formatter} from "../../Utility/functions";

// Bitcoin
function Bitcoin() {
    return {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: "Data",
            borderColor: '#F7931A',
            pointBorderColor: '#F7931A',
            pointBackgroundColor: '#F7931A',
            pointHoverBackgroundColor: '#F7931A',
            pointHoverBorderColor: '#F7931A',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: true,
            backgroundColor: '#f7931a33',
            borderWidth: 2,
            data: [4, 3, 2, 3, 1, 4, 3, 5, 4, 5, 4, 6, 7, 5, 4]
        }]
    }
}

// Ethereum
function Ethereum() {
    return {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: "Data",
            borderColor: '#4e8ee8',
            pointBorderColor: '#4e8ee8',
            pointBackgroundColor: '#4e8ee8',
            pointHoverBackgroundColor: '#4e8ee8',
            pointHoverBorderColor: '#4e8ee8',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: true,
            backgroundColor: "rgba(78, 142, 232,0.2)",
            borderWidth: 2,
            data: [4, 5, 3, 7, 5, 7, 8, 9, 7, 6, 7, 7, 6, 5, 3]
        }]
    }
}

// ZCash
function ZCash() {
    return {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: "Data",
            borderColor: '#e5a93d',
            pointBorderColor: '#e5a93d',
            pointBackgroundColor: '#e5a93d',
            pointHoverBackgroundColor: '#e5a93d',
            pointHoverBorderColor: '#e5a93d',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: true,
            backgroundColor: "rgba(229, 169, 61,0.2)",
            borderWidth: 2,
            data: [5, 6, 8, 1, 5, 3, 9, 7, 5, 8, 7, 3, 6, 9, 1]
        }]
    }
}

// Peercoin
function Peercoin() {
    return {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: "Data",
            borderColor: '#3FA30C',
            pointBorderColor: '#3FA30C',
            pointBackgroundColor: '#3FA30C',
            pointHoverBackgroundColor: '#3FA30C',
            pointHoverBorderColor: '#3FA30C',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: true,
            backgroundColor: "rgba(63, 163, 12,0.2)",
            borderWidth: 2,
            data: [1, 4, 7, 3, 5, 7, 6, 5, 8, 3, 5, 5, 4, 3, 7]
        }]
    }
}

// Options
const options = {
    elements: {
        line: {
            tension: 0
        }
    },
    legend: {
        display: false,
        position: "bottom"
    },
    scales: {
        yAxes: [{
            display: false,
        }],
        xAxes: [{
            display: false,
        }]
    }
}


const mapStateToProps = state => ({
    ...state.auth, ...state.assets
});

const mapDispatchToProps = {
    userProfileFetch, assetsListFetch
};


class Infographics extends Component {

    constructor(props, context) {
        super(props, context)
        console.log(props);
        this.state = {
            data: [
                Bitcoin(),
                Ethereum(),
                ZCash(),
                Peercoin(),
            ],
            open: true,
        }
    };



    render() {
        return (
            this.props.type === 'home' ?
                <Fragment>
                    {this.props.accounts !== undefined && this.props.accounts !== null ? this.props.accounts.slice(0, 4).map((item,key) => (
                            <div key={key} className={"col-xl-" + 12 / this.props.accounts.slice(0, 4).length + " col-sm-6 col-md-6"}>
                                <Link to={'/account/' + item.name}>
                                    <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                        <div className="ms-card-body media">
                                            <img alt="" style={imgStyle} width="32" height="32"
                                                 src={item.image}/>
                                            <div className="media-body">
                                                <span>{formatter.format(item.totalAmount)}</span>
                                                <h2>{item.name}</h2>
                                            </div>
                                        </div>
                                        <LineChart data={this.state.data[key]} options={options}/>
                                    </div>
                                </Link>
                            </div>
                        )
                    ) : null}
                </Fragment> : <Fragment>
                    {this.props.specificAssets !== undefined && this.props.specificAssets !== null ? this.props.specificAssets.slice(0, 4).map((item, key) => (
                            <div key={key} className={"col-xl-" + 12 / this.props.specificAssets.slice(0, 4).length + " col-sm-6 col-md-6"}>
                                <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                    <div className="ms-card-body media">
                                        <img alt="" style={imgStyle} width="32" height="32"
                                             src={item.image}/>
                                        <div className="media-body">
                                            <span>1 {item.symbol.toUpperCase()} = {formatter.format(item.usdPrice)}</span>
                                            <h2>{item.name}</h2>
                                        </div>
                                    </div>
                                    <LineChart data={this.state.data[key]} options={options}/>
                                </div>
                            </div>
                        )
                    ) : null}
                </Fragment>
        );
    }
}

const imgStyle = {
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginRight: 10,
};

export default connect(mapStateToProps, mapDispatchToProps)(Infographics);
