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
  }
}
`;
const ADD_CATEGORY = gql`
  mutation ($name: String!,$level: Int!, $parentId:String) {
    createCategory(createCategoryInput: { name: $name,level: $level, parentId:$parentId}) {
      id
    }
  }
`;


function CreateCategory(props) {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(allCategory);
  const [createCategory] = useMutation(ADD_CATEGORY);
  let name,level;
  const [currentCategory, setCurrentCategory] = useState("");
  
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
      let parentId=data. allcategory[i].parentId;
     
      let newObject = {id:id,categoryId: categoryId, name: name,level:level,parentId:parentId };
      tableData.push(newObject);
     }
    refetch();
  }

  const onSubmit = (data) => {
    console.log(data);
  };
 
  const changeCategory = (newCategory: string): void => {
    setCurrentCategory(newCategory);
    console.log(currentCategory);
  };
  return (
    <div className="col-md-12" style={{ padding: "10px", marginBottom:"150px", marginLeft:"500px",float:"inline-end",
    border: "1px solid grey" }}>
     
      <div style={{ padding: "10px" , margin:"100px"}}className="col-md-8">
      <Typography variant="h5" component="h2"style={{textAlign:"center",marginTop:"10px"}}>
               Create Category 
              </Typography>
        
          <form
             onSubmit={(e) => {
             
              e.preventDefault();
// const l=tableData.filter(function (e:any){return e.categoryId==currentCategory ;});

// console.log(currentCategory);
// console.log(l[0]["level"]);

              createCategory({ variables: { name: name.value, level:1 } });
             name.value="";
             console.log("refetch");
            
             alert("category created successfully");
            history.push({
              pathname: "/treeview",
          
            })
            refetch();
            }}
          >
            <Grid container spacing={1}>
            <Grid item xs={8}>
              <br/>
            {/* <label style={{fontSize:"20px"}}> Category:</label>
          <select style={{marginLeft:"2px",padding:"2px",fontSize:"15px"}}  placeholder="Select Category"
        onChange={(event) => changeCategory(event.target.value)}
        value={currentCategory}
      > 
                 {
                   tableData.map((val: any, id: any) => (
                   <option value={val.categoryId} key={id}>
                      {val.name}
                    </option>
))}
      </select> */}
              </Grid><br/>
         
            
          
              <Grid item xs={8}>
              <br/>
              <label style={{fontSize:"20px"}}>CategoryName:</label>
                <input style={{marginLeft:"2px",padding:"10px"}}
                  ref={(node) => {
                    name = node;
                  }}
                /><br/><br/>
              </Grid>
            </Grid>
            <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ float:"left",marginLeft:"120px",marginRight:"90px",marginTop:"50px",marginBottom:"50px"}}
      >
        Save Category
      </Button>
          </form>
      
      </div>
     

    </div>
  );
}

export default CreateCategory;
