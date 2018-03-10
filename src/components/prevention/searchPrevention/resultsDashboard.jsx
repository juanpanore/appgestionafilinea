import React from "react";
import { arrayOf, shape, number, string, bool } from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import Paper from "material-ui/Paper";
import { Row, Col } from "react-flexbox-grid";
import CircularProgress from "material-ui/CircularProgress";

const ResultsDashboard = props => {
  const { data, loading } = props;
  const loadingUI = (
    <div>
      <CircularProgress />
    </div>
  );
  const dataUI = _.isEmpty(data) ? "Sin datos" : <code>{JSON.stringify(data, null, 2)}</code>;
  return (
    <Paper>
      <Row>
        <Col>{loading ? loadingUI : dataUI}</Col>
      </Row>
    </Paper>
  );
};

ResultsDashboard.propTypes = {
  data: arrayOf(
    shape({
      delegationDni: number.isRequired,
      dni_Provider: number.isRequired,
      dni_type: string.isRequired,
      dsname_Provider: string.isRequired,
      micrositio: bool.isRequired
    })
  ).isRequired,
  loading: bool.isRequired
};

function mapStateToProps({ searchPreventionBill }) {
  return {
    data: searchPreventionBill.get("bills"),
    loading: searchPreventionBill.get("loading")
  };
}

export default connect(mapStateToProps)(ResultsDashboard);
