import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { Grid, Row, Col } from "react-flexbox-grid";
import moment from "moment";

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

const customStyle = {
    customWidth: {
        width: 160
    },
    largeWidth: {
        width: 300
    }
};

class FormRadicacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            errorText: "",
            idType: 1
        };
    }

    handleIdTypeChange = (event, index, idType) => this.setState({ idType });
    handleIdChange = event => {
        console.log("Validating textField... value: ", this.id);
        if (event.target.value === undefined || event.target.value === "") {
            console.log("Setting errorText...");
            this.setState({ errorText: "Este campo es requerido." });
        } else {
            this.setState({ errorText: "" });
        }
    };
    handleSubmit = event => {
        console.log("Submit form...");
        this.handleIdChange(event);
    };

    render() {
        return (
            <form onSubmit={this.handleIdChange}>
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
                                        value={this.state.idType}
                                        onChange={this.handleIdTypeChange}
                                        style={customStyle.customWidth}
                                    >
                                        <MenuItem value={1} primaryText="NIT" />
                                        <MenuItem value={2} primaryText="CC" />
                                        <MenuItem value={3} primaryText="Cédula Extranjeria" />
                                    </SelectField>
                                </Col>
                                <Col xs>
                                    <TextField
                                        floatingLabelText="Número identificación"
                                        value={this.state.id}
                                        onChange={e => this.setState({ id: e.target.value, errorText: "" })}
                                        maxLength={20}
                                        errorText={this.state.errorText}
                                        style={customStyle.customWidth}
                                    />
                                </Col>
                                <Col xs>
                                    <TextField
                                        floatingLabelText="Nombre empresa"
                                        maxLength={50}
                                        style={customStyle.largeWidth}
                                    />
                                </Col>
                                <Col xs>
                                    <TextField
                                        floatingLabelText="Micrositio (Si/No)"
                                        value={this.state.micrositio}
                                        maxLength={2}
                                        style={{ width: 130 }}
                                        defaultValue="SI"
                                        disabled="true"
                                    />
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
                                    <TextField floatingLabelText="Número factura" value={this.state.billNumber} />
                                </Col>
                                <Col xs>
                                    <TextField
                                        floatingLabelText="Valor factura"
                                        value={this.state.billValue}
                                        type="number"
                                    />
                                </Col>
                                <Col xs>
                                    <DatePicker
                                        floatingLabelText="Fecha factura (DD-MM-YYYY)"
                                        formatDate={date => moment(date).format("DD-MM-YYYY")}
                                    />
                                </Col>
                                <Col xs>
                                    <DatePicker
                                        floatingLabelText="Fecha llegada (DD-MM-YYYY)"
                                        formatDate={date => moment(date).format("DD-MM-YYYY")}
                                    />
                                </Col>
                                <Col xs={3}>
                                    <TextField
                                        floatingLabelText="Observación"
                                        value={this.state.observation}
                                        multiLine="true"
                                        rows={2}
                                        rowsMax={6}
                                        style={customStyle.largeWidth}
                                    />
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
                                    <RaisedButton label="Radicar" onClick={this.handleIdChange} />
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
