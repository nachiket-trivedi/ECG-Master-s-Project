import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import { backendIp, backendPort } from "../../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class AdminAbnormalGenderwise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: "",
      baseData: [679, 890]
    };
  }

  componentWillMount = async () => {
    axios.defaults.withCredentials = true;
    axios
      .get(hostAddress + "/adminDashboard/ecgGenderwise", config)
      .then(response => {
        console.log(response);
        var normal = this.state.baseData[0] + response.data.normal;
        var abnormal = this.state.baseData[1] + response.data.abnormal;

        var data = {
          labels: ["Female", "Male"],
          datasets: [
            {
              label: "Count",
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)"
              ],
              hoverBackgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)"
              ],
              data: [
                this.state.baseData[0] + response.data.female,
                this.state.baseData[1] + response.data.male
              ]
            }
          ]
        };

        this.setState({
          chartData: data
        });
      });
  };
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm={12}>
            <center>
              <h4 className={styles.profileTextHeading}>
                Gender-wise Abnormal ECG
              </h4>
            </center>
          </Col>
        </Row>
        <br />
        <div className={styles.graphLabel}>
          <Row>
            <Pie
              data={this.state.chartData}
              options={{
                legend: {
                  display: true,
                  position: "right"
                }
              }}
            />
          </Row>
        </div>
      </div>
    );
  }
}

export default AdminAbnormalGenderwise;
