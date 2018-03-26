import React from "react";
import PropTypes from "prop-types";
import assign from "lodash/assign";

const styles = {
    text: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5
    },
    title: {
        paddingRight: 5,
        fontWeight: 600
    }
};

const Label = props => {
    const { title, text, titleColor, textColor } = props;
    return (
        <h3 style={assign({}, styles.text, { color: textColor })}>
            <strong style={assign({}, styles.title, { color: titleColor })}>
                {title}
            </strong>
            {text}
        </h3>
    );
};

Label.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    titleColor: PropTypes.string,
    textColor: PropTypes.string
};

Label.defaultProps = {
    title: "",
    text: "",
    titleColor: "#000",
    textColor: "#000"
};

export default Label;
