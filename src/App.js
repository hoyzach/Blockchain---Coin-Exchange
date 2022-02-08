import React from 'react';
import CoinList from './components/CoinList/CoinList.jsx';
import Header from './components/Header/Header.jsx';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import axios from 'axios';

const AppDiv = styled.div`
  text-align: center;
  background-color: rgb(20,56,97);
  color: #cccccc;
`;

const COIN_COUNT = 10;

function fixLength(_amount) {
  if( _amount > 10) {
    return parseFloat(_amount.toFixed(2));
  }
  else { return parseFloat(_amount.toFixed(4)); }
}

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
  componentDidMount = async() => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: fixLength(coin.quotes.USD.price),
      };
    })
    this.setState({ coinData : coinPriceData });
  }

  handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = fixLength(response.data.quotes.USD.price);
    const newCoinData = this.state.coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
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
