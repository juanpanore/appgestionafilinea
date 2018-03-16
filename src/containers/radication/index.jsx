import React, { Component } from "react";
import PropTypes, { func, bool, string, shape } from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import moment from "moment";
import { withFormik } from "formik";
import _ from "lodash";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
// import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { checkNotNull, checkArgument } from "../../functions/validations";
import {
    searchProviderData as spd,
    sendBillData as sbd,
    cleanData as cd,
    cleanBillData as cbd,
    searchDocTypes as sdt,
    SEND_BILL_DATA_FULFILLED,
} from "./ducks";

const paperStyle = {
    margin: 20,
    textAlign: "left",
    flex: 50,
    padding: 20,
    color: "rgb(0,51,160)",
};

const dividerStyle = {
    thickness: 40,
};

class FormRadicacion extends Component {
    static propTypes = {
        searchProviderData: func.isRequired,
        cleanData: func.isRequired,
        searchDocTypes: func.isRequired,
        cleanBillData: func.isRequired,
        provider: shape().isRequired,
        loadingProvider: bool.isRequired,
        sendingBill: bool.isRequired,
        statusBill: string.isRequired,
        docTypes: PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string,
        }),
        resetForm: func.isRequired,
        values: PropTypes.shape({
            dniProvider: PropTypes.string,
            dniType: PropTypes.string,
            dniValue: PropTypes.string,
            name: PropTypes.string,
            micrositio: PropTypes.string,
            billNumber: PropTypes.string,
            billValue: PropTypes.number,
            lastSettlement: PropTypes.string,
            billDate: PropTypes.instanceOf(Date),
            billArrivalDate: PropTypes.instanceOf(Date),
            idRadicado: PropTypes.number,
        }),
        errors: PropTypes.shape({
            dniProvider: PropTypes.string,
            dniType: PropTypes.string,
            name: PropTypes.string,
            micrositio: PropTypes.string,
            billNumber: PropTypes.string,
            billValue: PropTypes.string,
            billDate: PropTypes.string,
            billArrivalDate: PropTypes.string,
        }),
        handleChange: PropTypes.func,
        handleSubmit: PropTypes.func,
        setFieldValue: PropTypes.func.isRequired,
        touched: PropTypes.shape().isRequired,
    };

    static defaultProps = {
        values: [],
        docTypes: [],
        errors: [],
        handleChange: () => {},
        handleSubmit: () => {},
    };

    componentDidMount() {
        this.props.searchDocTypes();
        this.props.cleanData();
        this.props.cleanBillData();
    }

    componentDidUpdate() {
        const { provider, setFieldValue, statusBill, values, docTypes } = this.props;
        const providerName = _.get(provider, "providerName", "");
        const microsite = _.get(provider, "micrositio", false) ? "Sí" : "No";
        const idRadicado = _.get(values, "id", 0);
        const docTypeValue = _.get(docTypes, "value", "");
        if (providerName !== values.name) {
            setFieldValue("name", providerName);
        }
        if (microsite !== values.micrositio) {
            setFieldValue("micrositio", microsite);
        }
        if (_.isEqual(statusBill, SEND_BILL_DATA_FULFILLED)) {
            this.props.resetForm();
            setFieldValue("idRadicado", idRadicado);
            this.props.cleanData();
            this.props.cleanBillData();
        }
        console.log("docTypes: ", docTypes);
        console.log("Tipo documento: ", docTypeValue);
        console.clear();
        console.log(values);
        /* if (_.isEqual(statusDocType, SEARCH_DOC_TYPES_DATA_FULFILLED)) {
            setFieldValue("docTypeItem", docTypes.value);
        } */
    }

    render() {
        const {
            values,
            docTypes,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            searchProviderData,
            loadingProvider,
            sendingBill,
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Grid fluid>
                    <Paper style={paperStyle} zDepth={2}>
                        <Row>
                            <Col>
                                <p>Información prestador</p>
                            </Col>
                        </Row>
                        <Divider style={dividerStyle} />
                        <Row>
                            <Col xs={3}>
                                <SelectField
                                    floatingLabelText="Tipo identificación"
                                    value={values.dniType}
                                    onChange={(e, key, value) => setFieldValue("dniType", value)}
                                    errorText={touched.key && errors.key}
                                    fullWidth
                                    dropDownMenuProps={{
                                        anchorOrigin: { vertical: "top", horizontal: "left" },
                                        targetOrigin: { vertical: "top", horizontal: "left" },
                                    }}
                                >
                                    {docTypes.map(doc => (
                                        <MenuItem
                                            name="docTypeItem"
                                            value={doc.key}
                                            key={doc.key}
                                            primaryText={doc.value}
                                        />
                                    ))}
                                </SelectField>
                            </Col>
                            <Col xs={3}>
                                <TextField
                                    floatingLabelText="Número identificación"
                                    name="dniProvider"
                                    value={values.dniProvider}
                                    onChange={handleChange}
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            searchProviderData(values.dniType, values.dniProvider);
                                        }
                                    }}
                                    maxLength={20}
                                    errorText={touched.dniProvider && errors.dniProvider}
                                    fullWidth
                                    disabled={loadingProvider}
                                />
                            </Col>
                            <Col xs={6}>
                                <TextField
                                    floatingLabelText="Nombre empresa"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    maxLength={50}
                                    errorText={touched.name && errors.name}
                                    fullWidth
                                    disabled
                                />
                            </Col>
                            <Col xs={1}>
                                <TextField
                                    floatingLabelText="Micrositio (Si/No)"
                                    name="micrositio"
                                    maxLength={2}
                                    style={{ width: 130 }}
                                    value={values.micrositio}
                                    onChange={handleChange}
                                    errorText={touched.micrositio && errors.micrositio}
                                    fullWidth
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Información de factura</p>
                            </Col>
                        </Row>
                        <Divider style={dividerStyle} />
                        <Row>
                            <Col xs>
                                <TextField
                                    floatingLabelText="Número factura"
                                    name="billNumber"
                                    value={values.billNumber}
                                    onChange={handleChange}
                                    errorText={touched.billNumber && errors.billNumber}
                                    disbled={checkNotNull(values.name)}
                                />
                            </Col>
                            <Col xs>
                                <TextField
                                    floatingLabelText="Valor factura"
                                    name="billValue"
                                    value={values.billValue}
                                    onChange={handleChange}
                                    errorText={touched.billValue && errors.billValue}
                                >
                                    <CurrencyInput precision={3} separator="." delimiter="." unit="$" />
                                </TextField>
                            </Col>
                            <Col xs>
                                <TextField
                                    floatingLabelText="Fecha factura (DD/MM/YYYY)"
                                    name="billDate"
                                    onChange={(e, value) => setFieldValue("billDate", value)}
                                    errorText={touched.billDate && errors.billDate}
                                    value={values.billDate}
                                />
                                {/* <DatePicker
                                    floatingLabelText="Fecha factura (DD/MM/YYYY)"
                                    formatDate={date => moment(date).format("DD/MM/YYYY")}
                                    name="billDate"
                                    onChange={(e, value) => setFieldValue("billDate", value)}
                                    cancelLabel="Cancelar"
                                    errorText={touched.billDate && errors.billDate}
                                    autoOk
                                    value={values.billDate}
                                /> */}
                            </Col>
                            <Col xs>
                                <TextField
                                    floatingLabelText="Fecha llegada (DD/MM/YYYY)"
                                    name="billArrivalDate"
                                    onChange={(e, value) => setFieldValue("billArrivalDate", value)}
                                    errorText={touched.billArrivalDate && errors.billArrivalDate}
                                    value={values.billArrivalDate}
                                />
                                {/* <DatePicker
                                    floatingLabelText="Fecha llegada (DD/MM/YYYY)"
                                    formatDate={date => moment(date).format("DD/MM/YYYY")}
                                    name="billArrivalDate"
                                    onChange={(e, value) => setFieldValue("billArrivalDate", value)}
                                    cancelLabel="Cancelar"
                                    errorText={touched.billArrivalDate && errors.billArrivalDate}
                                    autoOk
                                    value={values.billArrivalDate}
                                /> */}
                            </Col>
                        </Row>
                        <Row end="xs">
                            <Col xs={3}>
                                <RaisedButton label="Radicar" onClick={handleSubmit} disabled={sendingBill} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <TextField
                                    floatingLabelText="Último radicado"
                                    onChange={handleChange}
                                    name="idRadicado"
                                    value={values.idRadicado}
                                    fullWidth
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Paper>
                </Grid>
            </form>
        );
    }
}

