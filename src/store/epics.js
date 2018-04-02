import { combineEpics } from "redux-observable";
import {
    searchDocTypesEpicPays$,
    searchBillEpic$,
    searchNoSoonBillEpic$
} from "../containers/billList/ducks";
import {
    sendBillEpic$,
    searchDocTypesEpic$
} from "../containers/radication/ducks";
import { alertEpic$ } from "../components/alert/ducks";

export default combineEpics(
    searchBillEpic$,
    sendBillEpic$,
    searchNoSoonBillEpic$,
    alertEpic$,
    searchDocTypesEpic$,
    searchDocTypesEpicPays$
);
