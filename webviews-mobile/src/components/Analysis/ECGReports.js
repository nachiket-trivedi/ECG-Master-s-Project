import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Table
} from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import ReportChart from "./ReportChart";
import styles from "../../styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

const ECGReports = props => {
  const [curPageIndex, setcurPageIndex] = useState(0);
  const [csvMetaData, setCsvMetaData] = useState(null);
  const [csvClassificationData, setCsvClassificationData] = useState(null);

  useEffect(() => {
    let csvMetaDataObj = props.csvMetaDataObj;
    let csvClassification = props.csvClassification;
    let start = -5000,
      end = -1;

    setCsvMetaData(
      Object.keys(csvMetaDataObj).map(rowKey => {
        let rowValue = csvMetaDataObj[rowKey];
        return (
          <tr className={styles.metaDataRow}>
            <td className={styles.metaDataRowKey}>{rowKey}</td>
            <td className={styles.metaDataRowVal}>
              {rowKey === "Sample Rate" ? "500 hertz" : rowValue}
            </td>
          </tr>
        );
      })
    );

    setCsvClassificationData(
      csvClassification == null || csvClassification["output"] == null
        ? null
        : csvClassification["output"].map(classification => {
            start = start + 5000;
            end = end + 5000;
            return (
              <tr scope="row" className={styles.metaDataRow}>
                <td className={styles.metaDataRowKey}>
                  {start} to {end}
                </td>
                <td className={styles.metaDataRowVal}>{classification}</td>
              </tr>
            );
          })
    );
  }, [
    JSON.stringify(props.csvMetaDataObj),
    JSON.stringify(props.csvClassification)
  ]);
  const handleNext = () => {
    setcurPageIndex(curPageIndex + 1);
  };
  const handlePrev = () => {
    setcurPageIndex(curPageIndex - 1);
  };

  return (
    <div>
      <h5 className={styles.headingText}>ECG Reports</h5>
      <hr />
      <br />
      <div className={styles.metaDatasContainer}>
        {csvMetaData === null || csvMetaData.length === 0 ? null : (
          <Card className={styles.classificationDataCard}>
            <center>
              <Card.Title>Report Details</Card.Title>
            </center>
            <br />
            <Table borderless>
              <tbody>{csvMetaData}</tbody>
            </Table>
          </Card>
        )}
        {csvClassificationData === null ||
        csvClassificationData.length === 0 ? null : (
          <Card className={styles.classificationDataCard}>
            <center>
              <Card.Title>Classification Analysis</Card.Title>
            </center>
            <br />
            <Table borderless>
            <tbody>{csvClassificationData}</tbody>
            </Table>
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
