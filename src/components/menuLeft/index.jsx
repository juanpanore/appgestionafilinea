import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import StatusIcon from "material-ui/svg-icons/action/done";
import HomeIcon from "material-ui/svg-icons/action/home";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import { Link } from "react-router-dom";
import assing from "lodash/assign";
import get from "lodash/get";
import { Transition } from "react-transition-group";
// import { sizes, menuNormal } from "./types";

const duration = 400;

const styles = {
    menu: {
        width: "100%",
        padding: 0,
        margin: 0,
    },
    items: {
        transition: `transform ${duration}ms ease-in-out`,
        // position: "absolute",
        transform: "translateX(-100%)",
    },
};

const transitionStyles = {
    entering: {
        transform: "translateX(-100%)",
    },
    entered: {
        transform: "translateX(0%)",
    },
};

class MenuLeft extends PureComponent {
    static propTypes = {
        // sizeMenu: PropTypes.oneOf(sizes),
        open: PropTypes.bool,
    };

    static defaultProps = {
        // sizeMenu: menuNormal,
        open: true,
    };

    render() {
        const { open } = this.props;
        return (
            <div style={styles.menu}>
                <Transition in={open} timeout={duration}>
                    {state => {
                        const styleTransition = assing(styles.items, get(transitionStyles, state, {}));
                        return (
                            <div style={styleTransition}>
                                <List style={{ padding: 0, margin: 0 }}>
                                    <ListItem
                                        primaryText="Home"
                                        containerElement={<Link href to="/" refresh="true" />}
                                        rightIcon={<HomeIcon />}
                                    />
                                    <ListItem
                                        primaryText="Estado"
                                        containerElement={<Link href to="/status" refresh="true" />}
                                        rightIcon={<StatusIcon />}
                                    />
                                    <ListItem
                                        primaryText="Bandeja"
                                        containerElement={<Link href to="/bandeja" refresh="true" />}
                                        rightIcon={<DashboardIcon />}
                                    />
                                </List>
                            </div>
                        );
                    }}
                </Transition>
            </div>
        );
    }
}

function mapStateToProps({ menuLeft }) {
    return {
        sizeMenu: menuLeft.get("sizeMenu"),
        open: menuLeft.get("openMenu"),
    };
}

export default connect(mapStateToProps)(MenuLeft);
