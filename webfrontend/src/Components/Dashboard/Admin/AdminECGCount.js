import React from "react";
import { Bar } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

import axios from "axios";
import { backendIp, backendPort } from "../../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed
//https://stackoverflow.com/questions/59472883/grouped-bar-chart-with-react-chartjs-2
class AdminECGCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      base_normal: [65, 59, 80, 81, 0, 0, 0, 0, 0, 0, 0, 0],
      base_abnormal: [20, 29, 30, 41, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  componentDidMount = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(hostAddress + "/adminDashboard/ecgRecords", config)
      .then(response => {
        console.log(response);
        var abnormal = [];
        var normal = [];
        for (var i = 0; i < 12; i++) {
          normal[i] = this.state.base_normal[i] + response.data.normal[i];
          abnormal[i] = this.state.base_abnormal[i] + response.data.abnormal[i];
        }

        var data = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "Normal",
              backgroundColor: " rgba(75,192,192,1)",
              borderColor: " rgba(75,192,192,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(80,192,192,1)",
              hoverBorderColor: "rgba(80,192,192,1)",
              data: normal
            },
            {
              label: "Abnormal",
              backgroundColor: "rgba(245, 121, 121,1)",
              borderColor: "rgba(245, 121, 121,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(250, 121, 121,1)",
              hoverBorderColor: "rgba(250, 121, 121,1)",
              data: abnormal
            }
          ]
        };
        this.setState({
          data: data
        });
      });
  };

  render() {
    let options = {
      responsive: true,
      legend: {
        display: false
      },
      type: "bar"
    };

    return (
      <div>
        <br />
        <Row>
          <Col sm={8}>
            <h4 className={styles.profileTextHeading}>
              ECG Reports Per Months
            </h4>
          </Col>
        </Row>
        <br />
        <div className={styles.graphLabel}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <Bar
                data={this.state.data}
                width={null}
                height={null}
                options={options}
              />
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AdminECGCount;
