import React from "react";
import { Bar } from "react-chartjs-2";

function MiniBarChart() {
  const dataBar = {
    labels: [
      "Goods",
      "Services",
      "Rentals",
      "Finance",
      "Informational",  
    ],
    datasets: [
      {
        label: "No of posts",
        backgroundColor: [
          "#feeafa",
          "#fff3b0",
          "#e0aaff",
          "#ffcbf2",          
          "#edafb8",
        ],
        borderColor: [
          "#111111",
          "#111111",
          "#111111",
          "#111111",
          "#111111",
        ],
        hoverBackgroundColor: [
          "#ff8080",
          "#4dff4d",
          "#cc99ff",
          "#1ab2ff",         
          "#ffff00",
        ],
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <div>
      <Bar
        data={dataBar}
        options={{
          maintainAspectRatio: false,
          responsive: true,
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

export default MiniBarChart;
