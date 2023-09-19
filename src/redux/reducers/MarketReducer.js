import {ADD_MARKET, DELETE_MARKET, GET_ALL_MARKETS, SELECT_MARKET, UPDATE_MARKET} from "../types";

const initialState = {markets: [], selectedMarketId: ""};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ALL_MARKETS:
            return {...state, markets: payload};
        case ADD_MARKET:
            return {...state, markets: [...state.markets, payload]};
        case UPDATE_MARKET:
            return {
                ...state, markets: state.markets.map(obj => {
                    if (obj.marketID === payload.marketID) return payload;
                    return obj;
                })
            };
        case SELECT_MARKET:
            return {...state, selectedMarketId: payload};
        case DELETE_MARKET:
            return {...state, markets: state.markets.filter(x => x !== payload), selectedMarketId: ""};
        default:
            return state;
    }
}
