import React from "react";
import { Doughnut } from "react-chartjs-2";

function MiniDoughnutChart() {
  const data = {
    labels: ["Private", "Public"],
    datasets: [
      {
        label: "Group",
        data: [12, 19],
        backgroundColor: ["#bde0fe", "#eddcd2"],
        hoverBackgroundColor: ["#ffffff", "#4895ef"],
        borderColor: ["#111111", "#111111"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={data}
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

export default MiniDoughnutChart;
