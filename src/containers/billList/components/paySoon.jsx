import React from "react";
import { func, arrayOf, shape, string, bool, number } from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "react-flexbox-grid";
import { bindActionCreators } from "redux";
import flatMap from "lodash/flatMap";
import { searchBill as sb } from "../ducks";
import Content from "../../../components/content";
import SearchField from "./searchField";
import ListBill from "./listBill";

const PaySoon = props => {
    const { searchBill, bills, loading } = props;
    return (
        <Content>
            <Row>
                <Col xs>
                    <SearchField execFunc={searchBill} />
                </Col>
            </Row>
            <ListBill data={bills} loading={loading} />
        </Content>
    );
};

PaySoon.propTypes = {
    searchBill: func.isRequired,
    bills: arrayOf(
        shape({
            billNumber: string,
            billValue: number,
            dniProvider: string,
            expDate: string,
            microsite: bool,
            nameProvider: string,
            settlementNumber: number
        })
    ).isRequired,
    loading: bool.isRequired
};

function mapStateToProps({ bills }) {
    const list = bills.get("bills");
    return {
        loading: bills.get("loading"),
        bills: flatMap(list, l => l)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchBill: sb }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaySoon);
