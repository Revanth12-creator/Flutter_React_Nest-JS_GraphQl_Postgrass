import React from "react";
// import MiniPieChart from "../../components/mini-charts-for-cards/MiniPieChart";
import MiniBarChart from "../../components/mini-charts-for-cards/MiniBarChart";
import MiniDoughnutChart from "../../components/mini-charts-for-cards/MiniDoughnutChart";
import MiniLineChart from "../../components/mini-charts-for-cards/MiniLineChart";
import MiniLineChartWithFields from "../../components/mini-charts-for-cards/MiniLineChartWithFields";
// import AnalyticsInformation from "../../components/dashboard-content/analytics/bar-chart/AnalyticsInformation";

const dashboardItemsList = [
  {
    text: "Posts",
    url: "/posts-information",
    miniChart: <MiniBarChart />,
  },
  {
    text: "Groups",
    url: "/groups-information",
    miniChart: <MiniDoughnutChart />,
  },
  // {
  //   text: "Transaction",
  //   url: "/transactions-information",
  //   miniChart: <MiniPieChart />,
  // },
  {
    text: "Users",
    url: "/users-information",
    miniChart: <MiniLineChart />,
  },

  // {
  //   text: "Analytics",
  //   url: "/analytics-information",
  //   miniChart: (
  //     <AnalyticsInformation
  //       width={200}
  //       height={200}
  //       displayLegend={false}
  //       displayScales={false}
  //     />
  //   ),
  // },
  {
    text: "Summary",
    url: "/summary",
    miniChart: <MiniLineChartWithFields />,
  },
];

export default dashboardItemsList;
