import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import csvToJson from "convert-csv-to-json";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import styles from "../../styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json",
  },
};
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadECG = (props) => {
  const [fileNames, setFileNames] = useState(null);
  let fileReader;

  const handleFileRead = () => {
    const csvContent = fileReader.result;
    let csvContentArr = csvContent.split("\n");
    let csvMetaDataArr = csvContentArr.slice(0, 13);
    csvContentArr = csvContentArr.slice(13, csvContentArr.length - 1);
    // console.log("csvContentArr", csvContentArr);
    // console.log("csvMetaDataArr", csvMetaDataArr);
    let csvMetaDataObj = {};
    for (let i in csvMetaDataArr) {
      let row = csvMetaDataArr[i];
      if (row != null) {
        let fieldKey = row.split(",")[0];
        let fieldValue = row.split(",").slice(1).join().replace(/\"/g, "");
        if (fieldValue != null && fieldValue != "") {
          csvMetaDataObj[fieldKey] = fieldValue;
        }
      }
    }
    props.setCsvMetaDataObj(csvMetaDataObj);
    let data = {
      data: csvContentArr,
    };

    axios.defaults.withCredentials = false;
    axios
      .post("http://35.192.221.5:3000/inference", data)
      .then((response) => {
        props.setCsvClassification(response.data);
      })
      .catch(function (err) {
        console.log("inference err: ", err);
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onloadend = handleFileRead;
    });
    setFileNames(
      acceptedFiles.map((file) => {
        return (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        );
      })
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      {/* <h2 className={styles.headingText}>ECG Analysis</h2>
      <hr />
      <br /> */}
       <h5 className={styles.headingText}>
        Upload ECG Reports to get quick analysis
      </h5>
      <br />
      {/* <div className="container"> */}
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p> Click to select your csv file</p>
        </div>
        <br />
        <div>{fileNames}</div>
      {/* </div> */}
      <br />
      <br /> 
    </div>
  );
};

export default UploadECG;