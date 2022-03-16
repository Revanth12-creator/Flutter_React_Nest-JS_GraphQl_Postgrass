import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { addYears, format } from "date-fns";
import { useState, useEffect } from "react";

type Props = {
  changeFromDate: (date: string) => void;
  changeToDate: (date: string) => void;
};

const YearPicker: React.FC<Props> = ({ changeFromDate, changeToDate }) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const startMonthAndDay: string = "-01-01";
  const thisYear: string = format(new Date(), "yyyy");
  const nextYear: string = format(addYears(new Date(), 1), "yyyy");
  const [thisYearStarting, setThisYearStarting] = useState(
    thisYear.concat(startMonthAndDay)
  );
  const [nextYearStarting, setNextYearStarting] = useState(
    nextYear.concat(startMonthAndDay)
  );

  useEffect(() => {
    changeFromDate(thisYearStarting);
    changeToDate(nextYearStarting);
  }, [thisYearStarting, nextYearStarting]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["year"]}
        label="Year"
        value={value}
        minDate={new Date()}
        onChange={(newValue) => {
          setValue(newValue);
          console.log("new value", newValue);
          let dateSelected: string = String(
            newValue?.toLocaleDateString("zh-Hans-CN")
          );
          let selectedDate: Date = new Date(dateSelected);
          console.log("date selected", dateSelected);
          let newFromDate: string = dateSelected
            .substring(0, 4)
            .concat(startMonthAndDay);
          console.log("substring", dateSelected.substring(0, 4));
          let newToDate: string = format(
            addYears(selectedDate, 1),
            "yyyy"
          ).concat(startMonthAndDay);
          console.log("new start date", newFromDate, "new end date", newToDate);
          setThisYearStarting(newFromDate);
          setNextYearStarting(newToDate);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={null}
            onClick={() => console.log("clicked", params)}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default YearPicker;
