import React from "react";
import { Pie } from "react-chartjs-2";

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
      label: "Number of transactions",
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
        "#ff8080",
        "#4dff4d",
        "#cc99ff",
        "#1ab2ff",
        "#c3c388",
        "#ffff00",
      ],
      borderWidth: 1,
    },
  ],
};

function MiniPieChart() {
  return (
    <div>
      <Pie
        data={pieData}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          scales: {
            x: { display: false },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        width={200}
        height={200}
      />
    </div>
  );
}

export default MiniPieChart;
