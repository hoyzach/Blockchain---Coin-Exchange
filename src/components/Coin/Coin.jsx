import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoinCell = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    handleClick = (event) => {
        //Prevent the default action of submitting the form
        event.preventDefault();
        this.props.handleRefresh(this.props.tickerId);
    }
    
    render() {
        return (
            <tr>
                <CoinCell>{this.props.name}</CoinCell>
                <CoinCell>{this.props.ticker}</CoinCell>
                <CoinCell>${this.props.price}</CoinCell>
                {this.props.showBalance ? <CoinCell>{this.props.balance}</CoinCell> : null}
                <CoinCell>
                    <form action="#" method="POST">
                        <button onClick={this.handleClick}>Refresh</button>
                    </form>
                </CoinCell>
            </tr>
        );
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
}
