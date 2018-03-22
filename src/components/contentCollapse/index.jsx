import React, { PureComponent } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";

const styles = {};

class ContentCollapse extends PureComponent {
    static defaultProps = {
        children: <span />
    };

    static propTypes = {
        children: PropTypes.node
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

export default ContentCollapse;
