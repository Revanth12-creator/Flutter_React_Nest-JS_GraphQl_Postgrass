import React from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

type Props = {
  graphValues: number[];
  fromDate:string;
  toDate:string;
};

const ActiveAndInactiveUsers: React.FC<Props> = ({ graphValues, fromDate, toDate }) => {
  const history = useHistory();
  var isActive: boolean = false;
  var selectedField: string = "";

  const barData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "No of Users",
        backgroundColor: ["#ffd9b3", "#ccffcc"],
        data: graphValues,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={barData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { display: true },
            y: {
              display: true,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
        width={700}
        height={400}
        getElementAtEvent={(data, index) => {
          console.log("clicked", data);
          data.forEach(function (item) {
            let index: number = item["index"];
            console.log("line data", index, barData.labels[index]);
            selectedField = barData.labels[index];
          });
          if (selectedField === "Active") {
            isActive = true;
          } else isActive = false;
          history.push({
            pathname: "/users-details",
            search: `?status=${selectedField}`,
            state: { isActive, status: selectedField,fromDate, toDate },
          });
        }}
      />
    </div>
  );
};

export default ActiveAndInactiveUsers;
