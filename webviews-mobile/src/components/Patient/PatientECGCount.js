import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Redirect } from "react-router";
import axios from "axios";
import styles from "../../styles/styles.module.css";
import { Row, Col } from "react-bootstrap";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};
//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed=&file=/src/App.js
class PatientECGCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      base_normal: [5, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      base_abnormal: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  componentWillMount = async () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userId = params.get("userId");
    console.log(userId);
    if (userId) {
      axios.defaults.withCredentials = true;
      axios
        .get(hostAddress + "/patientDashboard/ecgRecords/" + userId, config)
        .then(response => {
          console.log(response);
          var abnormal = [];
          var normal = [];
          for (var i = 0; i < 12; i++) {
            normal[i] = this.state.base_normal[i] + response.data.normal[i];
            abnormal[i] =
              this.state.base_abnormal[i] + response.data.abnormal[i];
          }

          var data = {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            datasets: [
              {
                label: "Normal",
                data: normal,
                fill: true,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)"
              },
              {
                label: "Abnormal",
                data: abnormal,
                fill: true,
                borderColor: "rgba(245, 121, 121,1)",
                backgroundColor: "rgba(245, 121, 121,1)"
              }
            ]
          };
          this.setState({
            data: data
          });
        });
    }
    //backend call to get details for object user
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
        <div className={styles.graphLabel}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              {/* <Line data={this.state.data} /> */}
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

export default PatientECGCount;
