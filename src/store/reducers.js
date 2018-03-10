import { combineReducers } from "redux";
import appSelector from "../components/appSelection/ducks";
import searchPreventionBill from "../components/prevention/searchPrevention/ducks";
import settlement from "../components/forms/radicacion/ducks";
import snackbar from "../components/toast/ducks";

export default combineReducers({
  appSelector,
  searchPreventionBill,
  settlement,
  snackbar
});
