import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Header from "../header";
import FormRadicacion from "../forms/radicacion";
import Status from "../status";

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
