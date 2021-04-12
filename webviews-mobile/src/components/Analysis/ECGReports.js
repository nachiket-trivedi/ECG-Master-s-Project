import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import ReportChart from "./ReportChart";
import styles from "../../styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json",
  },
};

const ECGReports = (props) => {
  const [curPageIndex, setcurPageIndex] = useState(0);
  const [csvMetaData, setCsvMetaData] = useState(null);
  const [csvClassificationData, setCsvClassificationData] = useState(null);

  useEffect(() => {
    let csvMetaDataObj = props.csvMetaDataObj;
    let csvClassification = props.csvClassification;
    let start = -5000,
      end = -1;

    setCsvMetaData(
      Object.keys(csvMetaDataObj).map((rowKey) => {
        let rowValue = csvMetaDataObj[rowKey];
        return (
          <div className={styles.metaDataRow}>
            <div className={styles.metaDataRowKey}>{rowKey}</div>
            <div className={styles.metaDataRowVal}>
              {rowKey === "Sample Rate" ? "500 hertz" : rowValue}
            </div>
          </div>
        );
      })
    );

    setCsvClassificationData(
      csvClassification == null || csvClassification["output"] == null
        ? null
        : csvClassification["output"].map((classification) => {
            start = start + 5000;
            end = end + 5000;
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
    setcurPageIndex(curPageIndex + 1);
  };
  const handlePrev = () => {
    setcurPageIndex(curPageIndex - 1);
  };

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
        <ReportChart
          csvClassification={props.csvClassification}
          curPageIndex={curPageIndex}
        ></ReportChart>
        {props.csvClassification === null ? null : (
          <div>
            <Button onClick={() => handlePrev()} disabled={curPageIndex === 0}>
              <i class="fas fa-arrow-left"></i>
            </Button>{" "}
            <Button
              onClick={() => handleNext()}
              disabled={
                props.csvClassification.output === null ||
                curPageIndex === props.csvClassification.output.length - 1
              }
            >
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
