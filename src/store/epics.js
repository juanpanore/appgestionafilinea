import { combineEpics } from "redux-observable";
import { searchBillEpic } from "../components/prevention/searchPrevention/ducks";
import { searchProviderEpic$, sendBillEpic$, searchDocTypesEpic$ } from "../components/forms/radicacion/ducks";
import { snackbarEpic$ } from "../components/toast/ducks";

export default combineEpics(searchBillEpic, searchProviderEpic$, sendBillEpic$, snackbarEpic$, searchDocTypesEpic$);
