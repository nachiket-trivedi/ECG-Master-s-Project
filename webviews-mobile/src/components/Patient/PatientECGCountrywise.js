import React from "react";
import { Pie } from "react-chartjs-2";
import styles from "../../styles/styles.module.css";
import { Row } from "react-bootstrap";
import axios from "axios";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class PatientECGCountrywise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: "",
      baseData: [2000, 590]
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
        .get(
          hostAddress + "/patientDashboard/ecgCountrywise/" + userId,
          config
        )
        .then(response => {
          console.log(response);
          var normal = this.state.baseData[0] + response.data.normal;
          var abnormal = this.state.baseData[1] + response.data.abnormal;

          var data = {
            labels: ["Normal", "Abnormal"],
            datasets: [
              {
                label: "Count",
                backgroundColor: [
                  "rgba(75,192,192,1)",
                  "rgba(245, 121, 121,1)"
                ],
                hoverBackgroundColor: [
                  "rgba(80,192,192,1)",
                  "rgba(250, 121, 121,1)"
                ],
                data: [normal, abnormal]
              }
            ]
          };

          this.setState({
            chartData: data
          });
        });
    };
  };

  render() {
    return (
      <div>
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

export default PatientECGCountrywise;
