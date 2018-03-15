import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import AppBar from "material-ui/AppBar";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Bill from "../../containers/billList";
import FormRadicacion from "../../containers/radication";
import Status from "../../containers/status";
import logo from "../../images/Logosura.png";

const styles = {
	contentDashboard: {
		display: "block",
		boxSizing: "border-box",
		margin: 0
	}
};

class MenuBar extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired
	};

	state = {};

	render() {
		const { title } = this.props;
		return (
			<div>
				<div style={styles.contentDashboard}>
					<div style={{ width: "100%" }}>
						<img src={logo} alt="Sura" width="140dp" height="60dp" />
					</div>
					<AppBar
						title={title}
						onLeftIconButtonClick={this.handleToggle}
						iconElementRight={
							<Row>
								<Col xs={9}>{/* <SearchPreventionBill /> */}</Col>
								<Col xs={3}>{/* <AppSelector /> */}</Col>
							</Row>
						}
					/>
				</div>
				<div style={styles.contentDashboard}>
					<Row style={{ border: "0px solid #000", width: "100%", margin: 0, boxSizing: "border-box" }}>
						<Col style={{ border: "0px solid #000", width: 60, boxSizing: "border-box" }}>a</Col>
						<Col xs style={{ border: "0px solid #000", boxSizing: "border-box", padding: 5 }}>
							<Switch>
								<Route exact path="/" component={FormRadicacion} />
								<Route path="/bandeja" component={Bill} />
								<Route path="/status" component={Status} />
							</Switch>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default MenuBar;
