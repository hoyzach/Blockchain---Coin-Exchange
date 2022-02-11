import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin: 0 auto 2rem auto;
    
`;
const Balance = styled.div`
    min-width: 250px;
    margin: 1rem;
    font-size: 1.5rem;
    vertical-align: middle;
`;

const Button = styled.button`
    margin: 0 8px;
`;

const BalanceToggleButton = styled(Button)`
    width: 150px;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props) {
        const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
        let content = <em>Account Balance: hidden</em>; //keep page from jumping when hiding/showing balance
        if (props.showBalance) {
            content = <>Account Balance: {formatter.format(props.amount)}</>
        }
        const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
        return (
            <>
                <Balance>{content}</Balance>
                <Section>
                    <BalanceToggleButton 
                        onClick={props.toggleBalance}
                        className={buttonClass}>
                        {buttonText}    
                    </BalanceToggleButton>
                    <Button className="btn btn-success"
                            onClick={props.handleBrrrr}>
                        <i className="fa-solid fa-helicopter"></i>
                    </Button>
                </Section>
            </>
        );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}