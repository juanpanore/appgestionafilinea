import React, { Component } from "react";
import { bool, element } from "prop-types";
import { connect } from "react-redux";
// import _ from "lodash";

class MenuBar extends Component {
    static propTypes = {
        open: bool.isRequired,
        // children: element.isRequired,
    };

    render() {
        const { open } = this.props; // style="margin:0;"
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", height: 50, backgroundColor: "#000", color: "#FFF" }}>
                    ´static bar - ${open}´
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {
        open: true,
    };
}

export default connect(mapStateToProps)(MenuBar);
