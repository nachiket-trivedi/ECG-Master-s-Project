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
class AdminAbnormalAgewise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: "",
      baseData: [20, 57, 107, 356, 209, 450]
    };
  }
  componentWillMount = async () => {
    axios.defaults.withCredentials = true;
    axios
      .get(hostAddress + "/adminDashboard/ecgAgewise", config)
      .then(response => {
        console.log(response);
        var normal = this.state.baseData[0] + response.data.normal;
        var abnormal = this.state.baseData[1] + response.data.abnormal;

        var data = {
          labels: ["0-18", "19-30", "30-40", "40-50", "50-60", "Above 60"],
          datasets: [
            {
              label: "Count",
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(200, 200, 64, 0.6)",
                "rgba(250, 200,185, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)"
              ],
              hoverBackgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(200, 200, 64, 0.6)",
                "rgba(250, 200,185, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)"
              ],
              data: [
                this.state.baseData[0] + response.data.below18,
                this.state.baseData[1] + response.data.below30,
                this.state.baseData[2] + response.data.below40,
                this.state.baseData[3] + response.data.below50,
                this.state.baseData[4] + response.data.below60,
                this.state.baseData[5] + response.data.above60
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
                Age-wise Abnormal ECG
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

export default AdminAbnormalAgewise;
