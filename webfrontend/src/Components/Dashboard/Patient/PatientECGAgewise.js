import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class PatientECGAgewise extends React.Component {
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
              "  rgba(80,192,192,1)",
              "rgba(250, 121, 121,1)"
            ],
            data: [65, 5]
          }
        ]
      }
    };
  }

  render() {
    if (
      localStorage.getItem("medicalFlag") == 0 ||
      localStorage.getItem("medicalFlag") == "false"
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    return (
      <div>
        <br />
        <Row>
          <Col sm={12}>
            <center>
              <h4 className={styles.profileTextHeading}>
                ECG for your Age-Group
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

export default PatientECGAgewise;
