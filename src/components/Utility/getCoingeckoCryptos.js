import CoinGecko from "coingecko-api";

export const getCoingeckoCryptos = async () => {
    const CoinGeckoClient = new CoinGecko();
    let data = await CoinGeckoClient.coins.list()
    console.log("crypto data by fetching : ", data);
    return data.data;
}

export const getCoingeckoExchanges = async () => {
    const CoinGeckoClient = new CoinGecko();
    let data = await CoinGeckoClient.exchanges.all()
    console.log("exchanges data by fetching : ", data);
    return data.data;
}
