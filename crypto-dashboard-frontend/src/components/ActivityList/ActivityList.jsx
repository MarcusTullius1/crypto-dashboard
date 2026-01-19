import React from 'react';
import './ActivityList.css';

export default function ActivityList({ wallet }) {
    if (!wallet || !wallet.transactions || wallet.transactions.length === 0) {
        return <p>Нет активности по данному кошельку</p>;
    }

    return (
        <div className="activity-list">
            <h3>История активности</h3>
            <div className="activity-items">
                {wallet.transactions.slice(0, 10).map((tx, index) => (
                    <div key={index} className="activity-item">
                        <span className="hash">{tx.hash.slice(0,6)}...{tx.hash.slice(-4)}</span>
                        <span className="amount">{tx.amount.toFixed ? tx.amount.toFixed(8) : tx.amount} BTC</span>
                        <span className="date">{tx.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

