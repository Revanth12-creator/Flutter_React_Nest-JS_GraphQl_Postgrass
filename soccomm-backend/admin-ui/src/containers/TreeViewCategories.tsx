import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Switch } from "@material-ui/core";
import {  Popover, TextField, Typography } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(4),
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);
const label = { inputProps: { "aria-label": "Switch demo" } };
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

const ADD_CATEGORY = gql`
  mutation ($name: String!,$level:Int!) {
    createCategory(createCategoryInput: { name: $name,level:$level }) {
      id
    }
  }
`;
const UPDATE_CATEGORY=gql`
mutation updateCategory($id:String!,$name: String,$isActive:Boolean){
   

  updateCategory(updateCategoryInput:{
  id:$id
  name:$name
  isActive:$isActive
})
  {
    __typename
  }
}
`
 export default function TreeViewCategories(props) {
    const history = useHistory();
 
  const { loading, error, data, refetch } = useQuery(allCategory);
  const [createCategory] = useMutation(ADD_CATEGORY);
  const [updateGroup1] = useMutation(UPDATE_CATEGORY);
  var tableData: Object[] = [];
useEffect(()=>{
refetch();
},[])
  useEffect(()=>{
    if (data !== undefined) {
     console.log("data from useefeect",data);
     refetch();
    }
  },[data,refetch]);

  if (data !== undefined) {
    for (let i = 0; i < data. allcategory.length; i++) {
      let id = i+1;
      // console.log("category", data. allcategory[i].id);
      let categoryId=data. allcategory[i].id;
      let isActive=data. allcategory[i].isActive;
      let name = data. allcategory[i].name;
      let level = data. allcategory[i].level;
      let parentId = data. allcategory[i].parentId;
      let newObject = {id:id,categoryId: categoryId, name: name ,level:level, parentId:parentId,isActive:isActive};
      //console.log("new object is", newObject);
      if(parentId=="0")
      tableData.push(newObject);

    //console.log("table data is", tableData);
   
    }
//refetch();
  }

 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push({
        pathname: "/addcat",
      
      })
    
  };

  const handleClick1 = (event) => {
    event.preventDefault();
    console.info("clicked.");
    history.push({
      pathname: "/treeview",
    
    })
  };
  
const[name,setName]=useState("")
const [checked, setChecked] = useState(true);
const[gId,setGid]=useState("");

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
  await refetch() 
  setOpen(false);
}

const handleChange =async (event: any,categoryId:any) => {   
  setGid(categoryId)
  setChecked(event.target.checked)
  console.log(event.target.checked,"__");
  console.log(categoryId,"++++");     
  
};
const [open, setOpen] = React.useState(false);



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
          Do you want to activate the category? 
          </DialogContentText>:
           <DialogContentText id="alert-dialog-description">
           Do you want to deactivate the category? 
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
      <div className="col-md-8" style={{maxWidth: "100%",backgroundColor:"#f8f9fa",padding:"20px",borderRadius:"20px",boxShadow:"2px 2px 2px #cccccc",marginTop:"1rem"}}>
        <div style={{marginBottom:"3rem"}}>
          <Button
            style={{ float:"right",borderRadius:"10px",backgroundColor:"#386641",color:"white",margin:"0px",padding:"5px"}}
            variant="contained"
            onClick={handleClick}
          >
            Add Category
          </Button>
        
        </div>
        <div style={{maxWidth: "100%"}}>
        <MaterialTable
          title="Category"
          columns={[
            {
              field: "name",
              title: "Category",
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
                     
              render: (rowData:any,categoryId:any) => {
           
                const button = (
                 
                  <IconButton
                    color="inherit"
                    onClick={()=>{
                     
                    console.log("rowdata onclick",rowData.name)
                    setName(rowData.name);
            //for a static path with no params
           props.history.push({
              pathname: "/manageSub",
              state:{rowData}
               
            })
                   
                  }}
                  >
                    
               {rowData.name}
                  </IconButton>
                );
                return button;
              }

            },
            {
              field: "level",
              title: "Level",
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"}
            },
            {
              title: " Status(Active/Inactive)", 
              cellStyle:{fontSize:"20px",fontWeight:"normal",color:"#111111"},
              render: (rowData:any,categoryId:any) => {
           
                const button = (
                 
                  <IconButton
                    color="inherit"
                    onClick={()=>{
                     
                    console.log("rowdata onclick",rowData)
                   
                  }}
                  >
                   {/* <EditIcon  onClick={(e)=>{

                     handleChange(e,rowData.categoryId)
                     console.log("Edit onclick",rowData)
                     
                   }}/>  */}
        <Switch
        
        checked={rowData.isActive}
        onChange={(e)=>{
          handleClickOpen();
          
            handleChange(e,rowData.categoryId)
          
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
              fontSize:'21px',
              
              
            }
    
          }}
          data={tableData}
          // onRowClick={(event, rowData:any) => {
          // console.log(rowData.name);
          // setName(rowData.name);
          //   //for a static path with no params
          //  props.history.push({
          //     pathname: "/manageSub",
          //     state:{rowData}
               
          //   })
          //  // for dynamic path with id coming from data, feel free to edit history.push above
          // }}
          style={{ maxWidth: "100%",borderRadius:"10px"}}
          editable={{

            onRowAdd: (newData:any) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    /* setData([...data, newData]); */
                    console.log("hiiiiiii",newData);
                    createCategory({ variables: { name:newData.name , level:Number(newData.level) } });
                    resolve(refetch(allCategory));
                }, 1000); 
            }),
            onRowUpdate: (newData:any, oldData:any) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("hi");
              const updateCategory = [...data1];
               
              console.log(updateCategory);
              const index = oldData.tableData.id;
              console.log(index);
              updateCategory[index] = newData;
              console.log(newData);
               updateGroup1({ variables: {id:newData.categoryId, name:newData.name } });
               setData([...updateCategory]);
              // refetch(allCategory);
              resolve(refetch(allCategory));
            }, 1000)
          }),
          }}
          
        />

        </div>
      </div>
    </div>
  );
}
