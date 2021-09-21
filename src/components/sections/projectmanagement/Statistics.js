import React, {Fragment} from 'react';
import {formatter} from "../../Utility/functions";

const Statistics = (props) => {
    const {account} = props
    return (
        <Fragment>
            <div className="col-xl-3 col-md-6">
                <div className="ms-card card-gradient-info ms-widget ms-infographics-widget">
                    <div className="ms-card-body media">
                        <div className="media-body">
                            <h6>Investissement total</h6>
                            <p className="ms-card-change">{formatter.format(account.totalInvested)}</p>
                            {/*<p className="fs-12">2% Decreased from last budget</p>*/}
                        </div>
                    </div>
                    <i className="flaticon-reuse"/>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className={(account.pnl > 0 ? 'card-gradient-success' : 'card-gradient-danger')+" ms-card  ms-widget ms-infographics-widget"}>
                    <div className="ms-card-body media">
                        <div className="media-body">
                            <h6>Profit total</h6>
                            <p className={"ms-card-change"}><i
                                className={"material-icons"}>{account.pnl > 0 ? 'arrow_upward' : 'arrow_downward'}</i>{formatter.format(account.pnl)}</p>
                            <p className="fs-12">{account.pnlPercentage}% sur la totalite du compte</p>
                        </div>
                    </div>
                    <i className="flaticon-stats"/>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="ms-card card-gradient-warning ms-widget ms-infographics-widget">
                    <div className="ms-card-body media">
                        <div className="media-body">
                            <h6>Balance totale</h6>
                            <p className="ms-card-change">{formatter.format(account.totalAmount)}</p>
                            {/*<p className="fs-12">48% From Last 24 Hours</p>*/}
                        </div>
                    </div>
                    <i className="flaticon-user"/>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className={(account.pnl24 > 0 ? " card-gradient-success" : " card-gradient-danger") + " ms-card ms-widget ms-infographics-widget"}>
                    <div className="ms-card-body media">
                        <div className="media-body">
                            <h6>Pnl 24h</h6>
                            <p className="ms-card-change"><i
                                className="material-icons">{account.pnl24 > 0 ? 'arrow_upward' : 'arrow_downward'}</i> {formatter.format(account.pnl24)}</p>
                            <p className="fs-12">{account.pnl24Percentage}% depuis hier</p>
                        </div>
                    </div>
                    <i className="flaticon-statistics"/>
                </div>
            </div>
        </Fragment>
    );
}

export default Statistics;
