import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";

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
                <br />
                <table>
                    <Paper zDepth={3}>
                        <tr>
                            <th>Información prestador</th>
                        </tr>
                        <tr>
                            <td>
                                <SelectField
                                    floatingLabelText="Tipo identificación"
                                    value={this.state.selectFieldValue}
                                    onChange={this.handleIdTypeChange}
                                >
                                    <MenuItem value={1} primaryText="NIT" />
                                    <MenuItem value={2} primaryText="CC" />
                                    <MenuItem value={3} primaryText="Cédula Extranjeria" />
                                </SelectField>
                            </td>
                            <td>
                                <TextField floatingLabelText="Número identificación" onChange={this.handleIdChange} />
                            </td>
                            <td>
                                <div>
                                    <TextField floatingLabelText="Nombre empresa" />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <TextField floatingLabelText="Micrositio (Si/No)" />
                                </div>
                            </td>
                        </tr>
                    </Paper>
                    <br />
                    <br />
                    <Paper zDepth={3}>
                        <tr>
                            <th>Información de factura</th>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <TextField floatingLabelText="Número factura" type="number" />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <TextField floatingLabelText="Valor factura" type="number" />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <DatePicker hintText="Fecha factura (YYYY-MM-DD)" />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <DatePicker hintText="Fecha llegada (YYYY-MM-DD)" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <TextField floatingLabelText="Observación" multiLine="true" rows={2} rowsMax={6} />
                        </tr>
                    </Paper>
                </table>
            </form>
        );
    }
}

export default FormRadicacion;
