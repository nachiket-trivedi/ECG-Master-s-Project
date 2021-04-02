import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed=&file=/src/App.js
class PatientECGCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
            backgroundColor: " rgba(75,192,192,1)",
            borderColor: " rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(80,192,192,1)",
            hoverBorderColor: "rgba(80,192,192,1)",
            data: [5, 2, 3, 3, 4, 2, 2, 3, 1, 5, 3, 2]
          },
          {
            label: "Abnormal",
            backgroundColor: "rgba(245, 121, 121,1)",
            borderColor: "rgba(245, 121, 121,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(250, 121, 121,1)",
            hoverBorderColor: "rgba(250, 121, 121,1)",
            data: [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  }

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
