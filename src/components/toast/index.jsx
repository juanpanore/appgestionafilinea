import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";
import { connect } from "react-redux";

class SnackbarBus extends PureComponent {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  };

  render() {
    const { opened, message } = this.props;
    return <Snackbar open={opened} message={message} autoHideDuration={4000} />;
  }
}

function mapStateToProps({ snackbar }) {
  return {
    opened: snackbar.get("opened"),
    message: snackbar.get("message")
  };
}

export default connect(mapStateToProps)(SnackbarBus);
