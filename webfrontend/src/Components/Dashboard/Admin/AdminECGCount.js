import React from "react";
import { Bar } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed
//https://stackoverflow.com/questions/59472883/grouped-bar-chart-with-react-chartjs-2
class AdminECGCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [
              {
                label: 'Normal',
                backgroundColor: ' rgba(75,192,192,1)',
                borderColor: ' rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(80,192,192,1)',
                hoverBorderColor: 'rgba(80,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40,78,65,89,80,78]
              },
              {
                label: 'Abnormal',
                backgroundColor: 'rgba(245, 121, 121,1)',
                borderColor: 'rgba(245, 121, 121,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(250, 121, 121,1)',
                hoverBorderColor: 'rgba(250, 121, 121,1)',
                data: [20, 29, 30, 41, 16, 15, 20,28,21,34,32,38]
              }
            ]
        }
    };
  }

  render() {

    let options={
      responsive: true,
      legend: {
          display: false,
      },
      type:'bar'
  };

    return (
      <div>
        <br/>
        <Row>
          <Col sm={8}>
            <h4 className={styles.profileTextHeading}>ECG Reports Per Months</h4>
          </Col>
        </Row>
        <br/>
        <div className={styles.graphLabel}>
            <Row>
            <Col sm={1}>
            </Col>
            <Col sm={10}>
            <Bar
                data={this.state.data}
                width={null}
                height={null}
                options={options}
            />
            </Col>
            <Col sm={1}>
            </Col>
            </Row>
            
        </div>
      </div>
    );
  }
}

export default AdminECGCount;
