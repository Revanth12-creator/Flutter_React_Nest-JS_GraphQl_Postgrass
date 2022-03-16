import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useQuery } from "@apollo/client";
import { addDays, format } from 'date-fns';
import { greyForBg } from "../../../assets/colors";
import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { GET_ALL_GROUPS } from "../../../services/GroupService";
import ButtonsAndDurationFieldsMain from '../../get-data/ButtonsAndDurationFieldsMain'

function GroupsMain()
{
  const history = useHistory();
  const [selectedDuration, setSelectedDuration] = useState( 'day' )
  const [fromDate, setFromDate] = useState( format( new Date(), 'yyyy-MM-dd' ) )
  const [toDate, setToDate] = useState(
    format( addDays( new Date(), 1 ), 'yyyy-MM-dd' ),
  )
  const groupData = useQuery( GET_ALL_GROUPS, {
    variables: {
      fromDate: fromDate,
      toDate: toDate,
    },
    fetchPolicy: "network-only",
  } );
  var cardContent = [
    { groupId: "", groupName: "", groupType: "", noOfMembers: 0 },
  ];

  if ( groupData.data ) {
    cardContent.shift();
    groupData.data.findAllGroupsInRange.forEach( function ( item )
    {
      let { id, name, type, groupusers } = item;
      let noOfMembers: number = groupusers.length;
      let newObject = {
        groupId: id,
        groupName: name,
        groupType: type,
        noOfMembers,
      };
      cardContent.push( newObject );
      return cardContent;
    } );
    console.log( "card content", cardContent );
  }

  function clickAction( id, name )
  {
    history.push( {
      pathname: "/group-users",
      search: `?group-name=${ name }`,
      state: { groupName: name, groupId: id },
    } );
  }
  return (
    <>
      <h3 style={{ margin: "0.938rem", textDecoration: "underline" }}>GROUPS</h3>
      <ButtonsAndDurationFieldsMain
        setToDate={setToDate}
        setFromDate={setFromDate}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "50px" }}>
        <Grid container spacing={1}>
          {cardContent.map( function ( item, index )
          {
            const { groupName, groupType, noOfMembers, groupId } = item;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ minHeight: 150 }}
                  style={{ backgroundColor: greyForBg }}
                  onClick={() => clickAction( groupId, groupName )}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom component="div">
                      {groupName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Type:{groupType}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      No Of Members:{noOfMembers}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          } )}
        </Grid>
      </Box>
    </>
  );
}

export default GroupsMain;
