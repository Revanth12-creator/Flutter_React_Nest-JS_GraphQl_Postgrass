import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@mui/material";
import { SettingsPower } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { Switch } from "@material-ui/core";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const allGroup = gql`
  query{
  allgroup{
    id
    name
    type
    isactive
  }
}
`;

const UPDATE_GROUP = gql`
mutation updateGroup($id:String!,$isactive:Boolean){   
  updateGroup(updateGroupInput:{
    id:$id
  isactive:$isactive
  }){
    __typename
  }
}
`;

export default function ManageGroups( props )
{
  const [open, setOpen] = React.useState( false );
  const [confirmOpen, setConfirmOpen] = useState( false );
  const [checked, setChecked] = useState( true );
  const [gId, setGid] = useState( "" );  
  const { data, refetch } = useQuery( allGroup, { fetchPolicy: "network-only" } );
  const [updateGroup1] = useMutation( UPDATE_GROUP );
  var tableData: Object[] = [];

  if ( data !== undefined ) {
    var tableData: Object[] = [];
    for ( let i = 0; i < data.allgroup.length; i++ ) {
      let id = i + 1;
      let name = data.allgroup[i].name;
      let type = data.allgroup[i].type;
      let groupId = data.allgroup[i].id;
      let isactive = data.allgroup[i].isactive;
      let newObject = { id: id, name: name, type: type, groupId: groupId, isactive: isactive };
      if ( type == props.location.state.type )
        tableData.push( newObject );
    }
  }

  const handleClickOpen = () =>
  {
    setOpen( true );
  };

  const onConfirm = async () =>
  {
    await updateGroup1( {
      variables: {
        id: gId,
        isactive: checked
      },
    } );
    await refetch()
    setOpen( false );
  }

  const handleChange = async ( event: any, groupId: any ) =>
  {
    setGid( groupId )
    setChecked( event.target.checked )
    console.log( event.target.checked, "__" );
    console.log( groupId, "++++" );

  };

  const handleClose = () =>
  {
    setOpen( false );
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"SWITCH STATUS"}
        </DialogTitle>
        <DialogContent>
          {checked ?
            <DialogContentText id="alert-dialog-description">
              Do you want to activate the group?
            </DialogContentText> :
            <DialogContentText id="alert-dialog-description">
              Do you want to deactivate the group?
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus>
            Ok
          </Button> 
        </DialogActions>
      </Dialog> 
      <div style={{maxWidth: "100%",backgroundColor:"#f8f9fa",padding:"20px",borderRadius:"20px",boxShadow:"2px 2px 2px #cccccc",marginTop:"1rem"}}>
        <div style={{maxWidth: "100%"}}>
          <MaterialTable
          title="Groups"
          columns={[
         
            { title: "S.NO", field: "id", width: "10%",cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"} },
            { title: "Name", field: "name", width: "10%" ,cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"}},
            {
              title: "Type",
              field: "type",
              width: "10%",
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111",}
            },
            {
              title: " Action",
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111", },
              render: ( rowData: any, groupId: any ) =>
              {

                const button = (

                  <IconButton
                    color="inherit"
                    onClick={() =>
                    {



                    }}
                  >
                    <Switch

                      checked={rowData.isactive}
                      onChange={( e ) =>
                      {
                        handleClickOpen();

                        handleChange( e, rowData.groupId )


                      }} />
                  </IconButton>
                );
                return button;
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            search: true,
            filtering: true,
            sorting: true,
          
            rowStyle: {
              // backgroundColor: '#EEE',
            },
            headerStyle: {
              backgroundColor: '#386641',
              color: 'white',
              fontWeight:'bold',
              fontSize:'17px'
            }

          }}
          data={tableData}
          style={{ maxWidth: "100%",borderRadius:"10px",}}
        /></div>
        
      </div>
    </div>
  );
}


