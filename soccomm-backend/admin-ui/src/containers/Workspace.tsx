import React from "react";
import { format } from "date-fns";
import { useState, useEffect } from 'react';

export default function Workspace()
{ 
  const [loginDate] = useState(localStorage.getItem( "lastLogin" )); 
  const [login]=useState(String(loginDate));
  const [lastLogin,setLastLogin]=useState("");
  console.log("login date",loginDate,"login is",login)

  useEffect(() => {
    if(login!=="null"){
      let date=Date.parse(login)
      console.log("date is",date)
      setLastLogin(format(date, 'EEEE,MMMM do, yyyy hh:mm a'));
      console.log("in if",{lastLogin},"local storage",localStorage.getItem( "lastLogin" ),"login string",login );
    }
   else{
    setLastLogin(format(new Date(), 'EEEE,MMMM do, yyyy hh:mm a'));   
    console.log("in else",{lastLogin},"local storage",localStorage.getItem( "lastLogin" ),"login string",login )
   } 
   console.log( "lastLogin is",lastLogin,"login date is",loginDate,"login date 2",login)   
  },[lastLogin]);  
  
  return (
    <div style={{ textAlign: "center", marginTop: "6vh" }}>
      <h3 style={{fontSize:"3rem",color:"#52b69a"}}>Welcome {localStorage.getItem( "userName" )}</h3>     
        <h3 style={{marginTop: "3vh",fontWeight:500,color:"#52b69a"}}>
          Your last login was on {lastLogin}
        </h3>       
    </div>
  );
}
