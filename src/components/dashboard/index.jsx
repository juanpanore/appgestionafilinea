import React, { PureComponent } from "react";
import { Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import assign from "lodash/assign";
import { Route, Redirect, Switch } from "react-router-dom";
import { grey300 } from "material-ui/styles/colors";
import Header from "../header";
import MenuLeft from "../menuLeft";
import BillList from "../../containers/billList";
import FormRadicacion from "../../containers/radication";
import Status from "../../containers/status";

const styles = {
    content: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "table",
    },
    contentRoute: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        display: "table",
    },
    contentBody: {
        boxSizing: "border-box",
        margin: 0,
        width: "100%",
        padding: 0,
        display: "table-row",
        height: "100%",
    },
    contentCol: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        display: "table-cell",
    },
    contentRouteRow: {
        display: "table-row",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
    },
    contentRouteColMenu: {
        display: "table-cell",
        boxSizing: "border-box",
        height: "100%",
        verticalAlign: "top",
        borderRight: `1px solid ${grey300}`,
    },
    contentRouteCol: {
        display: "table-cell",
        boxSizing: "border-box",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        verticalAlign: "top",
        padding: 0,
        margin: 0,
    },
    route: { width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto" },
};

class MenuBar extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        sizeMenu: PropTypes.number,
    };

    static defaultProps = {
        sizeMenu: 270,
    };

    render() {
        const { title, sizeMenu } = this.props;
        return (
            <div style={styles.content}>
                <Header title={title} />
                <Row style={styles.contentBody}>
                    <Col xs style={styles.contentCol}>
                        <div style={styles.contentRoute}>
                            <Row style={styles.contentRouteRow}>
                                <Col style={assign(styles.contentRouteColMenu, { width: sizeMenu })}>
                                    <div style={styles.route}>
                                        <MenuLeft />
                                    </div>
                                </Col>
                                <Col xs style={styles.contentRouteCol}>
                                    <div style={styles.route}>
                                        <Switch>
                                            <Redirect exact from="/" to="/gestionpagosprevencion" />
                                            <Route path="/gestionpagosprevencion/bandeja" component={BillList} />
                                            <Route path="/gestionpagosprevencion/status" component={Status} />
                                            <Route exact path="/gestionpagosprevencion" component={FormRadicacion} />
                                        </Switch>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({ menuLeft }) {
    return {
        sizeMenu: menuLeft.get("sizeMenu"),
    };
}

export default connect(mapStateToProps)(MenuBar);
