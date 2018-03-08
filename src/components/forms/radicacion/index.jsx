import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import moment from "moment";
import { withFormik } from "formik";
import _ from "lodash";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { checkNotNull, checkArgument } from "../../../functions/validations";

const paperStyle = {
    margin: 20,
    textAlign: "left",
    flex: 50,
    padding: 20,
    color: "RGB(0,51,160)"
};

const dividerStyle = {
    thickness: 40
};

const FormRadicacion = props => {
    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid>
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
                                value={values.dni_type}
                                onChange={(e, key, value) => setFieldValue("dni_type", value)}
                                errorText={touched.dni_type && errors.dni_type}
                                fullWidth
                            >
                                <MenuItem value="N" primaryText="NIT" />
                                <MenuItem value="C" primaryText="CC" />
                                <MenuItem value="E" primaryText="Cédula Extranjeria" />
                            </SelectField>
                        </Col>
                        <Col xs={3}>
                            <TextField
                                floatingLabelText="Número identificación"
                                name="dni_provider"
                                value={values.dni_provider}
                                onChange={handleChange}
                                maxLength={20}
                                errorText={touched.dni_provider && errors.dni_provider}
                                fullWidth
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
                            />
                        </Col>
                        <Col xs>
                            <TextField
                                floatingLabelText="Valor factura"
                                name="billValue"
                                type="number"
                                value={values.billValue}
                                onChange={handleChange}
                                errorText={touched.billValue && errors.billValue}
                            />
                        </Col>
                        <Col xs>
                            <DatePicker
                                floatingLabelText="Fecha factura (DD/MM/YYYY)"
                                formatDate={date => moment(date).format("DD/MM/YYYY")}
                                name="billDate"
                                onChange={(e, value) => setFieldValue("billDate", value)}
                                cancelLabel="Cancelar"
                                errorText={touched.billDate && errors.billDate}
                                autoOk
                            />
                        </Col>
                        <Col xs>
                            <DatePicker
                                floatingLabelText="Fecha llegada (DD/MM/YYYY)"
                                formatDate={date => moment(date).format("DD/MM/YYYY")}
                                name="billArrivalDate"
                                onChange={(e, value) => setFieldValue("billArrivalDate", value)}
                                cancelLabel="Cancelar"
                                errorText={touched.billArrivalDate && errors.billArrivalDate}
                                autoOk
                            />
                        </Col>
                        <Col xs={4}>
                            <TextField
                                floatingLabelText="Observación"
                                name="billObservation"
                                multiLine
                                value={values.billObservation}
                                rows={2}
                                rowsMax={6}
                                onChange={handleChange}
                                errorText={touched.billObservation && errors.billObservation}
                            />
                        </Col>
                    </Row>
                    <Row end="xs">
                        <Col xs={3}>
                            <RaisedButton label="Radicar" disabled={isSubmitting} onClick={handleSubmit} />
                        </Col>
                    </Row>
                </Paper>
            </Grid>
        </form>
    );
};
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
        dni_provider: checkNotNull(values.dni_provider, "Se requiere DNI del proveedor."),
        name: checkNotNull(values.name, "Se requiere el nombre del proveedor."),
        billNumber: checkNotNull(values.billNumber, "Se requiere el número de factura."),
        billValue:
            checkNotNull(values.billValue, "Se requiere el valor de la factura.") ||
            checkArgument(values.billValue < 0, "El valor de la factura no puede ser negativo.") ||
            checkArgument(values.billValue === 0, "El valor de la factura no puede ser cero.")
    };
    return _.omitBy(errors, _.isNil);
};
const validate = values => _.assign({}, validateRequired(values), validateDates(values));

FormRadicacion.defaultProps = {
    values: [],
    errors: [],
    isSubmitting: false,
    handleChange: () => {},
    handleSubmit: () => {}
};

FormRadicacion.propTypes = {
    values: PropTypes.shape({
        dni_provider: PropTypes.string,
        dni_type: PropTypes.string,
        name: PropTypes.string,
        micrositio: PropTypes.string,
        billNumber: PropTypes.string,
        billValue: PropTypes.number,
        billDate: PropTypes.instanceOf(Date),
        billArrivalDate: PropTypes.instanceOf(Date),
        billObservation: PropTypes.string
    }),
    errors: PropTypes.shape({
        dni_provider: PropTypes.string,
        dni_type: PropTypes.string,
        name: PropTypes.string,
        micrositio: PropTypes.string,
        billNumber: PropTypes.string,
        billValue: PropTypes.string,
        billDate: PropTypes.string,
        billArrivalDate: PropTypes.string,
        billObservation: PropTypes.string
    }),
    isSubmitting: PropTypes.bool,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func.isRequired,
    touched: PropTypes.shape().isRequired
};

export default withFormik({
    mapPropsToValues: props => ({
        dni_provider: props.bill.dni_provider,
        dni_type: props.bill.dni_type,
        name: props.bill.name,
        micrositio: props.bill.micrositio,
        billNumber: props.bill.billNumber,
        billValue: props.bill.billValue,
        billDate: props.bill.billDate,
        billArrivalDate: props.bill.billArrivalDate,
        billObservation: props.bill.billObservation
    }),
    validate,
    handleSubmit: (values, { setSubmitting }) => {
        const valuesToSend = _.mapValues(values, value => {
            if (_.isDate(value)) {
                return moment(value).format("DD/MM/YYYY");
            }
            return value;
        });
        setTimeout(() => {
            // submit them do the server. do whatever you like!
            console.log(valuesToSend);
            alert(JSON.stringify(valuesToSend, null, 2));
            setSubmitting(false);
        }, 1000);
    }
})(FormRadicacion);
