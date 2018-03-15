import { combineReducers } from "redux";
import appSelector from "../components/appSelection/ducks";
import searchPreventionBill from "../containers/billList/ducks";
import settlement from "../containers/radication/ducks";
import snackbar from "../components/toast/ducks";

export default combineReducers({
    appSelector,
    searchPreventionBill,
    settlement,
    snackbar,
});
