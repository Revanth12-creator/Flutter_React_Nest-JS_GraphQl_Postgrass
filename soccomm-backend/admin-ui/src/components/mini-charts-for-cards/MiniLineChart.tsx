import React from "react";
import { Line } from "react-chartjs-2";

const lineData = {
  labels: [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ],
  datasets: [
    {
      label: "No of Users",
      backgroundColor: "#ffffff",
      borderColor: "#8cb369",
      fill: false,
      data: [10, 45, 23, 49, 31, 46, 32, 26, 49],
      tension: 0.5,
    },
  ],
};

function MiniLineChart() {
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

export default MiniLineChart;
