import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AnalyticsInformation from "./bar-chart/AnalyticsInformation";

function AnalyticsMain() {
  const buttons = [
    <Button key="week">Week</Button>,
    <Button key="day">Day</Button>,
    <Button key="month">Month</Button>,
    <Button key="quarter">Quarter</Button>,
    <Button key="year">Year</Button>,
  ];

  return (
    <div>
      <ButtonGroup
        size="small"
        aria-label="small button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
      <AnalyticsInformation
        width={700}
        height={400}
        displayLegend={true}
        displayScales={true}
      />
    </div>
  );
}

export default AnalyticsMain;
