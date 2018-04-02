import { Map } from "immutable";
import { Observable } from "rxjs";
import _ from "lodash";
import axios from "../../api";
import createReducer from "../../util/createReducer";
import { showAlert } from "../../components/alert/ducks";
import { MESSAGES } from "../../components/alert/types";

const SEARCH_PROVIDER_DATA_REQUESTED =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_REQUESTED";
const SEARCH_PROVIDER_DATA_IN_PROGRESS =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_IN_PROGRESS";
export const SEARCH_PROVIDER_DATA_FULFILLED_DATA =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_FULFILLED_DATA";
const SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_FULFILLED_NO_DATA";
const SEARCH_PROVIDER_DATA_FAILED =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_FAILED";
const SEARCH_PROVIDER_DATA_CLEAN =
    "payments/bills-settlement/SEARCH_PROVIDER_DATA_CLEAN";

const SEND_BILL_DATA_REQUESTED =
    "payments/bills-settlement/SEND_BILL_DATA_REQUESTED";
const SEND_BILL_DATA_IN_PROGRESS =
    "payments/bills-settlement/SEND_BILL_DATA_IN_PROGRESS";
const SEND_BILL_DATA_FAILED = "payments/bills-settlement/SEND_BILL_DATA_FAILED";
export const SEND_BILL_DATA_FULFILLED =
    "payments/bills-settlement/SEND_BILL_DATA_FULFILLED";
const SEND_BILL_DATA_CLEAN = "payments/bills-settlement/SEND_BILL_DATA_CLEAN";

const SEARCH_DOC_TYPES_DATA_REQUESTED =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_REQUESTED";
const SEARCH_DOC_TYPES_DATA_IN_PROGRESS =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_IN_PROGRESS";
export const SEARCH_DOC_TYPES_DATA_FULFILLED =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_FULFILLED";
const SEARCH_DOC_TYPES_DATA_FAILED =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_FAILED";
const SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA";
const SEARCH_DOC_TYPES_DATA_CLEAN =
    "payments/bills-settlement/SEARCH_DOC_TYPES_DATA_CLEAN";

const initialState = Map({
    provider: {},
    loadingProvider: false,
    sendingBill: false,
    statusBill: SEND_BILL_DATA_CLEAN,
    statusBillError: "",
    statusProvider: SEARCH_PROVIDER_DATA_CLEAN,
    statusProviderError: "",
    docTypes: [],
    loadingDocTypes: false,
    statusDocType: SEARCH_DOC_TYPES_DATA_CLEAN,
    statusDocTypeError: ""
});
export default createReducer(initialState, {
    [SEARCH_PROVIDER_DATA_IN_PROGRESS]: state =>
        state.withMutations(map =>
            map.set("loadingProvider", true).set("provider", {})
        ),
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
        ),
    [SEARCH_DOC_TYPES_DATA_IN_PROGRESS]: state =>
        state.set("loadingDocTypes", true).set("docTypes", []),
    [SEARCH_DOC_TYPES_DATA_CLEAN]: state =>
        state.withMutations(map =>
            map
                .set("docTypes", [])
                .set("loadingDocTypes", false)
                .set("statusDocTypeError", "")
                .set("statusDocType", SEARCH_DOC_TYPES_DATA_CLEAN)
        ),
    [SEARCH_DOC_TYPES_DATA_FAILED]: (state, action) =>
        state.withMutations(map =>
            map
                .set("loadingDocTypes", false)
                .set("statusDocType", action.type)
                .set("statusDocTypeError", action.payload.err)
        ),
    [SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA]: (state, action) =>
        state.withMutations(map =>
            map.set("loadingDocTypes", false).set("statusDocType", action.type)
        ),
    [SEARCH_DOC_TYPES_DATA_FULFILLED]: (state, action) =>
        state.withMutations(map =>
            map
                .set("loadingDocTypes", false)
                .set("statusDocType", SEARCH_DOC_TYPES_DATA_FULFILLED)
                .set("docTypes", action.payload.data)
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

export function searchDocTypes() {
    return {
        type: SEARCH_DOC_TYPES_DATA_REQUESTED
    };
}

export function sendBillData(dniProvider, delegation, bill) {
    // const = const billValue = _.replace(text, /[^0-9\b]+/g, "");
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

export const sendBillEpic$ = action$ =>
    action$.ofType(SEND_BILL_DATA_REQUESTED).mergeMap(action => {
        const {
            payload: {
                dniProvider,
                delegation,
                bill: {
                    billPrefix,
                    billSuffix,
                    billArrivalDate,
                    billDate,
                    billValue
                }
            }
        } = action;
        const url = `/v1/bill/`;
        const promise = axios({
            method: "POST",
            url,
            data: {
                dniProvider,
                billPrefix,
                billSuffix,
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
                    showAlert(
                        `Radicación exitosa: ${_.get(
                            resultAction,
                            "payload.data.id"
                        )}`,
                        MESSAGES.SUCCESS
                    )
                )
            )
            .catch(error => {
                const { response } = error;
                const statusResponse = _.get(response, "status");
                if (_.isEqual(statusResponse, 500)) {
                    return Observable.of(
                        httpError(SEND_BILL_DATA_FAILED, error),
                        showAlert("Error en el servidor.", MESSAGES.ERROR)
                    );
                }
                if (_.isEqual(statusResponse, 400)) {
                    return Observable.of(
                        httpError(SEND_BILL_DATA_FAILED, error),
                        showAlert("Error validando la factura.", MESSAGES.ERROR)
                    );
                }
                if (_.isEqual(statusResponse, 412)) {
                    return Observable.of(
                        httpError(SEND_BILL_DATA_FAILED, error),
                        showAlert(
                            "Ya existe el nùmero de factura para el proveedor seleccionado.",
                            MESSAGES.INFO
                        )
                    );
                }
                return Observable.of(
                    httpError(SEND_BILL_DATA_FAILED, error),
                    showAlert(
                        "Ocurrió un error inesperado, por favor, intentelo de nuevo.",
                        MESSAGES.WARNING
                    )
                );
            })
            .startWith({ type: SEND_BILL_DATA_IN_PROGRESS });
    });

export const searchDocTypesEpic$ = action$ =>
    action$.ofType(SEARCH_DOC_TYPES_DATA_REQUESTED).mergeMap(() => {
        const url = `/v1/provider/docTypes`;
        const promise = axios.get(url);
        return Observable.fromPromise(promise)
            .map(httpFulfilled(SEARCH_DOC_TYPES_DATA_FULFILLED))
            .concatMap(resultAction => Observable.of(resultAction))
            .catch(error => {
                const { response } = error;
                const statusResponse = _.get(response, "status");
                if (_.isEqual(statusResponse, 404)) {
                    return Observable.of(
                        {
                            type: SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA
                        },
                        showAlert("No se econtraron datos.", MESSAGES.INFO)
                    );
                }
                return Observable.of(
                    httpError(SEARCH_DOC_TYPES_DATA_FAILED, error)
                );
            })
            .startWith({ type: SEARCH_DOC_TYPES_DATA_IN_PROGRESS });
    });
