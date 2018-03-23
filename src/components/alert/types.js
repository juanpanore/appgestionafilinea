import { orange500, red500, lightGreen500, blue500, grey100 } from "material-ui/styles/colors";
import isEmpty from 'lodash/isEmpty';

const ERROR = "TOAST_MESSAGE_ERROR";
const SUCCESS = "TOAST_MESSAGE_SUCCESS";
const INFO = "TOAST_MESSAGE_INFO";
const WARNING = "TOAST_MESSAGE_WARNING";
const NORMAL = "TOAST_MESSAGE_NORMAL";

export const MESSAGES = {
    ERROR,
    SUCCESS,
    INFO,
    WARNING,
    NORMAL
};

export const ARRAY_MESSAGES = [
    ERROR,
    SUCCESS,
    INFO,
    WARNING,
    NORMAL
];

export function getColorType(type){
    switch (type) {
        case ERROR:
            return { backgroundColor: grey100, color: red500 };
        case SUCCESS:
            return { backgroundColor: grey100, color: lightGreen500 };
        case INFO:
            return { backgroundColor: grey100, color: blue500 };
        case WARNING:
            return { backgroundColor: grey100, color: orange500 };
        case NORMAL:
            return { backgroundColor: grey100, color: "#333333" };
        default:
            return { backgroundColor: "#FFF", color: "#333333" };
    }
}

export function getTextType(type, title){
    if(!isEmpty(title)){
        return title;
    }
    switch (type) {
        case ERROR:
            return "¡Error!";
        case SUCCESS:
            return "Correcto";
        case INFO:
            return "Información";
        case WARNING:
            return "¡Cuidado!";
        default:
            return "Aviso";
    }
}
