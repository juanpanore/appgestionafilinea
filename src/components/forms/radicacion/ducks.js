import { Map } from "immutable";
import { Observable } from "rxjs";
import _ from "lodash";
import axios from "../../../api";
import createReducer from "../../../util/createReducer";
import { toggleSnackbar } from "../../toast/ducks";

const SEARCH_PROVIDER_DATA_REQUESTED = "payments/bills-settlement/SEARCH_PROVIDER_DATA_REQUESTED";
const SEARCH_PROVIDER_DATA_IN_PROGRESS =
  "payments/bills-settlement/SEARCH_PROVIDER_DATA_IN_PROGRESS";
export const SEARCH_PROVIDER_DATA_FULFILLED_DATA =
  "payments/bills-settlement/SEARCH_PROVIDER_DATA_FULFILLED_DATA";
const SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA =
  "payments/bills-settlement/SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA";
const SEARCH_PROVIDER_DATA_FAILED = "payments/bills-settlement/SEARCH_PROVIDER_DATA_FAILED";
const SEARCH_PROVIDER_DATA_CLEAN = "payments/bills-settlement/SEARCH_PROVIDER_DATA_CLEAN";

const SEND_BILL_DATA_REQUESTED = "payments/bills-settlement/SEND_BILL_DATA_REQUESTED";
const SEND_BILL_DATA_IN_PROGRESS = "payments/bills-settlement/SEND_BILL_DATA_IN_PROGRESS";
const SEND_BILL_DATA_FAILED = "payments/bills-settlement/SEND_BILL_DATA_FAILED";
const SEND_BILL_DATA_FULFILLED = "payments/bills-settlement/SEND_BILL_DATA_FULFILLED";
const SEND_BILL_DATA_CLEAN = "payments/bills-settlement/SEND_BILL_DATA_CLEAN";

const initialState = Map({
  provider: {},
  loadingProvider: false,
  sendingBill: false,
  statusBill: SEND_BILL_DATA_CLEAN,
  statusBillError: "",
  statusProvider: SEARCH_PROVIDER_DATA_CLEAN,
  statusProviderError: ""
});
export default createReducer(initialState, {
  [SEARCH_PROVIDER_DATA_IN_PROGRESS]: state => state.set("loadingProvider", true),
  [SEARCH_PROVIDER_DATA_CLEAN]: state =>
    state.withMutations(map =>
      map
        .set("provider", {})
        .set("loadingProvider", false)
        .set("statusProviderError", "")
        .set("statusProvider", SEARCH_PROVIDER_DATA_CLEAN)
    ),
  [SEARCH_PROVIDER_DATA_FAILED]: (state, action) =>
    state.withMutations(map =>
      map
        .set("loadingProvider", false)
        .set("statusProvider", action.type)
        .set("statusProviderError", action.payload.err)
    ),
  [SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA]: (state, action) =>
    state.withMutations(map =>
      map.set("loadingProvider", false).set("statusProvider", action.type)
    ),
  [SEARCH_PROVIDER_DATA_FULFILLED_DATA]: (state, action) =>
    state.withMutations(map =>
      map
        .set("loadingProvider", false)
        .set("statusProvider", SEARCH_PROVIDER_DATA_FULFILLED_DATA)
        .set("provider", action.payload.data)
    ),
  [SEND_BILL_DATA_IN_PROGRESS]: state => state.set("sendingBill", true),
  [SEND_BILL_DATA_FAILED]: (state, action) =>
    state.withMutations(map =>
      map
        .set("sendingBill", false)
        .set("statusBill", action.type)
        .set("statusBillError", action.payload.err)
    ),
  [SEND_BILL_DATA_FULFILLED]: (state, action) =>
    state.withMutations(map =>
      map
        .set("sendingBill", false)
        .set("statusBill", SEND_BILL_DATA_FULFILLED)
        .set("bill", action.payload.data)
    ),
  [SEND_BILL_DATA_CLEAN]: state =>
    state.withMutations(map =>
      map
        .set("sendingBill", false)
        .set("statusBillError", "")
        .set("statusBill", SEND_BILL_DATA_CLEAN)
    )
});

export function searchProviderData(idType, id) {
  return {
    type: SEARCH_PROVIDER_DATA_REQUESTED,
    payload: {
      idType,
      id
    }
  };
}

export function sendBillData(dniProvider, delegation, bill) {
  return {
    type: SEND_BILL_DATA_REQUESTED,
    payload: {
      dniProvider,
      bill,
      delegation
    }
  };
}

export function cleanData() {
  return {
    type: SEARCH_PROVIDER_DATA_CLEAN
  };
}
export function cleanBillData() {
  return {
    type: SEND_BILL_DATA_CLEAN
  };
}

function httpError(action, error) {
  return {
    type: action,
    payload: {
      err: _.toString(error)
    }
  };
}

const httpFulfilled = action => response => ({
  type: action,
  payload: {
    data: response.data
  }
});

export const searchProviderEpic$ = action$ =>
  action$.ofType(SEARCH_PROVIDER_DATA_REQUESTED).mergeMap(action => {
    const { payload: { idType, id } } = action;
    const url = `/v1/provider/${idType + id}`;
    const promise = axios.get(url);
    return Observable.fromPromise(promise)
      .map(httpFulfilled(SEARCH_PROVIDER_DATA_FULFILLED_DATA))
      .concatMap(resultAction =>
        Observable.of(resultAction, toggleSnackbar("Proveedor encontrado."))
      )
      .catch(error => {
        const { response } = error;
        if (_.isEqual(response.status, 404)) {
          return Observable.of(
            {
              type: SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA
            },
            toggleSnackbar("Proveedor no encontrado")
          );
        }
        return Observable.of(
          httpError(SEARCH_PROVIDER_DATA_FAILED, error),
          toggleSnackbar("Error consultando el proveedor")
        );
      })
      .startWith({ type: SEARCH_PROVIDER_DATA_IN_PROGRESS });
  });

export const sendBillEpic$ = action$ =>
  action$.ofType(SEND_BILL_DATA_REQUESTED).mergeMap(action => {
    const {
      payload: {
        dniProvider,
        delegation,
        bill: { billNumber, billArrivalDate, billDate, billValue }
      }
    } = action;
    const url = `/v1/bill/`;
    const promise = axios({
      method: "POST",
      url,
      data: {
        dniProvider,
        billNumber,
        billArrivalDate,
        billDate,
        billValue,
        delegation
      }
    });
    return Observable.fromPromise(promise)
      .map(httpFulfilled(SEND_BILL_DATA_FULFILLED))
      .concatMap(resultAction =>
        Observable.of(
          resultAction,
          toggleSnackbar(`Radicación exitosa: ${_.get(resultAction, "payload.data.id")}`)
        )
      )
      .catch(error => {
        const { response } = error;
        if (_.isEqual(response.status, 500)) {
          toggleSnackbar("Error en el servidor.");
        }
        if (_.isEqual(response.status, 400)) {
          toggleSnackbar("Error validando la factura.");
        }
      })
      .startWith({ type: SEND_BILL_DATA_IN_PROGRESS });
  });
