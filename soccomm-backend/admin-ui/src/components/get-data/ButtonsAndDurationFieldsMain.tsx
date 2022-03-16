import React from 'react'
import {
  getButtons,
  getDurationFields,
} from "./GetDurationFieldsAndButtons";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";

type Props = {
    setToDate:(date:string)=>void;
    setFromDate:(date:string)=>void;
    selectedDuration:string;
    setSelectedDuration:(duration:string)=>void;
};

const ButtonsAndDurationFieldsMain: React.FC<Props> = ({
    setToDate,
    setFromDate,
    selectedDuration,
    setSelectedDuration,
  }) =>  {
   function changeToDate(date: string) {
    setToDate(date);
  }

  function changeFromDate(date: string) {
    setFromDate(date);
  }

  function changeSelectedDuration(duration: string) {
    setSelectedDuration(duration);
  }

  const { buttons } = getButtons(changeSelectedDuration);

 return(
     <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>        
          <Grid item xs={12} sm={12} md={5} key="buttons">
           <ButtonGroup        
           size="small"
           aria-label="small button group"
           variant="contained"
           color="primary"
           style={{ marginLeft: "1.875rem" }}          
           >
            {buttons}
           </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={3} key="durationFields">
            <div style={{ marginLeft: "1.875rem" }}  >
            {getDurationFields(selectedDuration, changeFromDate, changeToDate)}
            </div> 
          </Grid>
        </Grid>          
      </Box> 
 )   
}

export default ButtonsAndDurationFieldsMain;
