import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../styles/styles.module.css";
import UploadECG from "./UploadECG";
import ECGReports from "./ECGReports";

const ECGAnalysis = () => {
  const [csvClassification, setCsvClassification] = useState(null);
  const [csvMetaDataObj, setCsvMetaDataObj] = useState({});

  return (
    <div className={styles.colorbg}>
      <br />
      <UploadECG
        abc={"abc"}
        setCsvClassification={setCsvClassification}
        setCsvMetaDataObj={setCsvMetaDataObj}
      />
      <ECGReports
        csvClassification={csvClassification}
        csvMetaDataObj={csvMetaDataObj}
      />
      <br />
    </div>
  );
};

export default ECGAnalysis;
