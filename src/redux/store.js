import {configureStore} from "@reduxjs/toolkit";
import catalogReducer from "./reducers/CatalogReducer";
import marketReducer from "./reducers/MarketReducer";
import alertReducer from "./reducers/AlertReducer";
import dataReducer from "./reducers/DataReducer";

const store = configureStore({
    reducer: {
        catalogs: catalogReducer,
        markets: marketReducer,
        alert: alertReducer,
        data: dataReducer
    }
})

export default store;
