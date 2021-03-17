import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import UploadECG from "../../Components/ECGAnalysis/UploadECG";
import ECGReports from "../../Components/ECGAnalysis/ECGReports";

const ECGAnalysis = () => {
  const [csvClassification, setCsvClassification] = useState([]);
  const [csvContentArr, setCsvContentArr] = useState([]);
  if (localStorage.getItem("email") == null) {
    return <Redirect to="/" />;
  }
  if (localStorage.getItem("role") == "admin") {
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
      <UploadECG
        abc={"abc"}
        setCsvClassification={setCsvClassification}
        setCsvContentArr={setCsvContentArr}
      />
      <br />
      <ECGReports
        csvClassification={csvClassification}
        csvContentArr={csvContentArr}
      />
      <br />
    </div>
  );
};

export default ECGAnalysis;
