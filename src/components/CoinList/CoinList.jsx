import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const CoinTable = styled.table`
  font-size: 1rem;
  text-align: center; 
  vertical-align: middle;
`;

const CoinTableHeader = styled.tr`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default function CoinList(props) {
    return (
        <CoinTable className="table table-primary table-bordered">
        <thead>
          <CoinTableHeader>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Refresh Price</th>
          </CoinTableHeader>
        </thead>
        <tbody>
          {
            props.coinData.map( ({key, name, ticker, price, balance}) => 
              <Coin 
                key={key}
                handleRefresh={props.handleRefresh}
                handleTransaction={props.handleTransaction}
                name={name}
                ticker={ticker}
                showBalance = {props.showBalance}
                balance={balance}
                price={price}
                tickerId={key}
              />
            )
          }
        </tbody>
        </CoinTable>
    );
}
