import {SET_SELECTED_ROWS} from "../types";

export const setSelectedRows = (rows) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_ROWS,
        payload: rows
    });
}
