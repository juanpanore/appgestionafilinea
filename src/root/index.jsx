import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Header from "../components/header";

const muiTheme = getMuiTheme({
  appBar: {
    color: "rgb(120,190,32)"
  },
  tabs: {
    backgroundColor: "rgb(120,190,32)"
  },
  inkBar: {
    backgroundColor: "rgb(0,51,160)"
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
      <Header title="ARL" />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default hot(module)(App);
