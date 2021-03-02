import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class AdminAbnormalCountrywise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        chartData: {
          labels: ["United States", "India","Japan","France"],
          datasets: [
            {
              label: "Count",
              backgroundColor: ['rgba(54, 32, 25, 0.6)',
              'rgba(255, 206, 226, 0.6)',
              'rgba(200, 200, 64, 0.6)',
              'rgba(255, 206, 86, 0.6)',],
              hoverBackgroundColor: ['rgba(54, 32, 25, 0.6)',
              'rgba(255, 206, 226, 0.6)',
              'rgba(200, 200, 64, 0.6)',
              'rgba(255, 206, 86, 0.6)'],
              data: [1007,756,209,450]
            }
          ]
        }
      };
  }

  render() {

    return (
      <div>
        <br />
        <Row>
          <Col sm={12}>
            <center>
              <h4 className={styles.profileTextHeading}>
                Country-wise Abnormal ECG
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

export default AdminAbnormalCountrywise;
