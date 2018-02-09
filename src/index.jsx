import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Header from "./components/header";

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

const App = () => {
    render(
        <MuiThemeProvider muiTheme={muiTheme}>
            <BrowserRouter>
                <Header title="ARL" />
            </BrowserRouter>
        </MuiThemeProvider>,
        document.getElementById("root")
    );
};

App(<App />, root);

if (module.hot) {
    module.hot.accept("./components/header", () => {
        App();
    });
}
