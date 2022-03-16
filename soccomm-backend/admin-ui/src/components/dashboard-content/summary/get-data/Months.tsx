import { MonthsArrayType } from "../../../../types";
import { subMonths, format } from "date-fns";

function getMonths() {
  var monthsForLabels: string[] = new Array(4);
  var months: string[] = new Array(4);
  var monthsArray: MonthsArrayType[] = [];
  let fromDate: string = "";
  let toDate: string = "";
  let startDay: string = "-01";
  for (let i = 0; i < months.length; i++) {
    monthsForLabels[i] = format(
      subMonths(new Date(), months.length - (i + 1)),
      "MMMM"
    );
    months[i] = format(
      subMonths(new Date(), months.length - (i + 1)),
      "yyyy-MM"
    );
  }
  months.map(async (value, index, elements) => {
    if (index === months.length - 1) {
      if (value.substring(5, 7) === "12") {
        let nextYear: string = String(parseInt(value.substring(0, 4)) + 1);
        toDate = nextYear + startDay + startDay;
      } else {
        let nextMonth: string =
          "-" + String(parseInt(value.substring(5, 7)) + 1);
        toDate = value.substring(0, 4) + nextMonth + startDay;
      }
    } else {
      toDate = elements[index + 1] + startDay;
    }
    fromDate = value.concat(startDay);
    monthsArray[index] = { fromDate, toDate };
  });  
  return { monthsForLabels, monthsArray };
}

export default getMonths;
