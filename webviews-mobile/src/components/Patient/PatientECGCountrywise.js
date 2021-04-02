import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class PatientECGCountrywise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Normal", "Abnormal"],
        datasets: [
          {
            label: "Count",
            backgroundColor: [" rgba(75,192,192,1)", "rgba(245, 121, 121,1)"],
            hoverBackgroundColor: [
              " rgba(80,192,192,1)",
              "rgba(250, 121, 121,1)"
            ],
            data: [2000, 590]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
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

export default PatientECGCountrywise;