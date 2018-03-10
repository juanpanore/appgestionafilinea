import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import PropTypes from "prop-types";
import logo from "../../images/Logosura.png";
/* import AppSelector from "../appSelection"; */
/* import SearchPreventionBill from "../prevention/searchPrevention"; */

class Header extends Component {
  state = {
    open: false,
    data: []
  };

  componentDidMount() {
    axios.get(`http://192.168.2.200:8080/api/v1/cars`).then(response => {
      this.setState({ data: response.data });
    });
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div>
          <img src={logo} alt="Sura" width="140dp" height="60dp" />
        </div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            <Row>
              <Col xs={9}>{/* <SearchPreventionBill /> */}</Col>
              <Col xs={3}>{/* <AppSelector /> */}</Col>
            </Row>
          }
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
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
        {/* <p>Respuesta de servicio: </p>
                {JSON.stringify(this.state.data, null, 2)} */}
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
