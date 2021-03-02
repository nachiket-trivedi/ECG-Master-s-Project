import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class AdminAbnormalGenderwise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData:   {
        labels: ["Female", "Male"],
        datasets: [
          {
          label: "Count",
          backgroundColor: ['rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'],
          hoverBackgroundColor: ['rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'],
          data: [679,890]
        }
      ]
    }
  }
  }

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
