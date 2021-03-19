import React from "react";
import { Line, Bar } from "react-chartjs-2";

const ReportChart = (props) => {
  let csvContentArr =
    props.csvContentArr === null || props.csvContentArr.length == 0
      ? []
      : props.csvContentArr.slice(props.curPageStart, props.curPageStart + 999);

  let csvClassification =
    props.csvClassification === null ||
    props.csvClassification.length === 0 ||
    props.curClassIndex < 0 ||
    props.curClassIndex >= props.csvClassification["output"].length
      ? []
      : props.csvClassification["output"][props.curClassIndex];

  console.log("props.csvContentArr", props.csvContentArr);

  let data = {
    labels: csvContentArr,
    datasets: [
      {
        label:
          csvClassification.length === 0
            ? ""
            : "Classification: " + csvClassification,
        data: csvContentArr,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",

        fill: false,
        lineTension: 0.1,
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
  };
  let options = {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
    },
  };
  return (
    <div>
      {csvContentArr.length === 0 ? null : (
        <div style={{ overflow: "auto" }}>
          ECG Chart
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ReportChart;
