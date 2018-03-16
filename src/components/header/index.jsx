import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import AppBar from "material-ui/AppBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showMenu as sm } from "../menuLeft/ducks";
import logo from "../../images/Logosura.png";
/* import AppSelector from "../appSelection"; */
/* import SearchPreventionBill from "../prevention/searchPrevention"; */

const styles = {
    contentRowHead: {
        boxSizing: "border-box",
        margin: 0,
        width: "100%",
        padding: 0,
        display: "table-row",
        border: "1px solid #000",
    },
    contentCol: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        display: "table-cell",
    },
    contentImage: {
        width: "100%",
    },
};

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        showMenu: PropTypes.func.isRequired,
    };

    handleToggle = () => {
        const { showMenu } = this.props;
        showMenu();
    };

    render() {
        const { title } = this.props;
        return (
            <Row style={styles.contentRowHead}>
                <Col xs style={styles.contentCol}>
                    <div style={styles.contentImage}>
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
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ showMenu: sm }, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);