const validateDates = values => {
    const errors = {};
    const Oldyears = moment().subtract(5, "years");
    const oldYear = moment().subtract(1, "years");
    if (!values.billDate) {
        errors.billDate = "Se requiere la fecha de factura.";
    }
    if (!values.billArrivalDate) {
        errors.billArrivalDate = "Se requiere la fecha de llegada de la factura.";
    }
    if (moment(values.billDate).isAfter(new Date(), "day")) {
        errors.billDate = "La fecha es superior a la fecha actual.";
    }
    if (moment(values.billDate).isBefore(Oldyears, "day")) {
        errors.billDate = "La fecha no puede ser 5 años inferior a la fecha actual";
    }
    if (moment(values.billArrivalDate).isAfter(new Date(), "day")) {
        errors.billArrivalDate = "La fecha es superior a la fecha actual.";
    }
    if (moment(values.billArrivalDate).isBefore(moment(values.billDate), "day")) {
        errors.billArrivalDate = "Fecha inferior a la fecha de factura.";
    }
    if (moment(values.billArrivalDate).isBefore(oldYear, "day")) {
        errors.billArrivalDate = "Fecha anterior a un año de la fecha actual.";
    }
    return errors;
};
const validateRequired = values => {
    const errors = {
        dniProvider: checkNotNull(values.dniProvider, "Se requiere DNI del proveedor."),
        name: checkNotNull(values.name, "Se requiere el nombre del proveedor."),
        billNumber: checkNotNull(values.billNumber, "Se requiere el número de factura."),
        billValue:
            checkNotNull(values.billValue, "Se requiere el valor de la factura.") ||
            checkArgument(values.billValue <= 0, "El valor de la factura debe ser mayor a cero."),
    };
    return _.omitBy(errors, _.isNil);
};
const validate = values => _.assign({}, validateRequired(values), validateDates(values));

