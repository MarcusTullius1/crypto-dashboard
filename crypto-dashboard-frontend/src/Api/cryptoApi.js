// src/Api/cryptoApi.js
export async function getWalletData(address) {
    try {
        const res = await fetch(`https://blockstream.info/api/address/${address}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

        const data = await res.json();

        // Баланс в BTC
        const balance = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
        const balanceBTC = balance / 1e8;

        // Получаем последние 10 транзакций
        const txRes = await fetch(`https://blockstream.info/api/address/${address}/txs`);
        if (!txRes.ok) throw new Error(`HTTP ${txRes.status} - ${txRes.statusText}`);

        const txs = await txRes.json();
        const transactions = txs.slice(0, 10).map(tx => {
            // ищем суммы входов и выходов для этого адреса
            let amount = 0;
            tx.vout.forEach(v => {
                if (v.scriptpubkey_address === address) amount += v.value;
            });
            tx.vin.forEach(v => {
                if (v.prevout.scriptpubkey_address === address) amount -= v.prevout.value;
            });

            // дата транзакции
            const date = tx.status.block_time ? new Date(tx.status.block_time * 1000).toISOString().split('T')[0] : "—";

            return {
                hash: tx.txid,
                amount: amount / 1e8, // сатоши → BTC
                date
            };
        });

        return {
            address,
            balance: balanceBTC,
            transactions
        };

    } catch (error) {
        console.error("Ошибка получения данных кошелька:", error);
        return {
            address,
            balance: 0,
            transactions: [],
            error: "Не удалось получить данные с Blockstream API"
        };
    }
}
