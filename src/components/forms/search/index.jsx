import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withFormik } from "formik";
import _ from "lodash";
import axios from "axios";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { checkNotNull } from "../../../functions/validations";

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

const SearchPage = props => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper style={paperStyle} zDepth={2}>
          <Row>
            <Col>
              <p>Consulta prestador</p>
            </Col>
          </Row>
          <Divider style={dividerStyle} />
          <Row>
            <Col xs={3}>
              <SelectField
                floatingLabelText="Tipo identificación"
                value={values.dniType}
                onChange={(e, key, value) => setFieldValue("dniType", value)}
                errorText={touched.dniType && errors.dniType}
              >
                <MenuItem value="N" primaryText="NIT" />
                <MenuItem value="C" primaryText="CC" />
                <MenuItem value="E" primaryText="Cédula Extranjeria" />
              </SelectField>
            </Col>
            <Col xs={4}>
              <TextField
                floatingLabelText="Número identificación"
                name="dniProvider"
                value={values.dniProvider}
                onChange={handleChange}
                maxLength={20}
                errorText={touched.dniProvider && errors.dniProvider}
                fullWidth
              />
            </Col>
          </Row>
          <Row end="xs">
            <Col xs={51}>
              <RaisedButton label="Buscar" disabled={isSubmitting} onClick={handleSubmit} />
            </Col>
          </Row>
        </Paper>
      </Grid>
    </form>
  );
};
const validateRequired = values => {
  const errors = {
    dniProvider: checkNotNull(values.dniProvider, "Se requiere DNI del proveedor.")
  };
  return _.omitBy(errors, _.isNil);
};
const validate = values => _.assign({}, validateRequired(values));

SearchPage.defaultProps = {
  values: [],
  errors: [],
  isSubmitting: false,
  handleChange: () => {},
  handleSubmit: () => {}
};

SearchPage.propTypes = {
  values: PropTypes.shape({
    dniProvider: PropTypes.string.isRequired,
    dniType: PropTypes.string.isRequired
  }),
  errors: PropTypes.shape({
    dniProvider: PropTypes.string,
    dniType: PropTypes.string
  }),
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.shape().isRequired
};

function getProviderData(values) {
  axios({
    method: "GET",
    url: "http://localhost:9640/gestionpagosprevencionapi/v1/provider",
    params: {
      id: values.dniType + values.dniProvider
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
}

export default withFormik({
  mapPropsToValues: props => ({
    dniProvider: props.dniProvider,
    dniType: props.dniType
  }),
  validate,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit them do the server. do whatever you like!
      const id = getProviderData(values);
      console.log(id);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(SearchPage);
