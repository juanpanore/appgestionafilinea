import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import AppBar from "material-ui/AppBar";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import ResultsDashboard from "../prevention/searchPrevention/resultsDashboard";
import FormRadicacion from "../forms/radicacion";
import Status from "../status";
import logo from "../../images/Logosura.png";

class MenuBar extends Component {
    state = {};

    render() {
        const { title } = this.props;
        return (
            <div>
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
                <Switch>
                    <Redirect exact from="/" to="/gestionpagosprevencion" />
                    <Route exact path="/gestionpagosprevencion" component={FormRadicacion} />
                    <Route path="/gestionpagosprevencion/bandeja" component={ResultsDashboard} />
                    <Route path="/gestionpagosprevencion/status" component={Status} />
                </Switch>
            </div>
        );
    }
}

MenuBar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default MenuBar;
