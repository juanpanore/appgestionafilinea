import React from "react";
import PropTypes from "prop-types";

const styles = {
    text: {
        border: "1px solid #FF0"
    }
};

/* class Label extends Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string
    };

    static defaultProps = {
        title: "",
        text: ""
    };

    render() {
        const { title, text } = this.props;
        return (
            <h3 style={styles.text}>
                <strong>{title}</strong>
                {text}
            </h3>
        );
    }
} */

const Label = props => {
    const { title, text } = props;
    return (
        <h3 style={styles.text}>
            <strong>{title}</strong>
            {text}
        </h3>
    );
};

Label.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string
};

Label.defaultProps = {
    title: "",
    text: ""
};

export default Label;
