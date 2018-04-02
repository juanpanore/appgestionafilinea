import React from "react";
import PropTypes from "prop-types";
import assign from "lodash/assign";
import isEmpty from "lodash/isEmpty";

const styles = {
    text: {
        margin: 0,
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 400,
        boxSizing: "border-box"
    },
    title: {
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 13,
        fontWeight: 400,
        boxSizing: "border-box"
    }
};

const LabelField = props => {
    const { title, text, titleColor, textColor } = props;
    const marginContent = isEmpty(text) && isEmpty(title) ? 0 : 10;
    const styleContent = {
        width: "100%",
        marginTop: marginContent,
        marginBottom: marginContent,
        paddingBottom: 2,
        borderBottom: "2px dotted #212121"
    };
    return (
        <div style={styleContent}>
            <h3
                style={assign({}, styles.title, {
                    paddingBottom: isEmpty(title) ? 0 : 2,
                    color: titleColor
                })}
            >
                {!isEmpty(text) && (!isEmpty(title) && title)}
            </h3>
            <h3 style={assign({}, styles.text, { color: textColor })}>
                {isEmpty(text) ? !isEmpty(title) && title : text}
            </h3>
        </div>
    );
};

LabelField.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    titleColor: PropTypes.string,
    textColor: PropTypes.string
};

LabelField.defaultProps = {
    title: "",
    text: "",
    titleColor: "#2b2b2b",
    textColor: "#000"
};

export default LabelField;
