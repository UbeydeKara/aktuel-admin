import {DELETE_CATALOGS, GET_ALL_CATALOGS, SAVE_CATALOG, UPDATE_CATALOG} from "../types";

const initialState = {catalogs: []};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ALL_CATALOGS:
            return {...state, catalogs: payload};
        case SAVE_CATALOG:
            return {...state, catalogs: [...state.catalogs, payload]};
        case UPDATE_CATALOG:
            return {
                ...state, catalogs: state.catalogs.map(obj => {
                    if (obj.catalogID === payload.catalogID) return payload;
                    return obj;
                })
            };
        case DELETE_CATALOGS:
            return {...state, catalogs: state.catalogs.filter(x => !payload.includes(x.catalogID))};
        default:
            return state;
    }
}
