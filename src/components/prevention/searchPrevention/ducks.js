import { Map } from "immutable";
import { Observable } from "rxjs";
import axios from "../../../api";
import createReducer from "../../../util/createReducer";

const SEARCH_BILL_REQUEST = "payments/prevention/search-prevention/SEARCH_BILL_REQUEST";
const SEARCH_BILL_FULFILLED = "payments/prevention/search-prevention/SEARCH_BILL_FULFILLED";
const SEARCH_BILL_FAILED = "payments/prevention/search-prevention/SEARCH_BILL_FAILED";
const SEARCH_BILL_IN_PROGRESS = "payments/prevention/search-prevention/SEARCH_BILL_IN_PROGRESS";

const initialState = Map({
  loading: false,
  bills: []
});
export default createReducer(initialState, {
  [SEARCH_BILL_IN_PROGRESS]: state => state.set("loading", true),
  [SEARCH_BILL_FULFILLED]: (state, action) =>
    state.withMutations(map => {
      map.set("loading", false).set("bills", action.payload.data);
    }),
  [SEARCH_BILL_FAILED]: state => state.set("loading", false)
});

export function searchBill(dniProvider, searchText) {
  return {
    type: SEARCH_BILL_REQUEST,
    payload: {
      dniProvider,
      searchText
    }
  };
}

export const searchBillEpic = action$ =>
  action$.ofType(SEARCH_BILL_REQUEST).mergeMap(action => {
    const { payload: { dniProvider, searchText } } = action;
    const text = `${dniProvider}${searchText}`;
    const promise = axios.get("/v1/provider", {
      params: {
        id: text
      }
    });
    return Observable.fromPromise(promise)
      .map(response => [response.data])
      .map(data => ({ type: SEARCH_BILL_FULFILLED, payload: { data } }))
      .catch(error => Observable.of({ type: SEARCH_BILL_FAILED, payload: { error } }))
      .startWith({ type: SEARCH_BILL_IN_PROGRESS });
  });
