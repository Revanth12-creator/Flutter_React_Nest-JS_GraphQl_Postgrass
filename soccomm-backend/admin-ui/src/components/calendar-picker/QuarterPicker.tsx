import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { QuarterType } from "../../types";

type Props = {
  changeFromDate: (date: string) => void;
  changeToDate: (date: string) => void;
};
const QuarterPicker: React.FC<Props> = ({ changeFromDate, changeToDate }) => {
  const [year, setYear] = useState(format(new Date(), "yyyy"));
  let currentQuarterIndex: number =
    Math.floor((new Date().getMonth() + 3) / 3) - 1;
  var startingDay: string = "-01";
  const allQuarters: QuarterType[] = [
    {
      name: "Q1-Jan,Feb,Mar",
      thisQuarterStartDate: year + "-01" + startingDay,
      nextQuarterStartDate: year + "-04" + startingDay,
    },
    {
      name: "Q2-Apr,May,Jun",
      thisQuarterStartDate: year + "-04" + startingDay,
      nextQuarterStartDate: year + "-07" + startingDay,
    },
    {
      name: "Q3-Jul,Aug,Sept",
      thisQuarterStartDate: year + "-07" + startingDay,
      nextQuarterStartDate: year + "-10" + startingDay,
    },
    {
      name: "Q4-Oct,Nov,Dec",
      thisQuarterStartDate: year + "-10" + startingDay,
      nextQuarterStartDate:
        (parseInt(year) + 1).toString() + "-01" + startingDay,
    },
  ];
  const [quarter, setQuarter] = useState(allQuarters[currentQuarterIndex].name);
  const [indexOfQuarterChosen, setIndexOfQuarterChosen] =
    useState(currentQuarterIndex);
  const [thisQuarterStarting, setThisQuarterStarting] = useState(
    allQuarters[currentQuarterIndex].thisQuarterStartDate
  );
  const [nextQuarterStarting, setNextQuarterStarting] = useState(
    allQuarters[currentQuarterIndex].nextQuarterStartDate
  );
  var allYears: number[] = [];

  useEffect(() => {
    changeFromDate(thisQuarterStarting);
    changeToDate(nextQuarterStarting);
  }, []);

  const handleChangeOfQuarter = (event: SelectChangeEvent) => {
    console.log("values is", event.target.value);
    let indexOfChosenQuarter: number = allQuarters.findIndex(
      (item) => item.name === event.target.value
    );
    setIndexOfQuarterChosen(indexOfChosenQuarter);
    console.log(allQuarters[indexOfChosenQuarter].name);
    setQuarter(allQuarters[indexOfChosenQuarter].name);
    setThisQuarterStarting(
      allQuarters[indexOfChosenQuarter].thisQuarterStartDate
    );
    setNextQuarterStarting(
      allQuarters[indexOfChosenQuarter].nextQuarterStartDate
    );
    changeFromDate(allQuarters[indexOfChosenQuarter].thisQuarterStartDate);
    changeToDate(allQuarters[indexOfChosenQuarter].nextQuarterStartDate);
  };

  const handleChangeOfYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
    console.log("index of quarter", indexOfQuarterChosen, event.target.value);
    console.log(
      "start dates",
      allQuarters[indexOfQuarterChosen].thisQuarterStartDate
    );
    //as setYear is asynchronous, thisQuarterDate in allQuarters array is taking old value of year as selected year, so pass the correct year value to parent component
    let startDate: string =
      String(event.target.value) +
      allQuarters[indexOfQuarterChosen].thisQuarterStartDate.substring(4, 10);
    var nextStartDate: string = "";
    if (indexOfQuarterChosen === 3) {
      nextStartDate =
        (parseInt(event.target.value) + 1).toString() +
        allQuarters[indexOfQuarterChosen].nextQuarterStartDate.substring(4, 10);
    } else {
      nextStartDate =
        parseInt(event.target.value).toString() +
        allQuarters[indexOfQuarterChosen].nextQuarterStartDate.substring(4, 10);
    }
    console.log("start date", startDate, "next start", nextStartDate);
    changeFromDate(startDate);
    changeToDate(nextStartDate);
  };

  function getallYearsForDropDown() {
    let i: number = 1900;
    for (i = 1900; i <= 2099; i++) {
      allYears.push(i);
    }
  }

  getallYearsForDropDown();

  return (
    <span style={{ display: "flex" }}>
      <Box sx={{ minWidth: 170 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quarter}
            label="Quarter"
            onChange={(event: SelectChangeEvent) => {
              handleChangeOfQuarter(event);
            }}
          >
            {allQuarters.map(function (item, index) {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={(event: SelectChangeEvent) => {
              handleChangeOfYear(event);
            }}
          >
            {allYears.map(function (item, index) {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </span>
  );
};
export default QuarterPicker;
