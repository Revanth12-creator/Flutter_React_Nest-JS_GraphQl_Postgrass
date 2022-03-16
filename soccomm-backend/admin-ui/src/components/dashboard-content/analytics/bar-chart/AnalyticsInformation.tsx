import React from "react";
import { Bar } from "react-chartjs-2";

type Props = {
  width: number;
  height: number;
  displayLegend: boolean;
  displayScales: boolean;
};

const AnalyticsInformation: React.FC<Props> = ({
  width,
  height,
  displayLegend,
  displayScales,
}) => {
  const dataBar = {
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
        label: "August",
        backgroundColor: ["#cc66ff"],
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
          "#ff3300",
          "#888844",
          "#ffff00",
        ],
        borderWidth: 1,
        data: [20, 30, 84, 81, 32, 15],
      },
      {
        label: "September",
        backgroundColor: ["#00b3b3"],
        borderColor: [
          "#ff3400",
          "#003910",
          "#4d3099",
          "#0288cc",
          "#455422",
          "#988900",
        ],
        hoverBackgroundColor: [
          "#ff3300",
          "#00cc00",
          "#6600cc",
          "#ff3300",
          "#888844",
          "#ffff00",
        ],
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
  };
 
  return (
    <div>
      {/* <h2>Analytics information </h2> */}
      <Bar
        data={dataBar}
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
      />
    </div>
  );
};

export default AnalyticsInformation;
