import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import { Popover, TextField, Typography } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@mui/material";
import { Switch } from "@material-ui/core";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { useHistory } from "react-router-dom";

const allCategory = gql`
  query {
    allcategory {
    id
    name
    level
    parentId
    isActive
    }
  }
`;
const allAttribute = gql`
query{
 allattribute{
  id
  name
  categoryId
  description
  isActive
}
}
`;
const UPDATE_ATTRIBUTE=gql`
mutation updateAttribute($id:String!,$name: String,$description: String,$isActive:Boolean){
   
  updateAttribute(updateAttributeInput:{
    id:$id
    name:$name
    isActive:$isActive
    description:$description
  }){
    __typename
  }
}

`;

 export default function ManageAttribute(props) {
  

   
   
  
   const [checked, setChecked] = useState(true);
   const[gId,setGid]=useState("");
   const [open, setOpen] = React.useState(false); 
  const history = useHistory();
  const [updateGroup1] = useMutation(UPDATE_ATTRIBUTE);
  const categoryData = useQuery(allCategory);
  const { loading, error, data, refetch } = useQuery(allAttribute);
 
  var tableData: Object[] = [];
  useEffect(()=>{
    refetch();
     },[]);
  useEffect(()=>{
    if (categoryData.data !== undefined && data !== undefined) {
     console.log("data from useefeect",data);
     console.log("data from useefeect",categoryData.data);
     refetch();
    }
  },[categoryData.data,data,refetch]);

  if (data !== undefined) {
    for (let i = 0; i < data. allattribute.length; i++) {
      let id = i + 1;
     

      let catnameFromCatTable;
      for (let j = 0; j <categoryData .data.allcategory.length; j++) {
        if (data. allattribute[i].categoryId == categoryData.data.allcategory[j].id) {
          catnameFromCatTable = categoryData.data.allcategory[j].name;
        }
      }

      let catnameFromcatTable = catnameFromCatTable;
      let categoryId=data. allattribute[i].categoryId;
      let name = data. allattribute[i].name;
      let description=data.allattribute[i].description;
      let isActive=data.allattribute[i].isActive;
      let attributeId=data. allattribute[i].id;
      let newObject = {
        id: id,
        categoryId:categoryId,
        name: name,
        catNameFromCatTab: catnameFromcatTable,
        description:description,
        isActive:isActive,
        attributeId:attributeId
      };
      // console.log("new object is", newObject);
     
      tableData.push(newObject);
      // console.log("table data is", tableData);
    }
    // refetch();
  }
 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push({
        pathname: "/attri",
        
      }) 
    
  };
  const handleChange =async (event: any,attributeId:any) => {
    setGid(attributeId);
    setChecked(event.target.checked)
    console.log(event.target.checked,"__");
    console.log(attributeId,"++++"); 
       
     
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onConfirm= async ()=>{   
    await updateGroup1({
              variables: {
                id:gId,
                isActive:checked
              },
            });   
    
    setOpen(false);
    await refetch() ;
  }
  const handleClose = () => {
    setOpen(false);
  };
  const [data1, setData] = useState([tableData]);
  return (
    <div className="col-md-12">
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
          Do you want to activate the Attribute? 
          </DialogContentText>:
           <DialogContentText id="alert-dialog-description">
           Do you want to deactivate the Attribute? 
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
     
      <div className="col-md-8" style={{maxWidth: "100%", backgroundColor:"#f8f9fa",padding:"20px",borderRadius:"20px",boxShadow:"2px 2px 2px #cccccc",marginTop:"1rem" }}>
      {/* <div style={{marginBottom:"3rem"}}>{
         
          <Button
          style={{float:"right",borderRadius:"10px",backgroundColor:"#b68ce4",color:"white",margin:"0px",padding:"5px"}}
          variant="contained"
          onClick={handleClick}
         
        > 
          Add Attribute
        </Button>
        }
         
        </div> */}
        <div style={{maxWidth: "100%"}}>
        <MaterialTable
          title="Attribute"
          columns={[
           
            {
              field: "name",
              title: "Attribute",
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
             
            },
            {
                field: "description",
                title: "Attribute Description",
                cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
               
              },
              {
                field: "catNameFromCatTab",
                title: "Category",
                editable: "never",
                cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
                
              },
              {
                title: " Status(Active/Inactive)", 
                cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
                render: (rowData:any,attributeId:any) => {
                
                  const button = (
                   
                    <IconButton
                      color="inherit"
                      onClick={()=>{
                       
                      
                     
                    }}
                    >
          <Switch
          
          checked={rowData.isActive}
          onChange={(e)=>{
            handleClickOpen();
            
              handleChange(e,rowData.attributeId)
            
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
            sorting: true,
            filtering: true,
            rowStyle: {
              //backgroundColor: '#EEE',
            },
            headerStyle: {
              backgroundColor: '#386641',
              color: 'white',
              fontWeight:'bold',
              fontSize:'21px'
            }
    
          }}
          data={tableData}
        //   onRowClick={(event, rowData) => {
        //   console.log(rowData);
        //     //for a static path with no params
        //    props.history.push({
        //       pathname: "/manageSub",
        //       state:{rowData}
               
        //     })
           // for dynamic path with id coming from data, feel free to edit history.push above
        //  }}
          style={{ maxWidth: "100%",borderRadius:"10px"}}
          editable={{
            
            onRowUpdate: (newData:any, oldData:any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log("hi");
              const updateAttribute = [...data1];
               
              console.log(updateAttribute);
              const index = oldData.tableData.id;
              console.log(index);
              updateAttribute[index] = newData;
              console.log(newData);
               updateGroup1({ variables: {description:newData.description,id:(newData.attributeId),name:(newData.name) } });
               setData([...updateAttribute]);
                resolve(refetch(allAttribute));
              }, 1000)
            })
          }}
          
        />

        </div>
      </div>
    </div>
  );
}
