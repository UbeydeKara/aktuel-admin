import http from "./http-common";

const serviceUrl = "/market"

const getMarkets = () => {
    return http.get(serviceUrl + "/findAll");
};

const save = (market) => {
    return http.post(serviceUrl + "/save", market);
}

const MarketService = {
    getMarkets,
    save
};

export default MarketService;
