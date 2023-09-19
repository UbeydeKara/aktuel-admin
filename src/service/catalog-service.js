import http from "./http-common";

const serviceUrl = "/catalog"

const getAll = () => {
    return http.get(serviceUrl + "/findAll");
};

const findAllByMarket = (marketID) => {
    return http.get(serviceUrl + "/market/" + marketID);
};

const save = (catalog) => {
    return http.post(serviceUrl + "/save", catalog);
}

const update = (catalog) => {
    return http.put(serviceUrl + "/update", catalog);
}

const deleteByIds = (catalogIds) => {
    return http.delete(serviceUrl, {
        params: {catalogIDs: catalogIds},
        paramsSerializer: {
            indexes: null
        }
    })
}

const CatalogService = {
    getAll,
    findAllByMarket,
    save,
    update,
    deleteByIds
};

export default CatalogService;
