import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import ReportChart from "./ReportChart";
import LineChart from "./LineChart";
import styles from "../../Styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json",
  },
};

const ECGReports = (props) => {
  const [curPageStart, setCurPageStart] = useState(0);
  const [curClassIndex, setCurClassIndex] = useState(0);

  const handleNext = () => {
    // console.log("cur page and class", curPageStart, curClassIndex);
    // setCurPageStart(curPageStart + 1000);
    // setCurClassIndex(curClassIndex + 1);
  };
  const handlePrev = () => {
    // console.log("cur page and class", curPageStart, curClassIndex);
    // setCurPageStart(curPageStart - 1000);
    // setCurClassIndex(curClassIndex - 1);
  };
  console.log("curPageStart", curPageStart);
  return (
    <div className={styles.whiteBox}>
      <h2 className={styles.headingText}>ECG Reports</h2>
      <hr />
      <br />
      <center className={styles.profileTextHeading}>
        <h5>{/* <LineChart></LineChart> */}</h5>
        <ReportChart
          csvClassification={props.csvClassification}
          csvContentArr={props.csvContentArr}
          curPageStart={curPageStart}
          curClassIndex={curClassIndex}
        ></ReportChart>
        {props.csvContentArr.length === 0 ? null : (
          <div>
            <Button
              onClick={() => handlePrev()}
              disabled={curPageStart === 0 ? true : false}
            >
              <i class="fas fa-arrow-left"></i>
            </Button>{" "}
            <Button onClick={() => handleNext()}>
              <i class="fas fa-arrow-right"></i>
            </Button>
          </div>
        )}
      </center>
      <br />
    </div>
  );
};

export default ECGReports;
