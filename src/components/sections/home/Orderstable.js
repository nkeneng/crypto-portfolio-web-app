import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Line as LineChart } from 'react-chartjs-2';
import {Modal} from "react-bootstrap";

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
const options = {
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

class Orderstable extends Component {

    handleShow1() {
        this.setState({ show1: true });
    }

    handleClose = ()=> {
        this.setState({ show1: false });
    }

    constructor(props, context) {
        super(props, context)
        this.handleShow1 = this.handleShow1.bind(this);
        this.state = {
            data1: trendone(),
            data2: trendtwo(),
            data3: trendthree(),
            data4: trendfour(),
            data5: trendfive(),
            open: true,
            show1: false,
        }
    };
    render() {
        return (
            <div className="col-md-12">
                <div className="ms-panel ms-crypto-orders-expanded">
                    <div className="ms-panel-header">
                        <div className="d-flex justify-content-between">
                            <div className="ms-header-text">
                                <h6>Active Orders</h6>
                                <p>Track your active orders</p>
                            </div>
                            <Link onClick={this.handleShow1} to="#" className="btn btn-primary ms-graph-metrics">Ajouter</Link>
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
                                        <th scope="col">Prix d'Achat</th>
                                        <th scope="col">Levier</th>
                                        <th scope="col">Evolution</th>
                                        <th scope="col">Prix actuel</th>
                                        <th scope="col">Performance(%)</th>
                                        <th scope="col">Performance($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>12.01.2020</td>
                                        <td>Sent</td>
                                        <td>#TR137381</td>
                                        <td>$900.50</td>
                                        <td className="ms-crypto-amount"> <i className="cc BTC" /> 0.511 </td>
                                        <td className="ms-trend"> <LineChart data={this.state.data1} options={options} /> </td>
                                        <td>$5.85</td>
                                    </tr>
                                    <tr>
                                        <td>11.01.2020</td>
                                        <td>Sent</td>
                                        <td>#TR371893</td>
                                        <td>$335.50</td>
                                        <td className="ms-crypto-amount"> <i className="cc ETH" /> 0.223 </td>
                                        <td className="ms-trend">  <LineChart data={this.state.data2} options={options} />  </td>
                                        <td>$5.85</td>
                                    </tr>
                                    <tr>
                                        <td>10.01.2020</td>
                                        <td>Sent</td>
                                        <td>#TR137381</td>
                                        <td>$378.50</td>
                                        <td className="ms-crypto-amount"> <i className="cc PPC-alt" /> 0.312 </td>
                                        <td className="ms-trend">  <LineChart data={this.state.data3} options={options} />  </td>
                                        <td>$5.85</td>
                                    </tr>
                                    <tr>
                                        <td>09.01.2020</td>
                                        <td>Recieved</td>
                                        <td>#TR371893</td>
                                        <td>$219.30</td>
                                        <td className="ms-crypto-amount"> <i className="cc PPC-alt" /> 0.573 </td>
                                        <td className="ms-trend">  <LineChart data={this.state.data4} options={options} />  </td>
                                        <td>$5.85</td>
                                    </tr>
                                    <tr>
                                        <td>08.01.2020</td>
                                        <td>Recieved</td>
                                        <td>#TR137381</td>
                                        <td>$438.50</td>
                                        <td className="ms-crypto-amount"> <i className="cc BTC" /> 0.321 </td>
                                        <td className="ms-trend">  <LineChart data={this.state.data5} options={options} />  </td>
                                        <td>$5.85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.show1} onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter"
                       centered>
                    <Modal.Header>
                        <h3 className="modal-title has-icon ms-icon-round "><i className="flaticon-share bg-primary text-white" /> Ajouter un actif</h3>
                        <button type="button" className="close" onClick={this.handleClose}><span aria-hidden="true">×</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <div className="ms-form-group has-icon">
                                <label>Nom de l'actif</label>
                                <input type="text" placeholder="Email Address" className="form-control" name="news-letter" />
                                <i className="material-icons">email</i>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-light" onClick={this.handleClose}>Cancel</button>
                        <button type="button" className="btn btn-primary shadow-none">Submit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Orderstable;