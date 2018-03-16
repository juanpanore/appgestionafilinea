import { Map } from "immutable";
import createReducer from "../../util/createReducer";

const OPEN_MENU = "payments/menu-left/OPEN_MENU";

const initialState = Map({
    sizeMenu: 270,
    openMenu: true,
});

export default createReducer(initialState, {
    [OPEN_MENU]: state => state.set("openMenu", true),
    /* [OPEN_MENU]: state => {
        const open = state.get("openMenu");
        return state.set("openMenu", !open);
    }, */
});

export function showMenu() {
    return {
        type: OPEN_MENU,
    };
}
