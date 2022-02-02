import React from 'react';
import CoinList from './components/CoinList/CoinList.jsx';
import Header from './components/Header/Header.jsx';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';

const AppDiv = styled.div`
  text-align: center;
  background-color: rgb(20,56,97);
  color: #cccccc;
`
class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      {
        name: 'Bitcoin',
        ticker: 'BTC',
        balance: 0.5,
        price: 9999.99
      },
      {
        name: 'Ethereum',
        ticker: 'ETH',
        balance: 32.0,
        price: 299.99
      },
      {
        name: 'Tether',
        ticker: 'USDT',
        balance: 0,
        price: 0.99
      },
      {
        name: 'Ripple',
        ticker: 'XRP',
        balance: 1000,
        price: 0.20
      }
    ]
  }

  handleRefresh = valueChangeTicker => {
    const newCoinData = this.state.coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeTicker === newValues.ticker ) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        if ((newValues.price *= randomPercentage) >= 10) {
          newValues.price = (newValues.price *= randomPercentage).toFixed(2);
        }
          else{
            newValues.price = (newValues.price * randomPercentage).toFixed(4);
          }
      }
      return newValues;
    });
    this.setState({ coinData: newCoinData });
  }

  toggleBalance = ()  => {
    this.setState( function(oldState) {
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    });
  }
  
  render() {
    return (
      <AppDiv>
        <Header />
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          toggleBalance={this.toggleBalance} 
        />
        <CoinList 
          coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh}
          showBalance={this.state.showBalance} 
        />
      </AppDiv>
    );
  }
}

export default App;
