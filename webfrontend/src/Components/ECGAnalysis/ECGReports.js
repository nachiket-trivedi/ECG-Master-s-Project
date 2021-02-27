import React from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class ECGReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      userId: localStorage.getItem("userId"),
      ecgFile: ""
    };
  }

  render() {

    if (
      localStorage.getItem("email") == null ||
      !localStorage.getItem("medicalFlag")
    ) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.whiteBox}>
          <h2 className={styles.headingText}>
              ECG Reports
          </h2>
          <hr></hr>
          <br>
          </br>
          <center className={styles.profileTextHeading}>
              <h5>
              Nothing to show!
              </h5>
          
          </center>
          <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
          
        <br></br>
      </div>
    );
  }
}

export default ECGReports;
