import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import UploadECG from "../../Components/ECGAnalysis/UploadECG";
import ECGReports from "../../Components/ECGAnalysis/ECGReports";

class ECGAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if ( localStorage.getItem("role") == "admin") {
        return <Redirect to="/" />;
    }

    if (
      localStorage.getItem("role") == "patient" &&
      (localStorage.getItem("medicalFlag") == 0 ||
        localStorage.getItem("medicalFlag") == "false")
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    return (
      <div className={styles.colorbg}>
        <br />
        <UploadECG />
        <br />
        <ECGReports />
        <br />
      </div>
    );
  }
}

export default ECGAnalysis;
