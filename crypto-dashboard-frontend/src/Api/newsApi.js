export async function getNewsData() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/search/trending"
        );

        if (!response.ok) {
            throw new Error("Ошибка ответа от сервера новостей");
        }

        const result = await response.json();

        if (!result.coins || result.coins.length === 0) {
            throw new Error("Нет данных о трендах");
        }

        const news = result.coins.map(item => ({
            title: `${item.item.name} сейчас в тренде`,
            date: new Date().toISOString().slice(0, 10),
            description: `Криптовалюта ${item.item.name} (${item.item.symbol.toUpperCase()}) набирает популярность.`,
            link: `https://www.coingecko.com/en/coins/${item.item.id}`
        }));

        return news;

    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);

        return [
            {
                title: "Ошибка загрузки новостей",
                date: new Date().toISOString().slice(0, 10),
                description: "Не удалось получить данные из CoinGecko API",
                link: "#"
            }
        ];
    }
}
