import {SET_ALERT_MESSAGE} from "../types";

const initialState = {id: 0, variant: "info", title: "", message: ""};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT_MESSAGE:
            return {id: state.id + 1, ...payload};
        default:
            return state;
    }
}
