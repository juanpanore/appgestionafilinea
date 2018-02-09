import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import PropTypes from "prop-types";
import logo from "../../images/Logosura.png";

class Header extends Component {
    state = { open: false, text: "" };

    componentDidMount() {
        axios.post(`http://192.168.2.119:8085/facturas/todas`).then(res => {
            const text = res.data;
            this.setState({ text });
        });
    }

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <div>
                    <img src={logo} alt="Sura" width="140dp" height="60dp" />
                </div>
                <AppBar
                    title={this.props.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Drawer docked={false} open={this.state.open} onRequestChange={open => this.setState({ open })}>
                    <MenuItem onClick={this.handleClose} />
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/" to="/">
                            Inicio
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/facturasPendientes" to="/facturasPendientes">
                            Facturas Pendientes
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/facturasAuditadas" to="/facturasAuditadas">
                            Facturas Auditadas
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/facturasPagadas" to="/facturasPagadas">
                            Facturas Pagadas
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/facturasDevueltas" to="/facturasDevueltas">
                            Facturas Devueltas
                        </Link>
                    </MenuItem>
                </Drawer>
                <div>Respuesta de servicio: {this.state.text}</div>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
