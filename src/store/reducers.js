import { combineReducers } from "redux";
import appSelector from "../components/appSelection/ducks";
import menuLeft from "../components/menuLeft/ducks";
import searchPreventionBill from "../containers/billList/ducks";
import settlement from "../containers/radication/ducks";
import alert from "../components/alert/ducks";
import contentCollapse from "../components/contentCollapse/ducks";

export default combineReducers({
    appSelector,
    menuLeft,
    searchPreventionBill,
    settlement,
    alert,
    contentCollapse
});
