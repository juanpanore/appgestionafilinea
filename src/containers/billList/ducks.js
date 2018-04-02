import { Map } from "immutable";
import { Observable } from "rxjs";
import _ from "lodash";
import apiAxios from "../../api";
import createReducer from "../../util/createReducer";
import { showAlert } from "../../components/alert/ducks";
import { MESSAGES } from "../../components/alert/types";

const SEARCH_BILL_REQUEST =
    "payments/prevention/search-prevention/SEARCH_BILL_REQUEST";
const SEARCH_BILL_FULFILLED =
    "payments/prevention/search-prevention/SEARCH_BILL_FULFILLED";
const SEARCH_BILL_FAILED =
    "payments/prevention/search-prevention/SEARCH_BILL_FAILED";
const SEARCH_BILL_IN_PROGRESS =
    "payments/prevention/search-prevention/SEARCH_BILL_IN_PROGRESS";

const SEARCH_NO_SOON_BILL_REQUEST =
    "payments/prevention/search-prevention/SEARCH_NO_SOON_BILL_REQUEST";
const SEARCH_NO_SOON_BILL_FULFILLED =
    "payments/prevention/search-prevention/SEARCH_NO_SOON_BILL_FULFILLED";
const SEARCH_NO_SOON_BILL_FAILED =
    "payments/prevention/search-prevention/SEARCH_NO_SOON_BILL_FAILED";
const SEARCH_NO_SOON_BILL_IN_PROGRESS =
    "payments/prevention/search-prevention/SEARCH_NO_SOON_BILL_IN_PROGRESS";

const SEARCH_DOC_TYPES_DATA_REQUESTED =
    "payments/pays/SEARCH_DOC_TYPES_DATA_REQUESTED";
const SEARCH_DOC_TYPES_DATA_IN_PROGRESS =
    "payments/pays/SEARCH_DOC_TYPES_DATA_IN_PROGRESS";
export const SEARCH_DOC_TYPES_DATA_FULFILLED =
    "payments/pays/SEARCH_DOC_TYPES_DATA_FULFILLED";
const SEARCH_DOC_TYPES_DATA_FAILED =
    "payments/pays/SEARCH_DOC_TYPES_DATA_FAILED";
const SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA =
    "payments/pays/SEARCH_DOC_TYPES_DATA_FULFILLED_NO_DATA";
const SEARCH_DOC_TYPES_DATA_CLEAN = "payments/pays/SEARCH_DOC_TYPES_DATA_CLEAN";

const CLEAN_BILL = "payments/prevention/search-prevention/CLEAN_BILL";

const initialState = Map({
    loading: false,
    bills: [],
    noSoonBills: [],
    docTypes: [],
    loadingDocTypes: false,
    statusDocType: SEARCH_DOC_TYPES_DATA_CLEAN,
    statusDocTypeError: ""
});

export default createReducer(initialState, {
    [SEARCH_BILL_IN_PROGRESS]: state => state.set("loading", true),
    [SEARCH_BILL_FULFILLED]: (state, action) =>
        state.withMutations(map => {
            map
                .set("loading", false)
                .set("bills", _.get(action, "payload.data"));
        }),
    [SEARCH_BILL_FAILED]: state => state.set("loading", false),
    [SEARCH_NO_SOON_BILL_IN_PROGRESS]: state => state.set("loading", true),
    [SEARCH_NO_SOON_BILL_FULFILLED]: (state, action) =>
        state.withMutations(map => {
            map
                .set("loading", false)
                .set("noSoonBills", _.get(action, "payload.data"));
        }),
    [SEARCH_NO_SOON_BILL_FAILED]: state => state.set("loading", false),
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
        ),
    [CLEAN_BILL]: () => initialState
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

export function searchNoSoonBill(dniProvider, searchText) {
    return {
        type: SEARCH_NO_SOON_BILL_REQUEST,
        payload: {
            dniProvider,
            searchText
        }
    };
}

export function searchDocTypes() {
    return {
        type: SEARCH_DOC_TYPES_DATA_REQUESTED
    };
}

const httpFulfilled = action => response => ({
    type: action,
    payload: {
        data: response.data
    }
});

function httpError(action, error) {
    return {
        type: action,
        payload: {
            err: _.toString(error)
        }
    };
}

export function cleanBill() {
    return {
        type: CLEAN_BILL
    };
}

export const searchBillEpic$ = action$ =>
    action$.ofType(SEARCH_BILL_REQUEST).mergeMap(action => {
        const { payload: { dniProvider, searchText } } = action;
        const text = `${dniProvider}${searchText}`;
        const promise = apiAxios.get("/v1/bill/paySoonBills", {
            params: {
                id: text
            }
        });
        return Observable.fromPromise(promise)
            .map(response => [response.data])
            .map(data => ({ type: SEARCH_BILL_FULFILLED, payload: { data } }))
            .catch(error =>
                Observable.of({ type: SEARCH_BILL_FAILED, payload: { error } })
            )
            .startWith({ type: SEARCH_BILL_IN_PROGRESS });
    });

export const searchNoSoonBillEpic$ = action$ =>
    action$.ofType(SEARCH_NO_SOON_BILL_REQUEST).mergeMap(action => {
        const { payload: { dniProvider, searchText } } = action;
        const text = `${dniProvider}${searchText}`;
        const promise = apiAxios.get("/v1/bill/noPaySoonBills", {
            params: {
                id: text
            }
        });
        return Observable.fromPromise(promise)
            .map(response => [response.data])
            .map(data => ({
                type: SEARCH_NO_SOON_BILL_FULFILLED,
                payload: { data }
            }))
            .catch(error =>
                Observable.of({
                    type: SEARCH_NO_SOON_BILL_FAILED,
                    payload: { error }
                })
            )
            .startWith({ type: SEARCH_NO_SOON_BILL_IN_PROGRESS });
    });

export const searchDocTypesEpicPays$ = action$ =>
    action$.ofType(SEARCH_DOC_TYPES_DATA_REQUESTED).mergeMap(() => {
        const url = `/v1/provider/docTypes`;
        const promise = apiAxios.get(url);
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
