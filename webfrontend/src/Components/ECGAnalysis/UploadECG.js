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

class UploadECG extends React.Component {
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
        <h2 className={styles.headingText}>ECG Analysis</h2>
        <hr></hr>
        <br></br>
        <h4 className={styles.profileTextHeading}>
          Upload ECG Reports to get quick analysis
        </h4>
        <br></br>
        <br></br>
        <Form>
          <Form.File id="ecgFile" name="ecgFile" label="Pdf or jpeg format" />
          <br></br>
          <br></br>
          <Button variant="danger" className={styles.fontFam}>
            Upload Report
          </Button>
        </Form>
        <br></br>
        <br></br> <br></br> <br></br> <br></br> <br></br> 
      </div>
    );
  }
}

export default UploadECG;
