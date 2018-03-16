import React, { Fragment } from "react";
// import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Snackbar from "./components/toast";
import Dashboard from "./components/dashboard";

import createStore from "./store";

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
		borderColor: "rgb(0,51,160)",
		focusColor: "rgb(0,51,160)",
		floatingLabelColor: "rgb(0,51,160)",
		errorColor: "rgb(244,67,54)",
		disabledTextColor: "rgb(0,0,0)"
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
				<BrowserRouter basename="/gestionpagosprevencion">
					<Fragment>
						<Dashboard title="ARL" />
					</Fragment>
				</BrowserRouter>
				<Snackbar />
			</Fragment>
		</MuiThemeProvider>
	</Provider>
);

export default App;
