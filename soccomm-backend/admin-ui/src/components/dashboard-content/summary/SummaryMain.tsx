import React from "react";
import CountOfFields from "./count/CountOfFields";
import AllFieldsGraph from "./line-chart/AllFieldsGraph";

function SummaryMain() {
  return (
    <>
     <h3 style={{margin:"5px",textDecoration:"underline"}}>SUMMARY</h3>
      <CountOfFields />
      <AllFieldsGraph />
    </>
  );
}

export default SummaryMain;
