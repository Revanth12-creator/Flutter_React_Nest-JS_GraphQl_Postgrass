import Button from "@mui/material/Button";
import MonthPicker from "../calendar-picker/MonthPicker";
import WeekPicker from "../calendar-picker/WeekPicker";
import YearPicker from "../calendar-picker/YearPicker";
import DayMonthYearPicker from "../calendar-picker/DayMonthYearPicker";
import QuarterPicker from "../calendar-picker/QuarterPicker";

function getButtons(changeSelectedDuration: (duration: string) => void) {
  const buttons: JSX.Element[] = [
    <Button key="day" onClick={() => changeSelectedDuration("day")}>
      Day
    </Button>,
    <Button key="week" onClick={() => changeSelectedDuration("week")}>
      Week
    </Button>,
    <Button key="month" onClick={() => changeSelectedDuration("month")}>
      Month
    </Button>,
    <Button key="quarter" onClick={() => changeSelectedDuration("quarter")}>
      Quarter
    </Button>,
    <Button key="year" onClick={() => changeSelectedDuration("year")}>
      Year
    </Button>,
  ];
  return { buttons };
}

function getDurationFields(
  selectedDuration: string,
  changeFromDate: (fromDate: string) => void,
  changeToDate: (toDate: string) => void
) {
  if (selectedDuration === "day")
    return (
      <DayMonthYearPicker
        changeFromDate={changeFromDate}
        changeToDate={changeToDate}
      />
    );
  else if (selectedDuration === "week")
    return (
      <WeekPicker changeFromDate={changeFromDate} changeToDate={changeToDate} />
    );
  else if (selectedDuration === "month")
    return (
      <MonthPicker
        changeFromDate={changeFromDate}
        changeToDate={changeToDate}
      />
    );
  else if (selectedDuration === "quarter")
    return (
      <QuarterPicker
        changeFromDate={changeFromDate}
        changeToDate={changeToDate}
      />
    );
  else if (selectedDuration === "year")
    return (
      <YearPicker changeFromDate={changeFromDate} changeToDate={changeToDate} />
    );
}

export { getButtons, getDurationFields };
