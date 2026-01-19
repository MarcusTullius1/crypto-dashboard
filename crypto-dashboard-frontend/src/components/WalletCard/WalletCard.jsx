import React from 'react';
import WalletInfo from '../WalletInfo/WalletInfo';
import ActivityList from '../ActivityList/ActivityList';
import './WalletCard.css';

export default function WalletCard({ wallet }) {
    return (
        <div className="wallet-card">
            <WalletInfo wallet={wallet} />
            <ActivityList wallet={wallet} />
        </div>
    );
}
