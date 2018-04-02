import React, { Component } from "react";
import { func } from "prop-types";
import { Tabs, Tab } from "material-ui/Tabs";
import { blue900, blue50 } from "material-ui/styles/colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Content from "../../components/content";
import PaySoon from "./components/paySoon";
import PayNoSoon from "./components/payNoSoon";
import { searchDocTypes as sdt, cleanBill as cb } from "./ducks";

const styles = {
    buttonTab: {
        backgroundColor: blue50,
        color: blue900
    }
};

class Bills extends Component {
    static propTypes = {
        searchDocTypes: func.isRequired,
        cleanBill: func.isRequired
    };

    state = {
        value: "paysoon"
    };

    componentWillMount() {
        const { searchDocTypes } = this.props;
        searchDocTypes();
    }

    componentWillUnmount() {
        const { cleanBill } = this.props;
        cleanBill();
    }

    handleChange = value => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <Content paddingLeft={0} paddingRight={0} paddingTop={0}>
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab
                        label="Pronto pago"
                        value="paysoon"
                        buttonStyle={styles.buttonTab}
                    >
                        <PaySoon />
                    </Tab>
                    <Tab
                        label="Sin pronto pago"
                        value="paynosoon"
                        buttonStyle={styles.buttonTab}
                    >
                        <PayNoSoon />
                    </Tab>
                </Tabs>
            </Content>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchDocTypes: sdt, cleanBill: cb }, dispatch);
}

export default connect(null, mapDispatchToProps)(Bills);
