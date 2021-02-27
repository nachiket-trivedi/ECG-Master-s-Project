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
    if (
      localStorage.getItem("medicalFlag") == 0 ||
      localStorage.getItem("medicalFlag") == "false"
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    return (
      <div className={styles.profilebg}>
          <br></br>
        <UploadECG />
       <br></br>
        <ECGReports />
      </div>
    );
  }
}

export default ECGAnalysis;
