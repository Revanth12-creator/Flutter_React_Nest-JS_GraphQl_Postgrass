import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import PickersDay, { PickersDayProps } from "@mui/lab/PickersDay";
import { useState, useEffect } from "react";
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isWithinInterval,
} from "date-fns";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

type Props = {
  changeFromDate: (date: string) => void;
  changeToDate: (date: string) => void;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const WeekPicker: React.FC<Props> = ({ changeFromDate, changeToDate }) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const thisWeek: string = format(new Date(), "yyyy-MM-dd");
  const nextWeek: string = format(
    addDays(endOfWeek(new Date()), 1),
    "yyyy-MM-dd"
  );
  const [thisWeekStarting, setThisWeekStarting] = useState(thisWeek);
  const [nextWeekStarting, setNextWeekStarting] = useState(nextWeek);

  useEffect(() => {
    changeFromDate(thisWeekStarting);
    changeToDate(nextWeekStarting);
  }, [thisWeekStarting, nextWeekStarting]);

  function renderWeekPickerDay(
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    const start = startOfWeek(value);
    const end = endOfWeek(value);
    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Week"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          let dateSelected: string = String(
            newValue?.toLocaleDateString("zh-Hans-CN")
          );
          let selectedDate: Date = new Date(dateSelected);
          let newFromDate: string = format(startOfWeek(selectedDate), "yyyy-MM-dd");
          let newToDate: string = format(
            addDays(endOfWeek(selectedDate), 1),
            "yyyy-MM-dd"
          );
          console.log("from date", newFromDate, "toDate", newToDate);
          setThisWeekStarting(newFromDate);
          setNextWeekStarting(newToDate);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d yyyy"
      />
    </LocalizationProvider>
  );
};

export default WeekPicker;
