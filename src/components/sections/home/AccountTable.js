import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Line as LineChart} from 'react-chartjs-2';
import {Modal} from "react-bootstrap";
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

import './app.css'
import {saveAccount} from "../../Utility/account/saveAccount";
import {formatter, string_to_slug} from "../../Utility/functions";
import {connect} from "react-redux";
import {accountsListFetch, accountsListUpdate, userProfileFetch} from "../../../reducers/actions";


var trend_1 = [1, 3, 5, 4, 3, 3, 4, 8, 5];
var trend_2 = [3, 2, 5, 4, 8, 4, 5, 2, 3];
var trend_3 = [7, 5, 4, 5, 4, 7, 5, 5, 4];
var trend_4 = [3, 3, 4, 6, 7, 6, 6, 4, 3];
var trend_5 = [5, 4, 6, 7, 6, 5, 5, 7, 4];
var labels = ["Jan-11", "Jan-12", "Jan-13", "Jan-14", "Jan-15", "Jan-16", "Jan-17", "Jan-18", "Jan-19"];

// trend 01
function trendone() {
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            borderColor: '#F7931A',
            backgroundColor: 'transparent',
            borderWidth: 2,
            data: trend_1
        }]
    }
}

// trend 02
function trendtwo() {
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            borderColor: '#4e8ee8',
            backgroundColor: 'transparent',
            borderWidth: 2,
            data: trend_2
        }]
    }
}

// trend 03
function trendthree() {
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            borderColor: '#3FA30C',
            backgroundColor: 'transparent',
            borderWidth: 2,
            data: trend_3
        }]
    }
}

// trend 04
function trendfour() {
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            borderColor: '#3FA30C',
            backgroundColor: 'transparent',
            borderWidth: 2,
            data: trend_4
        }]
    }
}

// trend 05
function trendfive() {
    return {
        labels: labels,
        datasets: [{
            label: "Data",
            borderColor: '#F7931A',
            backgroundColor: 'transparent',
            borderWidth: 2,
            data: trend_5
        }]
    }
}

// Options
const optionsData = {
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
    },
    elements: {
        point: {
            radius: 0
        }
    }
}

function fuzzySearch(options) {
    const fuse = new Fuse(options, {
        keys: ['name', 'groupName', 'items.name'],
        threshold: 0.3,
    });

    return (value) => {
        if (!value.length) {
            return options;
        }
        let result = fuse.search(value)
        if (result.length <= 0) {
            result = [{
                name: value,
                value: string_to_slug(value)
            }]
        }
        return result;
    };
}

function renderFriend(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (
        <button {...props} className={className} type="button">
            <span><img alt="" style={imgStyle} width="32" height="32"
                       src={"https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/" + option.symbol + ".svg"}/><span>{option.name}</span></span>
        </button>
    );
}

const mapDispatchToProps = {
    userProfileFetch, accountsListUpdate
};

const mapStateToProps = state => ({
    ...state.coingeckoExchanges
});

const AccountTable = (props) => {


    const handleShow1 = () => {
        setShow1(true)
    }

    const handleClose = () => {
        setShow1(false)
    }

    const handleSubmit = async (event) => {
        console.log('sent');
        event.preventDefault();
        let temp = {owner: props.userData.id, name: newAccount.name, accountId: newAccount.id}
        handleClose()
        const id = await saveAccount(temp)
        temp.id = id
        props.accountsListUpdate([...props.accounts, temp])
    }


    const [options, setOptions] = useState([
        trendone(),
        trendtwo(),
        trendthree(),
        trendfour(),
        trendfive(),
    ])
    const [data, setData] = useState([]);
    const [otherAccount, setOtherAccount] = useState('');
    const [show1, setShow1] = useState(false);
    const [newAccount, setNewAccount] = useState({
        name: '',
        id: ''
    });

    useEffect(() => {
        if (props.coingeckoExchanges) {
            let temparrray = []
            props.coingeckoExchanges.forEach(item => {
                temparrray.push(
                    {
                        name: item.name,
                        value: item.id,
                        symbol: item.symbol,
                    }
                )
            })
            setData(temparrray)
        }
    }, [props.coingeckoExchanges]);


    const handleChange = (...args) => {
        setNewAccount({id: args[0], name: args[1].name})
    };


    return (
        <div className="col-md-12">
            <div className="ms-panel ms-crypto-orders-expanded">
                <div className="ms-panel-header">
                    <div className="d-flex justify-content-between">
                        <div className="ms-header-text">
                            <h6>Active accounts</h6>
                            <p>Track your active accounts</p>
                        </div>
                        <Link onClick={handleShow1} to="#" className="btn btn-primary ms-graph-metrics">Ajouter</Link>
                    </div>
                </div>
                <div className="ms-panel-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover thead-light">
                            <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Montant investi</th>
                                <th scope="col">Montant actuel</th>
                                <th scope="col">nombre de crypto</th>
                                <th scope="col">Evolution</th>
                                <th scope="col">Performance(%)</th>
                                <th scope="col">Performance($)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.accounts.map((item, key) => (
                                <tr key={key}>
                                    <td><Link to={'/account/' + item.name}>{item.name}</Link></td>
                                    <td>{formatter.format(item.totalInvested)}</td>
                                    <td>{formatter.format(item.totalAmount)}</td>
                                    <td className="ms-crypto-amount">{item.numberOfAsset}</td>
                                    <td className="ms-trend"><LineChart data={options[2]} options={optionsData}/></td>
                                    <td className={item.pnlPercentage > 0 ? 'text-success':'text-danger'}>{item.pnlPercentage}%</td>
                                    <td className={item.pnl > 0 ? 'text-success':'text-danger'}>{formatter.format(item.pnl)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={show1} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header>
                    <h3 className="modal-title has-icon ms-icon-round "><i className="flaticon-share bg-primary text-white"/> Ajouter un compte</h3>
                    <button type="button" className="close" onClick={handleClose}><span aria-hidden="true">×</span></button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="ms-form-group has-icon">
                            <label>Nom du compte</label>
                            {data !== null ?
                                <SelectSearch value={otherAccount} filterOptions={fuzzySearch} autoComplete={"on"} search={true} options={data} onChange={handleChange} name="assets"
                                              placeholder="Choose your exchange"/> : null}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-light" onClick={handleClose}>Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary shadow-none">Submit</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
