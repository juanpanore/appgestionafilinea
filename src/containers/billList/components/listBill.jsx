import React from "react";
import { arrayOf, shape, string, bool, number } from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import { Row, Col } from "react-flexbox-grid";
import _ from "lodash";

const styles = {
    rowContent: {
        margin: 0,
        padding: 0
    },
    columnContent: {
        margin: 0,
        padding: 0
    },
    tableColumn: {
        padding: 0
    },
    messageContent: {
        width: "100%",
        textAlign: "center",
        padding: "20px 0",
        margin: 0,
        boxSizing: "border-box"
    },
    noData: {
        fontSize: 15,
        fontWeight: 400,
        color: "#525252",
        margin: 0,
        padding: 10,
        boxSizing: "border-box"
    },
    contentRecord: {
        border: "1px solid #CCC",
        padding: 0,
        margin: 0
    },
    billRecord: {
        padding: 7,
        margin: 0,
        borderLeftStyle: "solid",
        borderLeftWidth: 8,
        width: 110,
        boxSizing: "border-box",
        backgroundColor: "#ececec"
    },
    titleBillRecord: {
        fontWeight: 400,
        fontSize: 12,
        margin: 0,
        padding: 0,
        color: "#4C4C4C",
        boxSizing: "border-box"
    },
    valueBillRecord: {
        fontWeight: 400,
        fontSize: 14,
        margin: "0 0 10px 0",
        padding: 0,
        color: "#000",
        boxSizing: "border-box"
    },
    providerRecord: {
        padding: 7,
        margin: 0,
        boxSizing: "border-box",
        textAlign: "left",
        borderLeft: "1px dashed #CCC"
    },
    titleProviderRecord: {
        color: "#4C4C4C",
        boxSizing: "border-box"
    },
    valueProviderRecord: {
        fontWeight: 400,
        fontSize: 14,
        margin: "0 0 4px 0",
        padding: 0,
        color: "#000",
        boxSizing: "border-box"
    }
};

function getColorStatus(status) {
    switch (status) {
        case "bill":
            return "#FFF";
        default:
            return "#ececec";
    }
}

function getMicrosite(hasMicrosite) {
    if (hasMicrosite) {
        return "Sí";
    }
    return "No";
}

const ListBill = props => {
    const { data, loading } = props;
    if (loading) {
        return (
            <Row style={styles.rowContent}>
                <Col xs style={styles.messageContent}>
                    <CircularProgress />
                </Col>
            </Row>
        );
    }
    if (_.size(data) === 0) {
        return (
            <Row style={styles.rowContent}>
                <Col xs style={styles.messageContent}>
                    <h3 style={styles.noData}>No hay registros relacionados</h3>
                </Col>
            </Row>
        );
    }
    return _.map(data, (record, index) => {
        const styleBill = _.assign({}, styles.billRecord, {
            borderLeftColor: getColorStatus(_.get(record, "status", "none"))
        });
        return (
            <Row key={`bill-pays-list-${index}`} style={styles.contentRecord}>
                <Col style={styleBill}>
                    <h3 style={styles.titleBillRecord}>Número Factura</h3>
                    <h3 style={styles.valueBillRecord}>
                        {_.get(record, "billNumber", "")}
                    </h3>
                    <h3 style={styles.titleBillRecord}>Valor Factura</h3>
                    <h3 style={styles.valueBillRecord}>{`$${_.get(
                        record,
                        "billValue",
                        "0"
                    )}`}</h3>
                </Col>
                <Col xs style={styles.providerRecord}>
                    <h3 style={styles.valueProviderRecord}>
                        <span style={styles.titleProviderRecord}>DNI: </span>
                        {_.get(record, "dniProvider", "")}
                    </h3>
                    <h3 style={styles.valueProviderRecord}>
                        <span style={styles.titleProviderRecord}>Nombre: </span>
                        {_.get(record, "nameProvider", "")}
                    </h3>
                    <h3 style={styles.valueProviderRecord}>
                        <span style={styles.titleProviderRecord}>
                            Número radicado:{" "}
                        </span>
                        {_.get(record, "settlementNumber", "")}
                    </h3>
                    <h3 style={styles.valueProviderRecord}>
                        <span style={styles.titleProviderRecord}>
                            Micrositio:{" "}
                        </span>
                        {getMicrosite(_.get(record, "microsite", false))}
                    </h3>
                    <h3 style={styles.valueProviderRecord}>
                        <span style={styles.titleProviderRecord}>
                            Fecha vencimiento:{" "}
                        </span>
                        {_.get(record, "expDate", "")}
                    </h3>
                </Col>
            </Row>
        );
    });
};

ListBill.propTypes = {
    data: arrayOf(
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
// #d65252
// #dde834

export default ListBill;
