import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui/DatePicker";
import moment from "moment";
import TextField from "material-ui/TextField";
import _ from "lodash";
import TodayIcon from "material-ui/svg-icons/action/today";
import IconButton from "material-ui/IconButton";
import areIntlLocalesSupported from "intl-locales-supported";
import { grey400 } from "material-ui/styles/colors";

const dateformat = "DD/MM/YYYY";
const localeLanguage = "es-ES";

function validDate(text) {
    const valueFormat = moment(text, dateformat, true);
    return valueFormat.isValid();
}

const styles = {
    content: { minWidth: 256 },
    tableContent: { borderCollapse: "collapse", width: "100%" },
    textContent: { padding: 0 },
    dateContent: {
        boxSizing: "border-box",
        width: 36,
        padding: 0,
        verticalAlign: "top"
    },
    buttonDateContent: {
        width: 36,
        height: 66,
        paddingTop: 29,
        boxSizing: "border-box"
    },
    icon: { width: 22, height: 22 },
    buttonIcon: {
        boxSizing: "border-box",
        width: 36,
        height: 36,
        padding: "4px 3px",
        zIndex: 0
    },
    datePicker: {
        boxSizing: "border-box",
        width: 36,
        height: 38,
        backgroundColor: "transparent",
        marginTop: -36
    },
    textDatePicker: {
        width: 36,
        height: 36,
        paddingTop: 7,
        cursor: "pointer",
        fontSize: 0
    }
};

export default class DatePickerFormat extends Component {
    static defaultProps = {
        floatingLabelText: "",
        errorText: "",
        width: 256,
        fullWidth: false
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        floatingLabelText: PropTypes.string,
        errorText: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        width: PropTypes.number,
        fullWidth: PropTypes.bool
    };

    state = {
        minDate: undefined,
        maxDate: undefined,
        textDate: "",
        currentDate: "",
        DateTimeFormat: undefined
    };

    componentWillMount() {
        const { value } = this.props;
        // init values default
        const currentDate = moment().format(dateformat);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        maxDate.setFullYear(maxDate.getFullYear() + 100);

        // Init localeLanguage
        let DateTimeFormat;
        const pathIntl = `intl/locale-data/jsonp/${localeLanguage}`;
        if (window.Intl) {
            if (areIntlLocalesSupported("es")) {
                DateTimeFormat = _.get(global, "Intl.DateTimeFormat");
            }
        } else {
            require.ensure(["intl", pathIntl], require => {
                require("intl");
                // eslint-disable-next-line
                require(pathIntl);
                DateTimeFormat = _.get(global, "Intl.DateTimeFormat");
            });
        }
        this.setState({
            minDate,
            maxDate,
            textDate: value,
            currentDate,
            DateTimeFormat
        });
    }

    componentWillUnmount() {
        this.setState({
            minDate: undefined,
            maxDate: undefined,
            textDate: "",
            currentDate: ""
        });
    }

    onChangeValue = (e, value) => {
        const { name, onChange } = this.props;
        const valueFormat = moment(value).format(dateformat);
        onChange(name, valueFormat);
        this.setState({ textDate: valueFormat });
    };

    onHandleResetDate = () => {
        const { name, onChange, value } = this.props;
        const { textDate, currentDate } = this.state;
        const emptyText =
            _.isEqual(textDate, "") ||
            _.isNull(textDate) ||
            _.isUndefined(textDate) ||
            !validDate(textDate);
        const emptyValue =
            _.isEqual(value, "") ||
            _.isNull(value) ||
            _.isUndefined(value) ||
            !validDate(value);
        if (emptyText && emptyValue) {
            this.setState({ textDate: currentDate });
            onChange(name, currentDate);
        }
    };

    onChangeValueText = (e, value) => {
        this.setState({ textDate: value });
    };

    onBlurText = () => {
        const { name, onChange } = this.props;
        const { textDate } = this.state;
        if (
            _.isEqual(textDate, "") ||
            _.isNull(textDate) ||
            _.isUndefined(textDate)
        ) {
            this.setState({ textDate: "" });
            onChange(name, "");
        } else if (validDate(textDate)) {
            this.setState({ textDate });
            onChange(name, textDate);
        } else {
            this.setState({ textDate: "" });
            onChange(name, "");
        }
    };

    render() {
        const {
            name,
            floatingLabelText,
            value,
            width,
            fullWidth,
            errorText
        } = this.props;
        const { minDate, maxDate, textDate, DateTimeFormat } = this.state;
        const widthElement = fullWidth ? "100%" : width;
        return (
            <div style={_.assign({}, styles.content, { width: widthElement })}>
                <table style={styles.tableContent}>
                    <tbody>
                        <tr>
                            <td style={styles.textContent}>
                                <TextField
                                    hintText="DD/MM/YYYY"
                                    floatingLabelText={floatingLabelText}
                                    name={name}
                                    value={textDate}
                                    onChange={this.onChangeValueText}
                                    onBlur={this.onBlurText}
                                    errorText={errorText}
                                    multiLine={false}
                                    rows={1}
                                    rowsMax={1}
                                    fullWidth
                                />
                            </td>
                            <td style={styles.dateContent}>
                                <div style={styles.buttonDateContent}>
                                    <IconButton
                                        iconStyle={styles.icon}
                                        style={styles.buttonIcon}
                                    >
                                        <TodayIcon color={grey400} />
                                    </IconButton>
                                    <DatePicker
                                        DateTimeFormat={DateTimeFormat}
                                        locale="es"
                                        name={name}
                                        autoOk
                                        mode="portrait"
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        value={moment(
                                            value,
                                            dateformat
                                        ).toDate()}
                                        defaultDate={moment(
                                            moment(value, dateformat).toDate()
                                        )}
                                        formatDate={date =>
                                            moment(date).format(dateformat)
                                        }
                                        okLabel="ACEPTAR"
                                        cancelLabel="CANCELAR"
                                        onChange={this.onChangeValue}
                                        onClick={this.onHandleResetDate}
                                        hideCalendarDate={false}
                                        style={styles.datePicker}
                                        textFieldStyle={styles.textDatePicker}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
