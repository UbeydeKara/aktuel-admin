import {MarketService} from "../../service";
import {ADD_MARKET, DELETE_MARKET, GET_ALL_MARKETS, SELECT_MARKET, UPDATE_MARKET} from "../types";
import {showAlert} from "./AlertAction";
import {getAllCatalogs} from "./CatalogAction";

export const getAllMarkets = () => async (dispatch) => {
    try {
        const res = await MarketService.getMarkets();

        dispatch({
            type: GET_ALL_MARKETS,
            payload: res.data.data
        });

        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Hata", "Marketler sunucudan yüklenemedi"));
        return Promise.reject(err)
    }
}

export const addMarket = (market) => async(dispatch) => {
    try {
        const res = await MarketService.save(market);

        dispatch({
            type: ADD_MARKET,
            payload: res.data.data
        });

        dispatch(showAlert("success", "Yeni Market Eklendi", market.title + " marketi başarıyla eklendi"));
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Market Eklenemedi", market.title + " marketi eklenirken bir hata oluştu"));
        return Promise.reject(err)
    }
}

export const updateMarket = (market) => async(dispatch) => {
    try {
        const res = await MarketService.save(market);

        dispatch({
            type: UPDATE_MARKET,
            payload: res.data.data
        });

        dispatch(showAlert("success", "Market Güncellendi", market.title + " marketi başarıyla güncellendi"));
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Market Güncellenemedi", market.title + " marketi güncellenirken bir hata oluştu"));
        return Promise.reject(err)
    }
}

export const deleteMarket = (market) => async(dispatch) => {
    try {
        await MarketService.deleteById(market.marketID);

        dispatch({
            type: DELETE_MARKET,
            payload: market
        })

        dispatch(getAllCatalogs());
        dispatch(showAlert("success", "Market Silindi", market.title + " marketi başarıyla silindi"));

        return Promise.resolve(market);
    } catch (err) {
        dispatch(showAlert("error", "Market Silinemedi", market.title + " marketi silinirken bir hata oluştu"));
        return Promise.reject(err)
    }
}

export const selectMarket = (market) => (dispatch) => {
    dispatch({
        type: SELECT_MARKET,
        payload: market
    });
}
