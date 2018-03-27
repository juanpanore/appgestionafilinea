import { Map } from "immutable";
import { Observable } from "rxjs";
import _ from "lodash";
import "rxjs/operator/mergeMap";
import "rxjs/operator/filter";
import "rxjs/operator/delay";
import "rxjs/operator/concat";
import { MESSAGES } from "./types";

const TOGGLE_SNACKBAR = "payments/snackbar/toggle-snackbar";
const OPEN_SNACKBAR = "payments/snackbar/OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "payments/snackbar/CLOSE_SNACKBAR";

const initialState = Map({
    opened: false,
    type: MESSAGES.NORMAL,
    message: ""
});

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return state.withMutations(s => {
                s.set("opened", true);
                s.set("message", _.get(action, "payload.message", ""));
                s.set("type", _.get(action, "payload.type", MESSAGES.NORMAL));
                s.set("title", _.get(action, "payload.title", null));
            });
        case CLOSE_SNACKBAR:
            return state.set("opened", false).set("message", "");
        default:
            return state;
    }
}

export function closeToggleSnackbar() {
    return {
        type: CLOSE_SNACKBAR
    };
}

export function showAlert(message, type, title) {
    return {
        type: TOGGLE_SNACKBAR,
        payload: {
            message,
            title,
            type
        }
    };
}

export const alertEpic$ = action$ =>
    action$.ofType(TOGGLE_SNACKBAR).mergeMap(action =>
        Observable.of({
            type: OPEN_SNACKBAR,
            payload: action.payload
        })
    );
