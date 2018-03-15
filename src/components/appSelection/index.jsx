import React from "react";
import { string, func } from "prop-types";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import AppIcon from "material-ui/svg-icons/action/language";
import { bindActionCreators } from "redux";
import { white } from "material-ui/styles/colors";
import { changeApp as ca } from "./ducks";

const AppSelector = props => {
    const { application, changeApp } = props;
    return (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <AppIcon color={white} />
                </IconButton>
            }
            onItemClick={(e, item) => changeApp(item)}
        >
            <MenuItem value="prevention" primaryText="Prevención" disabled={application === "prevention"} />
        </IconMenu>
    );
};

AppSelector.propTypes = {
    application: string.isRequired,
    changeApp: func.isRequired,
};

function mapStateToProps({ appSelector }) {
    return {
        application: appSelector.get("application"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeApp: ca,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
