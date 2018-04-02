import React, { PureComponent } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import assign from "lodash/assign";

const styles = {
    grid: {
        padding: 0,
        margin: 0
    },
    paper: {
        textAlign: "left",
        flex: 50,
        color: "rgb(0,51,160)",
        boxSizing: "border-box"
    },
    row: {
        padding: 0,
        margin: 0
    },
    col: {
        padding: 0,
        margin: 0
    }
};

class Content extends PureComponent {
    static defaultProps = {
        children: <span />,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25
    };

    static propTypes = {
        children: PropTypes.node,
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number,
        paddingLeft: PropTypes.number,
        paddingRight: PropTypes.number
    };

    render() {
        const {
            children,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        } = this.props;
        const stylePaper = assign({}, styles.paper, {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        });
        return (
            <Grid fluid style={styles.grid}>
                <Paper style={stylePaper} zDepth={0}>
                    <Row style={styles.row}>
                        <Col xs style={styles.col}>
                            {children}
                        </Col>
                    </Row>
                </Paper>
            </Grid>
        );
    }
}

export default Content;
