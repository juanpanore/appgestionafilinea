import React, { PureComponent } from "react";
import { Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import assign from "lodash/assign";
import { Route } from "react-router-dom";
import { grey300 } from "material-ui/styles/colors";
import Transition from "react-transition-group/Transition";
import Header from "../header";
import MenuLeft from "../menuLeft";
import BillList from "../../containers/billList";
import FormRadicacion from "../../containers/radication";
import Status from "../../containers/status";
import { menuSmall, menuNormal, durationMenu } from "../menuLeft/types";

const styles = {
    content: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "table"
    },
    contentRoute: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        display: "table"
    },
    contentBody: {
        boxSizing: "border-box",
        margin: 0,
        width: "100%",
        padding: 0,
        display: "table-row",
        height: "100%"
    },
    contentCol: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        display: "table-cell"
    },
    contentRouteRow: {
        display: "table-row",
        width: "100%",
        margin: 0,
        boxSizing: "border-box"
    },
    contentRouteColMenu: {
        display: "table-cell",
        boxSizing: "border-box",
        height: "100%",
        verticalAlign: "top",
        borderRight: `1px solid ${grey300}`,
        width: menuSmall,
        transition: `width ${durationMenu}ms linear`
    },
    contentRouteCol: {
        display: "table-cell",
        boxSizing: "border-box",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        verticalAlign: "top",
        padding: 0,
        margin: 0
    },
    routeMenu: {
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        width: menuSmall,
        transition: `width ${durationMenu}ms linear`
    },
    route: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto"
    }
};

function getStyleTransition(state) {
    switch (state) {
        case "entering":
            return { width: menuSmall };
        case "entered":
            return { width: menuNormal };
        default:
            return {};
    }
}

const ContentMenu = ({ in: inProp }) => (
    <Transition in={inProp} timeout={durationMenu}>
        {state => {
            const styleTransition = getStyleTransition(state);
            return (
                <Col
                    style={assign(
                        {},
                        styles.contentRouteColMenu,
                        styleTransition
                    )}
                >
                    <div style={assign({}, styles.routeMenu, styleTransition)}>
                        <MenuLeft />
                    </div>
                </Col>
            );
        }}
    </Transition>
);

ContentMenu.propTypes = {
    in: PropTypes.bool.isRequired
};

class MenuBar extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        openMenu: PropTypes.bool.isRequired
    };

    render() {
        const { title, openMenu } = this.props;
        return (
            <div style={styles.content}>
                <Header title={title} />
                <Row style={styles.contentBody}>
                    <Col xs style={styles.contentCol}>
                        <div style={styles.contentRoute}>
                            <Row style={styles.contentRouteRow}>
                                <ContentMenu in={openMenu} />
                                <Col xs style={styles.contentRouteCol}>
                                    <div style={styles.route}>
                                        <Route
                                            path="/facturas"
                                            component={BillList}
                                        />
                                        <Route
                                            path="/status"
                                            component={Status}
                                        />
                                        <Route
                                            exact
                                            path="/"
                                            component={FormRadicacion}
                                        />
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
        openMenu: menuLeft.get("openMenu")
    };
}

export default connect(mapStateToProps)(MenuBar);
