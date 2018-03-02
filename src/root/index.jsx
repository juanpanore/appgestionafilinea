import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Header from "../components/header";
import FormRadicacion from "../components/forms/radicacion";
import Status from "../components/status";

const muiTheme = getMuiTheme({
    appBar: {
        color: "rgb(120,190,32)"
    },
    tabs: {
        backgroundColor: "rgb(120,190,32)"
    },
    inkBar: {
        backgroundColor: "rgb(0,51,160)"
    },
    textField: {
        borderColor: "rgb(120,190,32)",
        focusColor: "rgb(0,51,160)",
        floatingLabelColor: "rgb(120,190,32)"
    },
    datePicker: {
        headerColor: "rgb(120,190,32)",
        selectColor: "rgb(0,51,160)",
        color: "rgb(0,51,160)",
        calendarTextColor: "rgb(0,51,160)"
    },
    paper: {
        margin: 20,
        textAlign: "left",
        display: "inline-block",
        flex: 50,
        padding: 20,
        color: "RGB(0,51,160)"
    },
    raisedButton: {
        color: "RGB(0,51,160)",
        textColor: "RGB(255,255,255)",
        fontSize: 20
    }
});

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
            <Fragment>
                <Header title="ARL" />
                <Route path="/status" component={Status} />
            </Fragment>
        </BrowserRouter>
        <FormRadicacion />
    </MuiThemeProvider>
);

export default hot(module)(App);
