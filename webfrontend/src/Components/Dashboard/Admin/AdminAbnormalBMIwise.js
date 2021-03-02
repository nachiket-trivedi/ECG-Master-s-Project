import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class AdminAbnormalBMIwise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        chartData: {
          labels: ["Below 18.5", "18.6-24.9","25.0-29.9","30-34.9","35-39.9","Above 40"],
          datasets: [
            {
              label: "Count",
              backgroundColor: ['rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(54, 32, 25, 0.6)',
              'rgba(255, 206,86, 0.6)',
              'rgba(250, 200, 185, 0.6)'],
              hoverBackgroundColor: ['rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(54, 32, 25, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(250, 200,185, 0.6)'],
              data: [179,87,567,456,559,750]
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
               BMI-wise Abnormal ECG 
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

export default AdminAbnormalBMIwise;
