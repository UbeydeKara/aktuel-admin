import {SET_ALERT_MESSAGE} from "../types";

export const showAlert = (variant, title, message) => (dispatch) => {
    dispatch({
        type: SET_ALERT_MESSAGE,
        payload: {variant, title, message}
    });
}
