import { combineEpics } from "redux-observable";
import { searchBillEpic } from "../containers/billList/ducks";
import { searchProviderEpic$, sendBillEpic$, searchDocTypesEpic$ } from "../containers/radication/ducks";
import { snackbarEpic$ } from "../components/toast/ducks";

export default combineEpics(searchBillEpic, searchProviderEpic$, sendBillEpic$, snackbarEpic$, searchDocTypesEpic$);
