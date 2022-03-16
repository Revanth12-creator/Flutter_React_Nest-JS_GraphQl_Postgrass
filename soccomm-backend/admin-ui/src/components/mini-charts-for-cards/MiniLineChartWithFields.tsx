import React from "react";
import { Line } from "react-chartjs-2";

const lineData = {
  labels: [
    "August",
    "September",
    "October",
    "November",
  ],
  datasets: [
    {
      label: "Post",
      data: [5,13,10,15],
      fill: false,
      backgroundColor: "#ffffff",
      borderColor: "#8cb369",
      tension: 0.5,
    },
    {
      label: "User",
      data: [4,10,14,6],
      fill: false,
      backgroundColor: "#ffffff",
      borderColor: "#9c89b8",
      tension: 0.5,
    },
    {
      label: "Group",
      data: [7,20,14,12],
      fill: false,
      backgroundColor: "#ffffff",
      borderColor: "#f2c57c",
      tension: 0.5,
    },
  ],
};

function MiniLineChartWithFields() {
  return (
    <div>
      <Line
        data={lineData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { display: false, title: { display: false } },
            y: {
              display: false,
              title: { display: false },
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

export default MiniLineChartWithFields;
