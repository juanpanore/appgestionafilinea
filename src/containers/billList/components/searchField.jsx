import React, { Component } from "react";
import { arrayOf, string, shape, bool, func } from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "react-flexbox-grid";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import _ from "lodash";

class SearchField extends Component {
    static propTypes = {
        docTypes: arrayOf(shape({ key: string, value: string })),
        loadingDocTypes: bool.isRequired,
        execFunc: func
    };

    static defaultProps = {
        docTypes: [],
        execFunc: () => {}
    };

    state = {
        dniType: "",
        searchText: ""
    };

    componentWillUnmount() {
        this.setState({ dniType: "", searchText: "" });
    }

    handleChangeDniType = (e, i, value) => {
        this.setState({ dniType: value });
    };

    handleChangeText = (e, text) => {
        this.setState({ searchText: text });
    };

    handleOnKeyPress = e => {
        const { execFunc } = this.props;
        const { dniType, searchText } = this.state;
        if (e.key === "Enter") {
            e.preventDefault();
            if (!_.isEmpty(dniType) && !_.isEmpty(searchText)) {
                execFunc(dniType, searchText);
            }
        }
    };

    render() {
        const { docTypes, loadingDocTypes } = this.props;
        const { dniType, searchText } = this.state;
        return (
            <Row>
                <Col xsOffset={3} xs={3}>
                    {loadingDocTypes && (
                        <CircularProgress
                            style={{ position: "absolute", top: 43 }}
                        />
                    )}
                    <SelectField
                        floatingLabelText="Tipo identificación"
                        value={dniType}
                        style={{ opacity: loadingDocTypes ? 0 : 1 }}
                        disabled={loadingDocTypes}
                        onChange={this.handleChangeDniType}
                        dropDownMenuProps={{
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            targetOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            }
                        }}
                    >
                        {_.map(docTypes, (doc, index) => (
                            <MenuItem
                                value={_.get(doc, "key")}
                                key={`doc-types-bills-${index}`}
                                primaryText={_.get(doc, "value")}
                            />
                        ))}
                    </SelectField>
                </Col>
                <Col xs={3}>
                    <TextField
                        floatingLabelText="Buscar"
                        value={searchText}
                        onKeyPress={this.handleOnKeyPress}
                        onChange={this.handleChangeText}
                    />
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ bills }) {
    return {
        docTypes: bills.get("docTypes"),
        loadingDocTypes: bills.get("loadingDocTypes")
    };
}

export default connect(mapStateToProps)(SearchField);
