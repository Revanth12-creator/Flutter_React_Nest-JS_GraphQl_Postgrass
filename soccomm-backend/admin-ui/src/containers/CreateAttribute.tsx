import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

const allCategory = gql`
query {
  allcategory {
    id
    name
    level
    parentId
    isEnd
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
const ADD_Attribute= gql`
  mutation createAttribute($categoryId:String!,$description:String!,$name:String!,) {
    createAttribute(createAttributeInput: {categoryId:$categoryId,description: $description,name:$name,}) {
      __typename
      
    }
  }
`;
function CreateAttribute(props) {
  console.log(props.location.state.rowData1);
  var rowData: Object[] = [];
  rowData=props.location.state.rowData1;
  console.log(props.location.state.rowData1.categoryId);
  var categoryId=props.location.state.rowData1.categoryId;
  console.log("rowData from previous page",categoryId);
  const history = useHistory();
  const { loading, error, data } = useQuery(allCategory);
  const {  refetch } = useQuery(allAttribute);
  const [createAttribute] = useMutation(ADD_Attribute);
  let name,level,description;
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentl2Category, setCurrentl2Category] = useState("");
  const [currentl3Category, setCurrentl3Category] = useState("");
  var tableData: Object[] = [];
  useEffect(()=>{
    console.log("hhhhhhhiiiiii")
    if (data !== undefined) {
     console.log("data from useefeect",data);
     refetch();
    }},[data]);


  if (data !== undefined) {
    for (let i = 0; i < data. allcategory.length; i++) {
      let id = i+1;
      let categoryId=data. allcategory[i].id;
      let name = data. allcategory[i].name;
      let level = data. allcategory[i].level;
      let parentId= data. allcategory[i].parentId;
      let isEnd=data. allcategory[i].isEnd;
      let newObject = {id:id,categoryId: categoryId, name: name,level:level,parentId:parentId,isEnd:isEnd };
      tableData.push(newObject);
     }
   // refetch();
  }

  
 
  const changeCategory = (newCategory: string): void => {
    setCurrentCategory(newCategory);
    console.log(currentCategory);
  };
  const changel2Category = (newSCategory: string): void => {
    setCurrentl2Category(newSCategory);
    console.log(currentl2Category);
  };
  const changel3Category = (newl3Category: string): void => {
    setCurrentl3Category(newl3Category);
    console.log(currentl3Category);
  };
   
  return (
    <div className="col-md-12" style={{ marginBottom:"150px", marginTop:"30px", marginLeft:"200px", marginRight:"200px",float:"inline-end",
    border: "1px solid grey",borderRadius:"10px"}}>
      <div style={{ margin:"100px"}}className="col-md-8">
     <Typography variant="h5" component="h5"style={{textAlign:"center",marginBottom:"40px"}}>
               Create Attribute
              </Typography>
       
      
      
       
          <form
           onSubmit={e => {
            e.preventDefault();
            console.log("hi");
            
            createAttribute({ variables: { categoryId:categoryId,description:description.value,name:name.value, } });
            console.log(currentl3Category);
            description.value = '';
            name.value='';
            alert("Attribute created successfully");
            
            history.push({
              pathname: "/manage-attributes",
              state:{rowData}
            })
            refetch();
          }}
          >
          {/* <label style={{fontSize:"20px"}}> Category-level1:</label>
          <select style={{marginLeft:"2px",padding:"2px",fontSize:"15px"}}  placeholder="Select Category"
        onChange={(event) => changeCategory(event.target.value)}
        value={currentCategory}

      > 
                 {
                   tableData.filter(function (e:any){return e.level==1 ;}).map((val: any, id: any) => (
                   <option value={val.categoryId} key={id}>
                      {val.name}
                    </option>

))}
      </select>
    
  <label style={{fontSize:"20px"}}> Category-level2:</label>
          <select style={{marginLeft:"5px",padding:"2px",fontSize:"15px"}}  placeholder="Select Category"
          onChange={(event) => changel2Category(event.target.value)}
          value={currentl2Category}

      >  
                 {
                   tableData.filter(function (e:any){return e.parentId==currentCategory;}).map((val: any, id: any) => (
                   <option value={val.categoryId} key={id}>
                      {val.name}
                    </option>

))}
      </select> */}


      {/* <label style={{fontSize:"20px"}}> Final Level Category:</label>
          <select style={{marginLeft:"5px",padding:"5px",fontSize:"15px",borderRadius:"5px",width:"20%"}}  placeholder="Select Category"
         onChange={(event) => changel3Category(event.target.value)}
         value={currentl3Category}

      >  
                 {
                   tableData.filter(function (e:any){return e.isEnd==true;}).map((val: any, id: any) => (
                   <option value={val.categoryId} key={id}>
                      {val.name}
                    </option>

))}
      </select>
      <br/> <br/> */}
      <label style={{fontSize:"20px"}}>Attribute:</label>
                <input 
                style={{fontSize:"20px",marginRight:"100px",borderRadius:"5px",width:"20%"}}
                  ref={(node) => {
                    name = node;
                  }}
                  />
                  
                  <label style={{fontSize:"20px",}}>Description:</label>
                  <input 
                   style={{fontSize:"20px",marginRight:"60px",borderRadius:"5px",width:"20%"}}
                  ref={(node) => {
                   description = node;
                  }}
                  />
                  <Button
        variant="contained"
        color="primary"
       type="submit"
        style={{ marginTop:"80px",marginRight:"400px",marginLeft:"400px"  ,borderRadius:"10px",backgroundColor:"#b68ce4",color:"white",padding:"10px" }}
      >
        SAVE ATTRIBUTE
      </Button>
          </form>
      
      </div>
      

    </div>
  );
}

export default CreateAttribute;  
