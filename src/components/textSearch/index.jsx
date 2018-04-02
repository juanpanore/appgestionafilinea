import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-flexbox-grid";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Popover from "material-ui/Popover";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import size from "lodash/size";
import get from "lodash/get";
import map from "lodash/map";
// import {apiAxios} from '../../api/index';

const styles = {
    rowContent: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
    },
    columnTextContent: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
    },
    columnLoadContent: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        width: 32,
        textAlign: "right"
    },
    load: {
        marginTop: 28
    }
};

class TextSearch extends PureComponent {
    static propTypes = {
        withEnter: PropTypes.bool,
        width: PropTypes.number,
        fullWidth: PropTypes.bool,
        labelText: PropTypes.string.isRequired,
        labelSecondaryText: PropTypes.string,
        onSelected: PropTypes.func.isRequired
    };

    static defaultProps = {
        width: 256,
        fullWidth: false,
        withEnter: true,
        labelSecondaryText: ""
    };

    state = {
        text: "",
        loading: false,
        open: false,
        anchorEl: undefined,
        values: []
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleOnKeyPress = e => {
        const { withEnter } = this.props;
        const { text } = this.state;
        console.log(text);
        if (e.key === "Enter" && withEnter) {
            e.preventDefault();
            this.setState({
                open: true,
                anchorEl: e.currentTarget
            });
            /* const request = axios.post(
                    `http://localhost:3030/api/v2/projects/employees/processed`,
                    {
                        project: {
                            idProjects: ["5a29416a2d0e17000f7ac78c"]
                        }
                    }
                ).then(data => {
                    if (isEqual(get(data, "status", 400), 200)) {
                        const value = get(data, "data");
                        console.log(value);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
                */
        }
    };

    handleOnBlur = () => {
        const { withEnter } = this.props;
        const { text } = this.state;
        console.log(text);
        if (!withEnter) {
            console.clear();
            console.log("exec blur");
        }
    };

    handleOnChange = (e, text) => {
        this.setState({ text });
    };

    handleItemSeleted = value => {
        const { onSelected } = this.props;
        this.setState({ open: false });
        onSelected(value);
    };

    render() {
        const { width, fullWidth, labelText, labelSecondaryText } = this.props;
        const { text, loading, open, anchorEl, values } = this.state;
        const widthElement = fullWidth ? "100%" : width;
        return (
            <div style={{ width: widthElement }}>
                <Row style={styles.rowContent}>
                    <Col xs style={styles.columnTextContent}>
                        <TextField
                            floatingLabelText="Buscar"
                            fullWidth
                            value={text}
                            onChange={this.handleOnChange}
                            onKeyPress={this.handleOnKeyPress}
                            onBlur={this.handleOnBlur}
                        />
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                horizontal: "left",
                                vertical: "bottom"
                            }}
                            targetOrigin={{
                                horizontal: "left",
                                vertical: "top"
                            }}
                            onRequestClose={this.handleRequestClose}
                        >
                            <List style={{ padding: 0, minWidth: 270 }}>
                                <Subheader>
                                    Registros encontrados: {size(values)}
                                </Subheader>
                                {map(values, (val, index) => {
                                    const primaryText = get(val, labelText, "");
                                    const secondaryText = get(
                                        val,
                                        labelSecondaryText,
                                        ""
                                    );
                                    return (
                                        <ListItem
                                            // eslint-disable-next-line
                                            onClick={this.handleItemSeleted.bind(
                                                this,
                                                val
                                            )}
                                            key={`menu-item-text-search-component${index}`}
                                            primaryText={primaryText}
                                            secondaryText={secondaryText}
                                            secondaryTextLines={1}
                                        />
                                    );
                                })}
                            </List>
                        </Popover>
                    </Col>
                    {loading && (
                        <Col style={styles.columnLoadContent}>
                            <CircularProgress
                                style={styles.load}
                                size={25}
                                thickness={3}
                            />
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(TextSearch);
