import { Map } from "immutable";
import _ from "lodash";
import createReducer from "../../util/createReducer";

const CHANGE_CONTENT_COLLAPSE =
    "payments/content-collapse-left/CHANGE_CONTENT_COLLAPSE";
const SHOW_CONTENT_COLLAPSE =
    "payments/content-collapse-left/SHOW_CONTENT_COLLAPSE";
const CLOSE_CONTENT_COLLAPSE =
    "payments/content-collapse-left/CLOSE_CONTENT_COLLAPSE";
const REGISTER_CONTENT_COLLAPSE =
    "payments/content-collapse-left/REGISTER_CONTENT_COLLAPSE";

const stateValue = Map({
    open: false
});

const initialState = Map({
    default: stateValue
});

export default createReducer(initialState, {
    [CHANGE_CONTENT_COLLAPSE]: (state, action) => {
        const id = _.get(action, "meta.id", "default");
        const stateComponent = state.get(id);
        const openCollapse = stateComponent.get("open");
        return state.set(id, stateComponent.set("open", !openCollapse));
    },
    [SHOW_CONTENT_COLLAPSE]: (state, action) => {
        const idShow = _.get(action, "meta.id", "default");
        const stateShowComponent = state.get(idShow);
        return state.set(idShow, stateShowComponent.set("open", true));
    },
    [CLOSE_CONTENT_COLLAPSE]: (state, action) => {
        const idClose = _.get(action, "meta.id", "default");
        const stateCloseComponent = state.get(idClose);
        return state.set(idClose, stateCloseComponent.set("open", false));
    },
    [REGISTER_CONTENT_COLLAPSE]: (state, action) => {
        const id = _.get(action, "meta.id", "default");
        const initValue = _.get(action, "meta.initValue", false);
        if (state.has(id)) {
            const stateInit = state.get(id);
            return state.set(id, stateInit.set("open", initValue));
        }
        const newState = stateValue;
        return state.set(id, newState.set("open", initValue));
    }
});

export function changeCollapse(id) {
    return {
        type: CHANGE_CONTENT_COLLAPSE,
        meta: {
            id
        }
    };
}

export function registerCollapse(id, initValue) {
    return {
        type: REGISTER_CONTENT_COLLAPSE,
        meta: {
            id,
            initValue
        }
    };
}

export function showCollapse(id) {
    return {
        type: SHOW_CONTENT_COLLAPSE,
        meta: {
            id
        }
    };
}

export function closeCollapse(id) {
    return {
        type: CLOSE_CONTENT_COLLAPSE,
        meta: {
            id
        }
    };
}
