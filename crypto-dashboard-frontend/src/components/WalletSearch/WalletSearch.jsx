import React, { useState } from 'react';

export default function WalletSearch({ onSearch }) {
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address.trim() === '') return;
        onSearch(address.trim());
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Введите BTC адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ padding: '8px', width: '300px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '8px 12px' }}>Поиск</button>
        </form>
    );
}
