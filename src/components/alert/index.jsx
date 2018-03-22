import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import assign from 'lodash/assign';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuccessIcon from "material-ui/svg-icons/action/done";
import WarningIcon from "material-ui/svg-icons/content/report";
import InfoIcon from "material-ui/svg-icons/notification/priority-high";
import ErrorIcon from "material-ui/svg-icons/navigation/close";
import NormalIcon from "material-ui/svg-icons/communication/chat-bubble";
import { grey300 } from "material-ui/styles/colors";
import { MESSAGES, ARRAY_MESSAGES, getColorType, getTextType } from './types';
import { closeToggleSnackbar as cts } from './ducks';

const styles = {
    title: { textAlign: 'center', padding: "15px 24px 15px" },
    content: { maxWidth: 600, minWidth: 300 },
    body: { textAlign: 'justify', paddingTop: 25, paddingBottom: 25 },
    icon: { textAlign: "center", width: "100%", marginBottom: 10 },
    message: { fontWeight: 200, textAlign: 'justify', margin: "0 0 0 0" }
};

function getIconType(type){
    switch (type) {
        case MESSAGES.ERROR:
            return <ErrorIcon color={grey300} />;
        case MESSAGES.SUCCESS:
            return <SuccessIcon color={grey300} />;
        case MESSAGES.INFO:
            return <InfoIcon color={grey300} />;
        case MESSAGES.WARNING:
            return <WarningIcon color={grey300} />;
        case MESSAGES.NORMAL:
            return <NormalIcon color={grey300} />;
        default:
            return <span/>;
    }
}

class SnackbarBus extends PureComponent {

    static defaultProps = {
        title: ""
    };

    static propTypes = {
        opened: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf(ARRAY_MESSAGES).isRequired,
        closeToggleSnackbar: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    handleCloseAction = () => {
        const {closeToggleSnackbar} = this.props;
        closeToggleSnackbar();
    };

    render() {
        const { opened, message, type, title } = this.props;
        const actions = [
            <FlatButton
                label="Aceptar"
                onClick={this.handleCloseAction}
            />
        ];
        return (
            <Dialog
                title={getTextType(type, title)}
                actions={actions}
                autoScrollBodyContent
                titleStyle={assign({}, styles.title, getColorType(type))}
                contentStyle={styles.content}
                bodyStyle={styles.body}
                modal={false}
                open={opened}
                onRequestClose={() => {}}
            >
                <div style={styles.icon}>{getIconType(type)}</div>
                <h3 style={styles.message}>{message}</h3>
            </Dialog>
        );
    }
}

function mapStateToProps({ alert }) {
    return {
        opened: alert.get("opened"),
        message: alert.get("message"),
        type: alert.get("type"),
        title: alert.get("title"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ closeToggleSnackbar : cts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarBus);
