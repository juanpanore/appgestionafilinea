import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { Grid, Row, Col } from "react-flexbox-grid";

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

class FormRadicacion extends Component {
    state = {
        selectFieldValue: 1
    };

    handleIdTypeChange = (event, index, selectFieldValue) => this.setState({ selectFieldValue });
    handleIdChange = () => {};
    handleSubmit = () => {};

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid>
                    <Row>
                        <Paper style={paperStyle} zDepth={5}>
                            <Row>
                                <Col>
                                    <p>Información prestador</p>
                                </Col>
                            </Row>
                            <Divider style={dividerStyle} />
                            <Row>
                                <Col xs>
                                    <SelectField
                                        floatingLabelText="Tipo identificación"
                                        value={this.state.selectFieldValue}
                                        onChange={this.handleIdTypeChange}
                                    >
                                        <MenuItem value={1} primaryText="NIT" />
                                        <MenuItem value={2} primaryText="CC" />
                                        <MenuItem value={3} primaryText="Cédula Extranjeria" />
                                    </SelectField>
                                </Col>
                                <Col xs>
                                    <TextField
                                        floatingLabelText="Número identificación"
                                        onChange={this.handleIdChange}
                                    />
                                </Col>
                                <Col xs>
                                    <TextField floatingLabelText="Nombre empresa" />
                                </Col>
                                <Col xs>
                                    <TextField floatingLabelText="Micrositio (Si/No)" maxLength={2} />
                                </Col>
                            </Row>
                        </Paper>
                    </Row>
                    <Row>
                        <Paper style={paperStyle} zDepth={5}>
                            <Row>
                                <Col>
                                    <p>Información de factura</p>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xs>
                                    <TextField floatingLabelText="Número factura" type="number" />
                                </Col>
                                <Col xs>
                                    <TextField floatingLabelText="Valor factura" type="number" />
                                </Col>
                                <Col xs>
                                    <DatePicker floatingLabelText="Fecha factura (YYYY-MM-DD)" />
                                </Col>
                                <Col xs>
                                    <DatePicker floatingLabelText="Fecha llegada (YYYY-MM-DD)" />
                                </Col>
                                <Col xs={3}>
                                    <TextField floatingLabelText="Observación" multiLine="true" rows={2} rowsMax={6} />
                                </Col>
                            </Row>
                        </Paper>
                    </Row>
                </Grid>
                <Grid>
                    <Row>
                        <Col xs={11}>
                            <Row end="xs">
                                <Col xs={3}>
                                    <RaisedButton label="Radicar" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
}

export default FormRadicacion;
