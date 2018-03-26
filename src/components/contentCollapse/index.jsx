import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Row, Col } from "react-flexbox-grid";
import transitions from "material-ui/styles/transitions";
import IconButton from "material-ui/IconButton";
import OpenIcon from "material-ui/svg-icons/navigation/expand-less";
import CollapseIcon from "material-ui/svg-icons/navigation/expand-more";
import { changeCollapse as cc, registerCollapse as rc } from "./ducks";

const styles = {
    opened: {
        overflowY: "hidden",
        overflowX: "auto",
        maxHeight: 2500,
        transition: transitions.create(
            "max-height",
            "650ms",
            "0ms",
            "ease-in-out"
        ),
        width: "100%",
        boxSizing: "border-box",
        border: "1px dashed #CCC",
        borderColor: "#CCC",
        borderStyle: "dashed",
        borderWidth: 1,
        borderRadius: 8,
        margin: 0,
        padding: 0
    },
    content: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
    },
    titleHead: {
        boxSizing: "border-box",
        height: 48,
        margin: 0,
        padding: 14
    },
    buttonHead: {
        boxSizing: "border-box",
        height: 48,
        margin: 0,
        padding: 0,
        width: 48
    },
    button: {
        float: "right"
    },
    rowContent: {
        margin: 0,
        padding: 8,
        boxSizing: "border-box"
    },
    contentBody: {
        width: "100%",
        boxSizing: "border-box",
        margin: 0
    },
    toottip: {
        margin: "-38px 35px 0 0"
    }
};

function getPropStyle(open, visibleHead) {
    if (open) {
        return { maxHeight: 1500 };
    }
    if (visibleHead) {
        return { maxHeight: 48 };
    }
    return { maxHeight: 0 };
}

function getText(open) {
    if (open) {
        return "Colapsar";
    }
    return "Abrir";
}

class ContentCollapse extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        initValue: PropTypes.bool,
        open: PropTypes.bool.isRequired,
        changeCollapse: PropTypes.func.isRequired,
        registerCollapse: PropTypes.func.isRequired,
        visibleButton: PropTypes.bool,
        title: PropTypes.string,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        borderWidth: PropTypes.number,
        paddingContent: PropTypes.number,
        children: PropTypes.node
    };

    static defaultProps = {
        initValue: false,
        visibleButton: true,
        title: null,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 0,
        paddingContent: 15,
        children: <span />
    };

    componentWillMount() {
        const { id, initValue, registerCollapse } = this.props;
        registerCollapse(id, initValue);
    }

    onChangeSize = () => {
        const { changeCollapse, id } = this.props;
        changeCollapse(id);
    };

    render() {
        const {
            open,
            visibleButton,
            title,
            marginTop,
            marginBottom,
            borderWidth,
            paddingContent,
            children
        } = this.props;
        const visibleHead = !_.isEmpty(title) || visibleButton;
        const styleContent = _.assign(
            {},
            styles.opened,
            { marginTop, marginBottom, borderWidth },
            getPropStyle(open, visibleHead)
        );
        return (
            <Row style={styleContent}>
                <Col xs style={styles.content}>
                    {visibleHead && (
                        <Row style={styles.rowContent}>
                            <Col xs style={styles.titleHead} />
                            <Col style={styles.buttonHead}>
                                {visibleButton && (
                                    <IconButton
                                        tooltip={getText(open)}
                                        tooltipPosition="bottom-left"
                                        tooltipStyles={styles.toottip}
                                        onClick={this.onChangeSize}
                                        style={styles.button}
                                    >
                                        {open ? <OpenIcon /> : <CollapseIcon />}
                                    </IconButton>
                                )}
                            </Col>
                        </Row>
                    )}
                    <Row style={styles.rowContent}>
                        <Col
                            style={_.assign({}, styles.contentBody, {
                                padding: paddingContent
                            })}
                        >
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ contentCollapse }, ownProps) {
    const id = _.get(ownProps, "id", "default");
    if (contentCollapse.has(id)) {
        const collapse = contentCollapse.get(id);
        return {
            open: collapse.get("open")
        };
    }
    return { open: false };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { changeCollapse: cc, registerCollapse: rc },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentCollapse);
