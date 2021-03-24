import React, { useState, useEffect } from "react";
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
  const [csvMetaData, setCsvMetaData] = useState(null);
  const [csvClassificationData, setCsvClassificationData] = useState(null);

  useEffect(() => {
    let csvMetaDataObj = props.csvMetaDataObj;
    let csvClassification = props.csvClassification;
    let start = -1000,
      end = -1;

    setCsvMetaData(
      Object.keys(csvMetaDataObj).map((rowKey) => {
        let rowValue = csvMetaDataObj[rowKey];
        return (
          <div className={styles.metaDataRow}>
            <div className={styles.metaDataRowKey}>{rowKey}</div>
            <div className={styles.metaDataRowVal}>{rowValue}</div>
          </div>
        );
      })
    );

    setCsvClassificationData(
      csvClassification == null || csvClassification["output"] == null
        ? null
        : csvClassification["output"].map((classification) => {
            start = start + 1000;
            end = end + 1000;
            return (
              <div className={styles.metaDataRow}>
                <div className={styles.metaDataRowKey}>
                  {start} to {end}
                </div>
                <div className={styles.metaDataRowVal}>{classification}</div>
              </div>
            );
          })
    );
  }, [
    JSON.stringify(props.csvMetaDataObj),
    JSON.stringify(props.csvClassification),
  ]);
  const handleNext = () => {
    console.log("cur page and class", curPageStart, curClassIndex);
    setCurPageStart(curPageStart + 1000);
    setCurClassIndex(curClassIndex + 1);
  };
  const handlePrev = () => {
    console.log("cur page and class", curPageStart, curClassIndex);
    setCurPageStart(curPageStart - 1000);
    setCurClassIndex(curClassIndex - 1);
  };
  console.log("curPageStart", curPageStart);
  return (
    <div className={styles.whiteBox}>
      <h2 className={styles.headingText}>ECG Reports</h2>
      <hr />
      <br />
      <div className={styles.metaDatasContainer}>
        {csvMetaData === null || csvMetaData.length === 0 ? null : (
          <Card className={styles.classificationDataCard}>
            <center>
              <Card.Title>Meta Data</Card.Title>
            </center>
            <br />
            {csvMetaData}
          </Card>
        )}
        {csvClassificationData === null ||
        csvClassificationData.length === 0 ? null : (
          <Card className={styles.classificationDataCard}>
            <center>
              <Card.Title>Classification Analysis</Card.Title>
            </center>
            <br />
            {csvClassificationData}
          </Card>
        )}
      </div>
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

        {/* {csvClassificationData === null ||
        csvClassificationData.length === 0 ? null : (
          <Card className={styles.classificationDataCard}>
            <h5>Classification Analysis</h5>
            <hr />
            {csvClassificationData}
          </Card>
        )} */}
      </center>
      <br />
    </div>
  );
};

export default ECGReports;
