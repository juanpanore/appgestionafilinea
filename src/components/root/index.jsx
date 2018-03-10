import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Header from "../header";
import ResultsDashboard from "../prevention/searchPrevention/resultsDashboard";
import FormRadicacion from "../forms/radicacion";
import Status from "../status";
import Snackbar from "../toast";

import createStore from "../../store";

const muiTheme = getMuiTheme({
  appBar: {
    color: "rgb(0,51,160)"
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
    floatingLabelColor: "rgb(120,190,32)",
    errorColor: "rgb(244,67,54)"
  },
  datePicker: {
    headerColor: "rgb(0,51,160)",
    selectColor: "rgb(0,51,160)",
    color: "rgb(0,51,160)",
    calendarTextColor: "rgb(0,51,160)"
  },
  raisedButton: {
    color: "rgb(0,51,160)",
    textColor: "rgb(255,255,255)"
  }
});

const store = createStore();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Fragment>
        <BrowserRouter>
          <Fragment>
            <Header title="ARL" />
            <Route path="/bandeja" component={ResultsDashboard} />
            <Route path="/status" component={Status} />
            <Route path="/" component={FormRadicacion} />
          </Fragment>
        </BrowserRouter>
        <Snackbar />
      </Fragment>
    </MuiThemeProvider>
  </Provider>
);

export default hot(module)(App);
