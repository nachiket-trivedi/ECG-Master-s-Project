import React from "react";
import { Line } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed
class AdminUserCount extends React.Component {
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
            data: [5, 2, 3, 3, 4, 2, 2, 3, 1, 5, 3, 2],
            fill: false,
            // backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <br/>
        <Row>
          <Col sm={8}>
            <h4 className={styles.profileTextHeading}>Monthly Users Registered</h4>
          </Col>
        </Row>
        <br/>
        <div className={styles.graphLabel}>
            <Row>
            <Col sm={1}>
            </Col>
            <Col sm={10}>
            <Line data={this.state.data} />
            </Col>
            <Col sm={1}>
            </Col>
            </Row>
            
        </div>
      </div>
    );
  }
}

export default AdminUserCount;
