import { combineEpics } from "redux-observable";
import { searchBillEpic } from "../containers/billList/ducks";
import { searchProviderEpic$, sendBillEpic$, searchDocTypesEpic$ } from "../containers/radication/ducks";
import { alertEpic$ } from "../components/alert/ducks";

export default combineEpics(searchBillEpic, searchProviderEpic$, sendBillEpic$, alertEpic$, searchDocTypesEpic$);
