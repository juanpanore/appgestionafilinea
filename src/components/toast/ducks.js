import { Map } from "immutable";
import { Observable } from "rxjs";
import "rxjs/operator/mergeMap";
import "rxjs/operator/filter";
import "rxjs/operator/delay";
import "rxjs/operator/concat";

const TOGGLE_SNACKBAR = "payments/snackbar/toggle-snackbar";
const OPEN_SNACKBAR = "payments/snackbar/OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "payments/snackbar/CLOSE_SNACKBAR";

const initialState = Map({
  opened: false,
  message: ""
});
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return state.set("opened", true).set("message", action.payload.message);
    case CLOSE_SNACKBAR:
      return state.set("opened", false).set("message", "");
    default:
      return state;
  }
}

export function toggleSnackbar(message) {
  return {
    type: TOGGLE_SNACKBAR,
    payload: {
      message
    }
  };
}

export const snackbarEpic$ = action$ =>
  action$.ofType(TOGGLE_SNACKBAR).mergeMap(action =>
    Observable.of({
      type: OPEN_SNACKBAR,
      payload: action.payload
    }).concat(Observable.of({ type: CLOSE_SNACKBAR }).delay(4000))
  );
