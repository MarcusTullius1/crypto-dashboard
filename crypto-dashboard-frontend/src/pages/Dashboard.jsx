import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import WalletSearch from '../components/WalletSearch/WalletSearch';
import WalletCard from '../components/WalletCard/WalletCard';
import NewsBlock from '../components/NewsBlock/NewsBlock';
import Loader from '../components/Loader/Loader';

import { getWalletData } from '../Api/cryptoApi';
import { getNewsData } from '../Api/newsApi';

export default function Dashboard() {
    const [wallet, setWallet] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (address) => {
        setLoading(true);

        try {
            const data = await getWalletData(address);
            setWallet(data);
        } catch (error) {
            console.error('Ошибка при получении кошелька:', error);

            setWallet({
                address,
                balance: 0,
                transactions: [
                    { hash: "000000", amount: 0, date: "N/A" }
                ],
                error: "API недоступен, показаны тестовые данные"
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        const loadNews = async () => {
            try {
                const newsData = await getNewsData();
                setNews(newsData);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
                setNews([]);
            }
        };

        loadNews();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <main style={{ flex: 1, padding: '20px', backgroundColor: '#838383' }}>
                <WalletSearch onSearch={handleSearch} />

                {loading && <Loader />}

                {!loading && wallet && (
                    <div style={{ marginTop: '20px' }}>
                        <WalletCard wallet={wallet} />

                        {wallet.error && (
                            <p style={{ color: 'orange', marginTop: '10px' }}>
                                {wallet.error}
                            </p>
                        )}
                    </div>
                )}

                {!wallet && !loading && (
                    <p style={{ marginTop: '20px' }}>
                        Введите адрес BTC и нажмите "Поиск"
                    </p>
                )}

                <div style={{ marginTop: '40px' }}>
                    <NewsBlock news={news} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
