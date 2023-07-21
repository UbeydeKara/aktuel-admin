import http from "./http-common";

const catalogUrl = "/catalog"
const marketUrl = "/market"

const getAll = () => {
    return http.get(catalogUrl);
};

const findAllByMarket = (market) => {
    return http.post(catalogUrl + "/market", market);
};

const getMarkets = () => {
    return http.get(marketUrl);
};

const save = (catalog) => {
    return http.post(catalogUrl, catalog);
}

const update = (catalog) => {
    return http.put(catalogUrl, catalog);
}

const deleteByIds = (catalogIds) => {
    return http.delete(catalogUrl, {
        params: {catalogIDs: catalogIds},
        paramsSerializer: {
            indexes: null
        }
    })
}

const CatalogService = {
    getAll,
    findAllByMarket,
    getMarkets,
    save,
    update,
    deleteByIds
};

export default CatalogService;
