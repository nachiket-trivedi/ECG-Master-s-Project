import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

const ReportChart = (props) => {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  const [csvClassification, setCsvClassification] = useState([]);

  useEffect(() => {
    // console.log("csvClassification", csvClassification);
    if (props.csvClassification !== null) {
      if (csvClassification.length === 0) {
        //todo: to update here if user uploads diff file without refreshing
        setCsvClassification(
          props.csvClassification === null ||
            props.csvClassification["ecg_signal"] === undefined ||
            props.csvClassification["ecg_signal"].length === 0 ||
            props.curPageIndex < 0 ||
            props.curPageIndex >= props.csvClassification["ecg_signal"].length
            ? []
            : props.csvClassification["ecg_signal"]
        );
      }
      // console.log(
      //   "curPageIndex",
      //   props.curPageIndex,
      //   "props.csvClassification",
      //   props.csvClassification === null
      //     ? ""
      //     : props.csvClassification["ecg_signal"][props.curPageIndex][0]
      // );
      let csvClassificationPoints = csvClassification[props.curPageIndex];
      let csvClassificationClass =
        props.csvClassification === null ||
        props.csvClassification["output"] === undefined ||
        props.csvClassification["output"].length === 0 ||
        props.curPageIndex < 0 ||
        props.curPageIndex >= props.csvClassification["output"].length
          ? []
          : props.csvClassification["output"][props.curPageIndex];

      setData({
        labels: csvClassificationPoints,
        datasets: [
          {
            label:
              csvClassificationClass.length === 0
                ? ""
                : "Classification: " + csvClassificationClass,
            data: csvClassificationPoints,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",

            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 1,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 1,
            lineTension: 0,
          },
        ],
      });

      setOptions({
        // animation: false,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
        },
      });
    }
  }, [props.curPageIndex, props.csvClassification, csvClassification]);

  return (
    <div>
      {props.csvClassification === null ? null : (
        <div style={{ overflow: "auto" }}>
          ECG Chart
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ReportChart;
