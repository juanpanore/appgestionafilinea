import { Map } from "immutable";
import createReducer from "../../util/createReducer";
import { /* menuSmall, */ menuNormal } from "./types";

const OPEN_MENU = "payments/menu-left/OPEN_MENU";

const initialState = Map({
    sizeMenu: menuNormal,
    openMenu: true
});

export default createReducer(initialState, {
    [OPEN_MENU]: state => state.set("openMenu", true)
    /* [OPEN_MENU]: state => {
        const open = !state.get("openMenu");
        const size = open ? menuNormal : menuSmall;
        return state.withMutations(st => {
            st.set("openMenu", open);
            st.set("sizeMenu", size);
        });
    }, */
});

export function showMenu() {
    return {
        type: OPEN_MENU
    };
}
