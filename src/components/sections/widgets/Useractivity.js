import React, { Component } from 'react';

const activity = [
    {
        countryflag: 'assets/img/flags/us.png',
        entrance: 725,
        bouncerate: 17.24,
        exits: 7.65,
    },
    {
        countryflag: 'assets/img/flags/grm.png',
        entrance: 890,
        bouncerate: 12.90,
        exits: 9.12,
    },
    {
        countryflag: 'assets/img/flags/uk.png',
        entrance: 729,
        bouncerate: 20.75,
        exits: 14.29,
    },
    {
        countryflag: 'assets/img/flags/russia.png',
        entrance: 316,
        bouncerate: 32.09,
        exits: 10.99,
    },
    {
        countryflag: 'assets/img/flags/fr.png',
        entrance: 275,
        bouncerate: 33.58,
        exits: 6.75,
    },
];

class Useractivity extends Component {
    render() {
        return (
            <div className="col-xl-6 col-md-12">
                <div className="ms-panel ms-widget">
                    <div className="ms-panel-header">
                        <h6>Top User Activity By Country</h6>
                        <p>Users activity performance and bounce rate based on country</p>
                    </div>
                    <div className="ms-panel-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover thead-light">
                                <thead>
                                    <tr>
                                        <th scope="col">Country</th>
                                        <th scope="col">Entrances</th>
                                        <th scope="col">Bounce Rate</th>
                                        <th scope="col">Exits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activity.map((item, i) => (
                                        <tr key={i}>
                                            <th scope="row"> <img src={item.countryflag} alt="flags" /></th>
                                            <td>{item.entrance}</td>
                                            <td>{item.bouncerate}%</td>
                                            <td>{item.exits}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Useractivity;