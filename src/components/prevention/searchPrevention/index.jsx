import React, { Component } from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "react-flexbox-grid";
import { white } from "material-ui/styles/colors";
import SearchIcon from "material-ui/svg-icons/action/search";
import TextField from "material-ui/TextField";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { bindActionCreators } from "redux";
import { searchBill as sb } from "./ducks";

class SearchPreventionBill extends Component {
    static propTypes = {
        searchBill: func.isRequired
    };

    state = {
        dniType: "",
        searchText: ""
    };

    componentWillUnmount() {}

    handleChangeDniType = (e, i, value) => {
        this.setState({ dniType: value });
    };

    handleChangeText = (e, text) => this.setState({ searchText: text });

    handleSubmit = event => {
        event.preventDefault();
        const { dniType, searchText } = this.state;
        this.props.searchBill(dniType, searchText);
    };

    render() {
        return (
            <Row>
                <Col xs={1}>
                    <SearchIcon color={white} />
                </Col>
                <Col xs={3}>
                    <DropDownMenu value={this.state.dniType} onChange={this.handleChangeDniType}>
                        <MenuItem value="" primaryText="Tipo" disabled />
                        <MenuItem value="N" primaryText="NIT" />
                        <MenuItem value="C" primaryText="CC" />
                        <MenuItem value="E" primaryText="CE" />
                    </DropDownMenu>
                </Col>
                <Col xs={8}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            hintText="Buscar..."
                            value={this.state.searchText}
                            onChange={this.handleChangeText}
                        />
                    </form>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({ searchPreventionBill }) {
    return {
        loading: searchPreventionBill.get("loading")
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchBill: sb }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPreventionBill);
