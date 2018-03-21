import React, { PureComponent } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";

const styles = {
    grid: {
        padding: 0,
        margin: 0,
    },
    paper: {
        textAlign: "left",
        flex: 50,
        padding: 25,
        color: "rgb(0,51,160)",
        boxSizing: "border-box",
    },
    row: {
        padding: 0,
        margin: 0,
    },
    col: {
        padding: 0,
        margin: 0,
    },
};

class Content extends PureComponent {
    static defaultProps = {
        children: <span />,
    };

    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        const { children } = this.props;
        return (
            <Grid fluid style={styles.grid}>
                <Paper style={styles.paper} zDepth={0}>
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
