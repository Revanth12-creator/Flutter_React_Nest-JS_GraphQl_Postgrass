import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNT_OF_USERS_BY_STATUS } from "../../../services/UserService";
import { useState } from "react";
import { addDays, format } from 'date-fns';
import ActiveAndInactiveUsers from "./bar-graph/ActiveAndInactiveUsers";
import ButtonsAndDurationFieldsMain from '../../get-data/ButtonsAndDurationFieldsMain'

function UsersMain()
{
  var count: number[] = [];
  const [selectedDuration, setSelectedDuration] = useState( 'day' )
  const [fromDate, setFromDate] = useState( format( new Date(), 'yyyy-MM-dd' ) )
  const [toDate, setToDate] = useState(
    format( addDays( new Date(), 1 ), 'yyyy-MM-dd' ),
  )
  const countOfUsers = useQuery( GET_COUNT_OF_USERS_BY_STATUS,{
    variables: {
      fromDate: fromDate,
      toDate: toDate,
    }, 
  });

  if ( countOfUsers.data ) {
    count = [].concat( ...countOfUsers.data.getCountOfActiveAndInactiveUsers );
    console.log(
      "count is",
      count,
      countOfUsers.data.getCountOfActiveAndInactiveUsers
    );
  }
  console.log( "active users", countOfUsers );
  return (
    <div>
      <h3 style={{ margin: "0.938rem", textDecoration: "underline" }}>USERS</h3>
      <ButtonsAndDurationFieldsMain
        setToDate={setToDate}
        setFromDate={setFromDate}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />
      <ActiveAndInactiveUsers graphValues={count} fromDate={fromDate} toDate={toDate} />
    </div>
  );
}

export default UsersMain;
