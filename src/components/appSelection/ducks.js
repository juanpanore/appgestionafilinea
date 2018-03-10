import { Map } from "immutable";
import createReducer from "../../util/createReducer";

const CHANGE_APP = "payments/app-selector/CHANGE_APP";

const initialState = Map({
  application: "prevention"
});

export default createReducer(initialState, {
  [CHANGE_APP]: (state, action) => state.set("application", action.payload.application)
});

export function changeApp(application) {
  return {
    type: CHANGE_APP,
    payload: {
      application
    }
  };
}
