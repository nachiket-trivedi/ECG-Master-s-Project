import React from "react";
import { Line } from "react-chartjs-2";
import { Redirect } from "react-router";
import styles from "../../../Styles/styles.module.css";
import { Row, Col } from "react-bootstrap";

import axios from "axios";
import { backendIp, backendPort } from "../../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

//https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss?from-embed
class AdminUserCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: [5, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      data: ""
    };
  }
  
  componentDidMount = () => {  
      axios.defaults.withCredentials = true;
      axios.get(
          hostAddress + "/adminDashboard/userCount",
          config
        )
        .then(response => {
          console.log(response);
          var userCount = [];
          for(var i=0;i<12;i++){
            userCount[i]= this.state.base[i] + response.data.userCount[i];
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
                label: "Users",
                data: userCount,
                fill: false,
                // backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
            ]
          }
          this.setState({
            data: data
          });
        });
  };
  

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
