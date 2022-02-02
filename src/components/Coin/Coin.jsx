import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoinCell = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /*
    componentDidMount() {
        const callback = () => {
            //set the state to a new random value
            const randomPercentage = 0.995 + Math.random() * 0.01;

            this.setState( function(oldState) {
                return {
                    price: oldState.price * randomPercentage
                };
            });
        }
        setInterval( callback, 1000 )
    }
    */
    handleClick(event)  {
        //Prevent the default action of submitting the form
        event.preventDefault();

        this.props.handleRefresh(this.props.ticker);
        /*
        const randomPercentage = 0.995 + Math.random() * 0.01;
        
        this.setState( function(oldState) {
            return {
                price: oldState.price * randomPercentage
            };
        });
        */
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
