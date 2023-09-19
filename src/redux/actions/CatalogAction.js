import {CatalogService} from "../../service";
import {DELETE_CATALOGS, GET_ALL_CATALOGS, SAVE_CATALOG, UPDATE_CATALOG} from "../types";
import {showAlert} from "./AlertAction";

export const getAllCatalogs = () => async (dispatch) => {
    try {
        const res = await CatalogService.getAll();

        dispatch({
            type: GET_ALL_CATALOGS,
            payload: res.data.data
        });

        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Hata", "Kataloglar sunucudan yüklenemedi"));
        return Promise.reject(err)
    }
}

export const saveCatalog = (catalog) => async (dispatch) => {
    try {
        const res = await CatalogService.save(catalog);

        dispatch({
            type: SAVE_CATALOG,
            payload: res.data.data
        });

        dispatch(showAlert("success", "Katalog Eklendi", "Yeni katalog başarıyla eklendi"));
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Katalog Eklenemedi", "Yeni katalog eklenemedi"));
        return Promise.reject(err)
    }
}

export const updateCatalog = (catalog) => async (dispatch) => {
    try {
        const res = await CatalogService.update(catalog);

        dispatch({
            type: UPDATE_CATALOG,
            payload: res.data.data
        });

        dispatch(showAlert("success", "Katalog Güncellendi", "Yeni katalog başarıyla güncellendi"));
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert("error", "Katalog Güncellenemedi", "Yeni katalog eklenirken bir hata oluştu"));
        return Promise.reject(err)
    }
}

export const removeCatalogs = (catalogIds) => async (dispatch) => {
    try {
        await CatalogService.deleteByIds(catalogIds);

        dispatch({
            type: DELETE_CATALOGS,
            payload: catalogIds
        });

        dispatch(showAlert("success", "Kataloglar Silindi",
            catalogIds.length + " adet katalog başarıyla silindi"));
        return Promise.resolve(catalogIds);
    } catch (err) {
        dispatch(showAlert("error", "Kataloglar Silinemedi", "Kataloglar silinirken bir hata oluştu"));
        return Promise.reject(err)
    }
}
