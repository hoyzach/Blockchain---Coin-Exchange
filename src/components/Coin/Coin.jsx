import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoinCell = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default function Coin(props) {
     const handleClick = (event) => {
        //Prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }
    
        return (
            <tr>
                <CoinCell>{props.name}</CoinCell>
                <CoinCell>{props.ticker}</CoinCell>
                <CoinCell>${props.price}</CoinCell>
                {props.showBalance ? <CoinCell>{props.balance}</CoinCell> : null}
                <CoinCell>
                    <form action="#" method="POST">
                        <button onClick={handleClick}>Refresh</button>
                    </form>
                </CoinCell>
            </tr>
        );
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
}
