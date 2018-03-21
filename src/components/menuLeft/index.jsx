import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import StatusIcon from "material-ui/svg-icons/action/done";
import HomeIcon from "material-ui/svg-icons/action/home";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import { connect } from "react-redux";
import { List } from "material-ui/List";
import _ from "lodash";
import Transition from "react-transition-group/Transition";
import Item from "./item";
import { menuSmall, menuNormal, durationMenu } from "./types";

const styles = {
    menu: {
        transition: `width ${durationMenu}ms linear`,
        width: menuSmall,
        padding: 0,
        margin: 0,
    },
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

const Options = ({ in: inProp }) => (
    <Transition in={inProp} timeout={durationMenu}>
        {state => {
            const styleTransition = getStyleTransition(state);
            const isTransition = _.indexOf(["exited", "entered"], state) !== -1;
            return (
                <div style={_.assign({}, styles.menu, styleTransition)}>
                    <List style={{ padding: 0, margin: 0 /* , width: inProp ? "94%" : "82%" */ }}>
                        <Item title="Home" icon={<HomeIcon />} url="/" showTitle={inProp && isTransition} />
                        <Item title="Estado" icon={<StatusIcon />} url="/status" showTitle={inProp && isTransition} />
                        <Item
                            title="Bandeja"
                            icon={<DashboardIcon />}
                            url="/bandeja"
                            showTitle={inProp && isTransition}
                        />
                    </List>
                </div>
            );
        }}
    </Transition>
);

Options.propTypes = {
    in: PropTypes.bool.isRequired,
};

class MenuLeft extends PureComponent {
    static propTypes = {
        open: PropTypes.bool.isRequired,
    };

    render() {
        const { open } = this.props;
        return <Options in={open} />;
    }
}

function mapStateToProps({ menuLeft }) {
    return {
        open: menuLeft.get("openMenu"),
    };
}

export default connect(mapStateToProps)(MenuLeft);
