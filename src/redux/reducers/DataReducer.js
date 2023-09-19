import {SET_SELECTED_ROWS} from "../types";

const initialState = {selectedRowIds: []};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SELECTED_ROWS:
            return {...state, selectedRowIds: payload};
        default:
            return state;
    }
}
