import http from "./http-common";

const serviceUrl = "/market"

const getMarkets = () => {
    return http.get(serviceUrl + "/findAll");
};

const save = (market) => {
    return http.post(serviceUrl + "/save", market);
}

const deleteById = (marketID) => {
    return http.delete(serviceUrl + "/del/" + marketID);
}

const MarketService = {
    getMarkets,
    save,
    deleteById
};

export default MarketService;
