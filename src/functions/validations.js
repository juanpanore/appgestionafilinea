import _ from "lodash";

export function checkNotNull(value, msg) {
    if (_.isEmpty(value)) {
        return msg || "Not null";
    }
    return undefined;
}

export function checkArgument(evaluation, msg) {
    if (evaluation) {
        return msg || "Not null";
    }
    return undefined;
}

export default {
    checkNotNull,
    checkArgument
};
