import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  let csvContentArr =
    JSON.parse(localStorage.getItem("csvContentArr")) == null
      ? []
      : JSON.parse(localStorage.getItem("csvContentArr"));
  let indexArr = Object.keys(csvContentArr);
  indexArr = indexArr.slice(1, 1000);
  csvContentArr = csvContentArr.slice(1, 1000);
  //   let csvContentArr = [1, 2, 3, 8, 9, 0, 7];
  //   let indexArr = [1, 2, 3, 8, 9, 0, 7];

  let options = {
    chart: {
      id: "basic-line",
    },
    stroke: {
      show: true,
      //   curve: ["smooth", "straight", "stepline"],
      lineCap: "square",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    xaxis: {
      categories: indexArr,
      show: false,
    },
  };
  let series = [
    {
      name: "ecg",
      data: csvContentArr,
      show: false,
    },
  ];
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart" style={{ overflow: "auto" }}>
          <Chart
            options={options}
            series={series}
            type="line"
            height="350"
            width={csvContentArr.length * 10}
            width="900px"
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
