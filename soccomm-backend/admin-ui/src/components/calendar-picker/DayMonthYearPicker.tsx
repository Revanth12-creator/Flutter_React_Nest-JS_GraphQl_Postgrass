import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { addDays } from "date-fns";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type Props = {
  changeFromDate: (date: string) => void;
  changeToDate: (date: string) => void;
};

const DayMonthYearPicker: React.FC<Props> = ({
  changeFromDate,
  changeToDate,
}) => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [day, setDay] = useState(format(new Date(), "yyyy-MM-dd"));
  const [nextDay, setNextDay] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );

  useEffect(() => {
    changeFromDate(day);
    changeToDate(nextDay);
  }, [day, nextDay]);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["day", "month", "year"]}
        label="Day Month Year"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          let dateSelected: string = String(
            newValue?.toLocaleDateString("zh-Hans-CN")
          );
          let selectedDate: Date = new Date(dateSelected);
          let newFromDate: string = format(selectedDate, "yyyy-MM-dd");
          let newToDate: string = format(
            addDays(selectedDate, 1),
            "yyyy-MM-dd"
          );
          console.log("from date", newFromDate, "toDate", newToDate);
          setDay(newFromDate);
          setNextDay(newToDate);
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
        inputFormat="d MMM yyyy"
      />
    </LocalizationProvider>
  );
};

export default DayMonthYearPicker;
