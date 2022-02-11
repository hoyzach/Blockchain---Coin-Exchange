import React, { Component } from 'react';
import logo from '../../logo.svg';
import styled from 'styled-components';

const AppHeader = styled.header`
    background-color: #282c34;
    min-height: 10vh;
    width: 100%
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: white;
`;

const AppLogo = styled.img`
    margin: 1rem;
    height: 8rem;
    pointer-events: none;
    @keyframes App-logo-spin { 
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    };
    animation: App-logo-spin infinite 20s linear;
`;

const AppTitle = styled.h1`
    font-size: 4rem;
    line-height: 12rem;
    font-weight: bold;
    min-width: 300px;
`;

export default class Header extends Component {
  render() {
    return (
        <AppHeader>
            <AppLogo src={logo} alt="React logo"/>
                <AppTitle>
                Coin Exchange
                </AppTitle>
      </AppHeader>
    )
  }
}
