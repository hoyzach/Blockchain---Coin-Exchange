import React, {useEffect, useState} from 'react';
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

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);


  const componentDidMount = async() => {
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
    setCoinData(coinPriceData);
  }

  useEffect(function() {
      if (coinData.length === 0) {
        //component did mount
        componentDidMount();
      } /* else {
      //component did update
    } */
    });

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = fixLength(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  const toggleBalance = ()  => {
    setShowBalance(oldValue => !oldValue);
  }
  
    return (
      <AppDiv>
        <Header />
        <AccountBalance 
          amount={balance} 
          showBalance={showBalance} 
          toggleBalance={toggleBalance} 
        />
        <CoinList 
          coinData={coinData} 
          handleRefresh={handleRefresh}
          showBalance={showBalance} 
        />
      </AppDiv>
    );
  }

export default App;
