import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Line as LineChart} from 'react-chartjs-2';
import {Form, InputGroup, Modal} from "react-bootstrap";
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

import './app.css'
import {saveAsset} from "../../Utility/assets/saveAsset";
import {connect} from "react-redux";
import {assetsListUpdate, coingeckoCryptosListFetch} from "../../../reducers/actions";
import {formatter} from "../../Utility/functions";
import {deleteAsset} from "../../Utility/assets/deleteAsset";
import CoinGecko from "coingecko-api";

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

async function getAssetInfo(id) {
    const CoinGeckoClient = new CoinGecko();
    let el = await CoinGeckoClient.coins.fetch(id)
    return el.data.image.small
}

function fuzzySearch(options, data) {
    const fuse = new Fuse(data, {
        keys: ['name', 'groupName', 'items.name'],
        threshold: 0.3,
    });

    return (value) => {
        if (!value.length) {
            return options;
        }
        return fuse.search(value);
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

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

const mapStateToProps = state => ({
    ...state.coingeckoCrypto, ...state.auth, ...state.assets
});

const mapDispatchToProps = {
    coingeckoCryptosListFetch, assetsListUpdate
};

const Orderstable = (props) => {


    const handleShow1 = () => {
        setShow1(true)
    }

    const handleClose = () => {
        setShow1(false)
    }

    const [options, setOptions] = useState([
        trendone(),
        trendtwo(),
        trendthree(),
        trendfour(),
        trendfive(),
    ])
    const [data, setData] = useState([]);
    const [vsCurrencies, setVsCurrencies] = useState([
        {name: "BTC", value: 'btc'},
        {name: "ETH", value: 'eth'},
        {name: "USD", value: 'usd'},
        {name: "EUR", value: 'eur'},
    ]);
    const [show1, setShow1] = useState(false);
    const [currentAssetImage, setCurrentAssetImage] = useState('');
    const [newAsset, setNewAsset] = useState({
        buyDate: new Date().toDateInputValue(),
        name: '',
        symbol: '',
        id: '',
        quantity: 0,
        unitPrice: 0,
        fees: 0,
        leverage: 1,
        description: '',
        vsCurrency: '',
        image: ''
    });


    const handleSubmit = async (event) => {
        console.log('sent');
        event.preventDefault();
        console.log(props.account);
        let temp = {...newAsset, owner: props.userData.id, account: props.account.id}
        handleClose()
        props.assetsListUpdate([...props.assets, temp])
        await saveAsset(temp)
    }

    useEffect(() => {
        if (props.coingeckoCrypto) {
            let temparrray = []
            props.coingeckoCrypto.forEach(item => {
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
    }, [props.coingeckoCrypto]);


    const handleChange = (...args) => {
        console.log("ARGS:", args);
        var temp = newAsset
        getAssetInfo(args[0]).then(res => {
            setCurrentAssetImage(res)
            temp.image = res
        })
        temp.name = args[1].name
        temp.symbol = args[1].symbol
        temp.id = args[0]
        setNewAsset(temp)
    };

    const handleChangeCurrency = (...args) => {
        var temp = newAsset
        temp.vsCurrency = args[0]
        setNewAsset(temp)
    };


    return (
        <div className="col-md-12">
            <div className="ms-panel ms-crypto-orders-expanded">
                <div className="ms-panel-header">
                    <div className="d-flex justify-content-between">
                        <div className="ms-header-text">
                            <h6>Active Orders</h6>
                            <p>Track your active orders</p>
                        </div>
                        <Link onClick={handleShow1} to="#" className="btn btn-primary ms-graph-metrics">Ajouter</Link>
                    </div>
                </div>
                <div className="ms-panel-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover thead-light">
                            <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Monnaie</th>
                                <th scope="col">Quantite</th>
                                <th scope="col">Montant depense</th>
                                <th scope="col">Prix d'Achat</th>
                                <th scope="col">Prix actuel</th>

                                <th scope="col">Levier</th>
                                <th scope="col">Evolution</th>
                                <th scope="col">Montant actuel</th>

                                <th scope="col">Performance(%)</th>
                                <th scope="col">Performance($)</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.specificAssets !== null ? props.specificAssets.map((item, key) => (
                                <tr key={key}>
                                    <td>{Intl.DateTimeFormat('de-DE').format(new Date(item.buyDate))}</td>
                                    <td className="ms-crypto-amount"><img style={{width: '20px'}} src={item.image} alt=""/>{item.name}</td>
                                    <td>{item.quantity + ' ' + item.symbol.toUpperCase()}</td>
                                    <td>{item.vsCurrency === 'usd' || item.vsCurrency === undefined ? formatter.format(item.spentAmount) : item.spentAmount + ' ' + item.vsCurrency.toUpperCase()}</td>
                                    <td>{item.vsCurrency === 'usd' || item.vsCurrency === undefined ? formatter.format(item.unitPrice) : item.unitPrice + ' ' + item.vsCurrency.toUpperCase() }</td>
                                    <td>{ item.vsCurrency === 'usd' || item.vsCurrency === undefined ? formatter.format(item.usdPrice) : item.basePrice + ' ' + item.vsCurrency.toUpperCase()}</td>
                                    <td>{item.leverage ?? 1}</td>
                                    <td className="ms-trend"><LineChart data={options[2]} options={optionsData}/></td>
                                    <td className="ms-text-info">{formatter.format(item.currentAmount)}</td>
                                    <td className={item.performancePercentage > 0 ? 'text-success' : 'text-danger'}>{item.performancePercentage + '%'}</td>
                                    <td className={item.performanceUsd > 0 ? 'text-success' : 'text-danger'}>{ formatter.format(item.performanceUsd) }</td>
                                    <td><i className="text-danger flaticon-trash ms-delete-trigger" onClick={(e) => {
                                        if (window.confirm('Etes vous sur de vouloir supprimer cet actif ?')) {
                                            console.log('deleted');
                                            deleteAsset(item.id).then(res => {
                                                let temp = props.assets.filter(function (obj) {
                                                    return obj.id !== item.id;
                                                });
                                                props.assetsListUpdate(temp)
                                            })
                                        } else {

                                        }
                                    }}> </i></td>
                                </tr>
                            )) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={show1} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header>
                    <h3 className="modal-title has-icon ms-icon-round "><img src={currentAssetImage} alt=""/> Ajouter un actif</h3>
                    <button type="button" className="close" onClick={handleClose}><span aria-hidden="true">×</span></button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-2"
                            controlId="validationCustom02">
                            <Form.Row style={{marginTop: "1rem"}}>
                                <div className="col">
                                    <Form.Label>Date d'achat</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            value={newAsset.buyDate}
                                            type="date"
                                            onChange={e => {
                                                setNewAsset(prev => ({...prev, buyDate: e.target.value}))
                                            }}
                                        />
                                    </InputGroup>
                                </div>
                            </Form.Row>
                            <Form.Row className={"has-icon mb-4"}>
                                <label>Nom de l'actif</label>
                                {/*renderOption={renderFriend}*/}
                                {data !== null ?
                                    <SelectSearch filterOptions={(options) => fuzzySearch(options, data)} autoComplete={"on"} onChange={handleChange} search={true} options={data.slice(0, 20)}
                                                  value="sv" name="assets"
                                                  placeholder="Choose your Asset"/> : null}
                            </Form.Row>
                            <Form.Row className={"has-icon"}>
                                <label>Actif de base</label>
                                {/*renderOption={renderFriend}*/}
                                {vsCurrencies !== null ?
                                    <SelectSearch filterOptions={(options) => fuzzySearch(options, vsCurrencies)} autoComplete={"on"} onChange={handleChangeCurrency} search={true}
                                                  options={vsCurrencies}
                                                  value="sv" name="vscurrencies"
                                                  placeholder="Choose the base Asset"/> : null}
                            </Form.Row>
                            <Form.Row>
                                <div className="col-md-6">
                                    <div className="ms-form-group has-icon">
                                        <label>Quantite</label>
                                        <input type="number" value={newAsset.quantity} placeholder="0.00" className="form-control" name="quantity"
                                               onChange={e => {
                                                   setNewAsset(prev => ({...prev, quantity: e.target.value}))
                                               }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="ms-form-group has-icon">
                                        <label>Prix unitaire</label>
                                        <input value={newAsset.unitPrice} type="number" placeholder="0.00" className="form-control" name="price"
                                               onChange={e => {
                                                   setNewAsset(prev => ({...prev, unitPrice: e.target.value}))
                                               }}
                                        />
                                    </div>
                                </div>
                            </Form.Row>
                            <Form.Row className={"mb-2"}>
                                <label>Levier</label>
                                <input value={newAsset.leverage} type="number" placeholder="0.00" className="form-control" name="leverage"
                                       onChange={e => {
                                           setNewAsset(prev => ({...prev, leverage: e.target.value}))
                                       }}
                                />
                            </Form.Row>
                            <Form.Row className={"mb-2"}>
                                <label>Frais</label>
                                <input value={newAsset.fees} type="number" placeholder="0.00" className="form-control" name="fees"
                                       onChange={e => {
                                           setNewAsset(prev => ({...prev, fees: e.target.value}))
                                       }}
                                />
                            </Form.Row>
                            <Form.Row>
                                <label>description</label>
                                <textarea value={newAsset.description} type="text" placeholder="" className="form-control" name="description"
                                          onChange={e => {
                                              setNewAsset(prev => ({...prev, description: e.target.value}))
                                          }}
                                />
                            </Form.Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-light" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary shadow-none">Submit</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderstable);
