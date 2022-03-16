import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  changeFromDate: (date: string) => void;
  changeToDate: (date: string) => void;
};

const MonthPicker: React.FC<Props> = ({ changeFromDate, changeToDate }) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const startDay: string = "-01";
  const thisMonth: string = format(new Date(), "yyyy-MM");
  const nextMonth: string = format(addMonths(new Date(), 1), "yyyy-MM");
  const [thisMonthStarting, setThisMonthStarting] = useState(
    thisMonth.concat(startDay)
  );
  const [nextMonthStarting, setNextMonthStarting] = useState(
    nextMonth.concat(startDay)
  );

  useEffect(() => {
    changeFromDate(thisMonthStarting);
    changeToDate(nextMonthStarting);
  }, [thisMonthStarting, nextMonthStarting]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["year", "month"]}
        label="Month and Year"
        minDate={new Date("2000-03-01")}
        maxDate={new Date("2080-06-01")}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          let dateSelected: string = String(
            newValue?.toLocaleDateString("zh-Hans-CN")
          );
          let selectedDate: Date = new Date(dateSelected);
          let newFromDate: string = format(selectedDate, "yyyy-MM").concat(
            startDay
          );
          let newToDate: string = format(
            addMonths(selectedDate, 1),
            "yyyy-MM"
          ).concat(startDay);
          console.log("new start date", newFromDate, "new end date", newToDate);
          setThisMonthStarting(newFromDate);
          setNextMonthStarting(newToDate);
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

export default MonthPicker;
