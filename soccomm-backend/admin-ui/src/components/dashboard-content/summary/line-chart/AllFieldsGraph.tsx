import React from "react";
import { Line } from "react-chartjs-2";
import getMonths from "../get-data/Months";
import { POST_COUNT_FOR_MONTHS } from "../../../../services/PostService";
import { USER_COUNT_FOR_MONTHS } from "../../../../services/UserService";
import { GROUP_COUNT_FOR_MONTHS } from "../../../../services/GroupService";
import { useQuery } from "@apollo/client";

const AllFieldsGraph: React.FC = () => {
  var { monthsForLabels, monthsArray } = getMonths();
  var postGraphValues: number[] = [];
  var userGraphValues: number[] = [];
  var groupGraphValues: number[] = [];
  console.log("previous months", monthsForLabels, monthsArray);
  const postCount = useQuery(POST_COUNT_FOR_MONTHS, {
    variables: {
      monthsArray: monthsArray,
    },
  });
  const userCount = useQuery(USER_COUNT_FOR_MONTHS, {
    variables: {
      monthsArray: monthsArray,
    },
  });
  const groupCount = useQuery(GROUP_COUNT_FOR_MONTHS, {
    variables: {
      monthsArray: monthsArray,
    },
    fetchPolicy: "network-only",
  });

  if (
    postCount.data !== undefined &&
    userCount.data !== undefined &&
    groupCount.data !== undefined
  ) {
    postGraphValues = [
      ...postGraphValues,
      ...postCount.data.getPostCountForGraph,
    ];
    userGraphValues = [
      ...userGraphValues,
      ...userCount.data.getUserCountForGraph,
    ];
    groupGraphValues = [
      ...groupGraphValues,
      ...groupCount.data.getGroupCountForGraph,
    ];
  }

  const lineData = {
    labels: monthsForLabels,
    datasets: [
      {
        label: "Post",
        data: postGraphValues,
        fill: false,
        backgroundColor: "#ffd6cc",
        borderColor: "#ff3300",
        tension: 0.5,
      },
      {
        label: "User",
        data: userGraphValues,
        fill: false,
        backgroundColor: "#ffccff",
        borderColor: "#742774",
        tension: 0.5,
      },
      {
        label: "Group",
        data: groupGraphValues,
        fill: false,
        backgroundColor: "#ddff99",
        borderColor: "#669900",
        tension: 0.5,
      },
    ],
  };

  return (
    <div>
      <Line
        data={lineData}
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
            title: {
              display: true,
              text: `Latest 4 months data`,
            },
          },
        }}
        width={800}
        height={400}
      />
    </div>
  );
};

export default AllFieldsGraph;
