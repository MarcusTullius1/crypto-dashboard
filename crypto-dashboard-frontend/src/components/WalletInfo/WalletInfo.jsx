// src/components/WalletInfo/WalletInfo.jsx
import React from 'react';
import './WalletInfo.css';

export default function WalletInfo({ wallet }) {
    if (!wallet) return null;

    const formatBalance = (balance) => {
        if (balance === 0) return '0';
        if (balance < 0.0001) return balance.toExponential(4);
        return balance.toFixed(8);
    };

    return (
        <div className="wallet-info">
            <h2>Кошелёк</h2>
            <p><strong>Адрес:</strong> {wallet.address}</p>
            <p><strong>Баланс:</strong> {formatBalance(wallet.balance)} BTC</p>
            <p><strong>Количество транзакций:</strong> {wallet.transactions.length}</p>
        </div>
    );
}
