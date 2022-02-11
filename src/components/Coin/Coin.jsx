import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoinCell = styled.td`
    border: 1px solid #cccccc;
    width: 10vw;
    text-align: center;
    vertical-align: center;
`;

const CoinCellControls = styled(CoinCell)`
    width: 26vw;
`;

const CoinCellName = styled(CoinCell)`
    width: 24vw;
`;

const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function Coin(props) {
    const handleRefresh= (event) => {
        //Prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }
    const handleBuy= (event) => {
        //Prevent the default action of submitting the form
        event.preventDefault();
        props.handleTransaction(true, props.tickerId);
    }
    const handleSell= (event) => {
        //Prevent the default action of submitting the form
        event.preventDefault();
        props.handleTransaction(false, props.tickerId);
    }
    
        return (
            <tr>
                <CoinCellName>{props.name}</CoinCellName>
                <CoinCell>{props.ticker}</CoinCell>
                <CoinCell>{formatter.format(props.price)}</CoinCell>
                <CoinCell>{props.showBalance ? props.balance : <em>hidden</em>}</CoinCell>
                <CoinCellControls>
                    <form action="#" method="POST">
                        <Button className="btn btn-info" onClick={handleRefresh}>Refresh</Button>
                        <Button className="btn btn-success" onClick={handleBuy}>Buy</Button>
                        <Button className="btn btn-danger" onClick={handleSell}>Sell</Button>
                    </form>
                </CoinCellControls>
            </tr>
        );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
}
