import React from "react";
import { Pie } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import LineGraphForCategoryDetails from "../line-chart/LineGraphForCategoryDetails";

type Props = {
  width: number;
  height: number;
  displayLegend: boolean;
  displayScales: boolean;
};

const PieChartForAnalysisOfTransaction: React.FC<Props> = ({
  width,
  height,
  displayLegend,
  displayScales,
}) => {
  const firstRender = useRef(true);
  const [category, setCategory] = React.useState("");

  const pieData = {
    labels: [
      "Product sale/purchase",
      "Food sharing",
      "Rent/Borrow",
      "Donation",
      "Service offer",
      "Loan offer",
    ],
    datasets: [
      {
        label: "No of transactions",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "#ccffcc",
          "#e6ccff",
          "rgba(75, 192, 192, 0.2)",
          "#ddddbb",
          "#ffff99",
        ],
        borderColor: [
          "#ff3300",
          "#009900",
          "#4d0099",
          "#0088cc",
          "#444422",
          "#999900",
        ],
        hoverBackgroundColor: [
          "#ff3300",
          "#00cc00",
          "#6600cc",
          "#1ab2ff",
          "#888844",
          "#ffff00",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (firstRender.current === true) {
      console.log("first render");
      firstRender.current = false;
    } else if (firstRender.current === false) {
      console.log("not firstRender");
    }
  }, [category]);

  return (
    <div>
      <Pie
        data={pieData}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          scales: {
            x: { display: displayScales },
            y: {
              display: displayScales,
            },
          },
          plugins: {
            legend: {
              display: displayLegend,
            },
          },
        }}
        width={width}
        height={height}
        getElementAtEvent={(data, index) => {
          data.forEach(function (item) {
            let indexOfCategoryClicked = item["index"];
            console.log("pie data", pieData.labels[indexOfCategoryClicked]);
            setCategory(pieData.labels[indexOfCategoryClicked]);
          });
        }}
      />

      {firstRender.current === false ? (
        <>
          <LineGraphForCategoryDetails category={category} />
        </>
      ) : null}
    </div>
  );
};

export default PieChartForAnalysisOfTransaction;