/* function sendFormData() {
  axios({
    method: "POST",
    url: "http://192.168.2.108:9640/gestionpagosprevencionapi/v1/bill",
    data: {
      dniProvider: values.dniType + values.dniProvider,
      billNumber: values.billNumber,
      billValue: values.billValue,
      billDate: values.billDate,
      billArrivalDate: values.billArrivalDate
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error.response);
      return "error";
    });
} */

const formikComponent = withFormik({
    mapPropsToValues: () => ({
        dniProvider: "",
        dniType: "",
        name: undefined,
        micrositio: "",
        billNumber: "",
        billValue: 0,
        billDate: "00/00/0000",
    }),
    validate,
    handleSubmit: (values, { props }) => {
        const valuesToSend = _.mapValues(values, value => {
            if (_.isDate(value)) {
                return moment(value).format("DD/MM/YYYY");
            }
            return value;
        });
        props.sendBillData(
            valuesToSend.dniType + valuesToSend.dniProvider,
            _.get(props, "provider.dniDelegation"),
            valuesToSend,
        );
    },
});

function mapStateToProps({ settlement }) {
    return {
        provider: settlement.get("provider"),
        loadingProvider: settlement.get("loadingProvider"),
        sendingBill: settlement.get("sendingBill"),
        statusBill: settlement.get("statusBill"),
        docTypes: settlement.get("docTypes"),
        loadingDocTypes: settlement.get("loadingDocTypes"),
        statusDocType: settlement.get("statusDocType"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            searchProviderData: spd,
            searchDocTypes: sdt,
            cleanData: cd,
            sendBillData: sbd,
            cleanBillData: cbd,
        },
        dispatch,
    );
}

const reduxComponent = connect(mapStateToProps, mapDispatchToProps);

export default compose(reduxComponent, formikComponent)(FormRadicacion);
