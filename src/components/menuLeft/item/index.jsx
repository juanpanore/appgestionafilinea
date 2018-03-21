import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui/List";
import { Link } from "react-router-dom";

class ItemMenu extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.element.isRequired,
        url: PropTypes.string.isRequired,
        showTitle: PropTypes.bool.isRequired,
    };

    render() {
        const { title, icon, url, showTitle } = this.props;
        return (
            <ListItem
                primaryText={showTitle ? title : ""}
                containerElement={<Link href to={url} refresh="true" />}
                rightIcon={icon}
                style={{ height: 50, fontSize: 15 }}
                nestedListStyle={{ border: "1px solid #000" }}
            />
        );
    }
}

export default ItemMenu;
