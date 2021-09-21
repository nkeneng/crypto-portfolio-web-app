import React, {Component, useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {formatter} from "../../Utility/functions";


// Options
const options = {
    cutoutPercentage: 70,
    animation: {
        animateScale: true
    },
    title: {
        display: false,
        text: 'Predicted world population (millions) in 2050'
    },
    legend: {
        position: 'left',
        display: false,
    },
}


const Activeorders = (props) => {

    const [data, setData] = useState({
        labels: ["Binance", "Ftx"],
        datasets: [
            {
                label: "Population (millions)",
                borderColor: 'transparent',
                backgroundColor: ["#357ffa", "#f0ad4e"],
                data: [478, 267]
            }
        ],
    })
    const [colors, setColors] = useState([])

    function setDataState(background, dataSet, labels) {
        let newData = data
        newData.datasets[0].backgroundColor = background
        newData.datasets[0].data = dataSet
        newData.labels = labels
        setColors(background)
        setData(newData)
    }

    useEffect(() => {
        let background = []
        let dataSet = []
        let labels = []
        if (props.type !== 'home' && props.specificAssets !== null) {
            props.specificAssets.forEach(item => {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                background.push("#" + randomColor)
                dataSet.push(item.currentAmount)
                labels.push(item.name)
            })
            setDataState(background, dataSet, labels);
        } else if (props.type === 'home' && props.accounts !== null) {
            props.accounts.forEach(item => {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                background.push("#" + randomColor)
                dataSet.push(item.totalAmount)
                labels.push(item.name)
            })
            setDataState(background, dataSet, labels);
        }

    }, [])


    return (
        props.type !== 'home' ?
            <div className="col-xl-6 col-md-12">
                <div className="ms-panel ms-panel-fh">
                    <div className="ms-panel-header">
                        <h6>Active Orders</h6>
                        <p>Repartition du portefeuille</p>
                    </div>
                    <div className="ms-panel-body">
                        <div className="row">
                            <div className="col-xl-4 col-md-4">
                                <div style={{justifyContent: 'space-around'}} className="ms-graph-labels column-direction">
                                    {props.specificAssets !== null ? props.specificAssets.map((item, key) => (
                                        <div key={key} className="ms-chart-no-label">
                                            <span style={{backgroundColor: colors[key]}}/>
                                            {props.account !== undefined && props.account !== null ?
                                                <p>{item.name} ({((item.currentAmount * 100) / props.account.totalAmount).toFixed(2)}%)</p> : null}
                                        </div>
                                    )) : null}
                                </div>
                            </div>
                            <div className="col-xl-8 col-md-8">
                                <Doughnut data={data} options={options}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className="col-xl-6 col-md-12">
                <div className="ms-panel ms-panel-fh">
                    <div className="ms-panel-header">
                        <h6>Active Orders</h6>
                        <p>Repartition du portefeuille</p>
                    </div>
                    <div className="ms-panel-body">
                        <div className="row">
                            <div className="col-xl-4 col-md-4">
                                <div style={{justifyContent: 'space-around'}} className="ms-graph-labels column-direction">
                                    {props.accounts !== null ? props.accounts.map((item, key) => (
                                        <div key={key} className="ms-chart-no-label">
                                            <span style={{backgroundColor: colors[key]}}/>
                                            {props.account !== undefined && props.account !== null ?
                                                <p>{item.name} ({((item.totalAmount * 100) / props.account.totalAmount).toFixed(2)}%)</p> : null}
                                        </div>
                                    )) : null}
                                </div>
                            </div>
                            <div className="col-xl-8 col-md-8">
                                <Doughnut data={data} options={options}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Activeorders;
