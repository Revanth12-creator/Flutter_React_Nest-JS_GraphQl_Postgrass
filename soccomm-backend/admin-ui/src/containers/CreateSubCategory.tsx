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
  mutation ($name: String!,$level: Int!, $parentId:String,$isEnd:Boolean) {
    createCategory(createCategoryInput: { name: $name,level: $level, parentId:$parentId,isEnd:$isEnd}) {
      id
    }
  }
`;


function CreateSubCategory(props) {
    console.log("props",props.location.state.parentid);
    console.log("props",props.location.state.parentlevel);
    const[check,setCheck]=useState(false);

    let parentid=props.location.state.parentid;
    let parentlevel=props.location.state.parentlevel;
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
      let isEnd=data. allcategory[i].isEnd;
      let newObject = {id:id,categoryId: categoryId, name: name,level:level,parentId:parentId,isEnd:isEnd };
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
    <div className="col-md-12" style={{  marginBottom:"150px", marginTop:"30px", marginLeft:"200px", marginRight:"200px",float:"inline-end",
    border: "1px solid grey" ,borderRadius:"10px"}}>
     
      <div style={{ margin:"100px"}}className="col-md-8">
      <Typography variant="h5" component="h2"style={{textAlign:"center"}}>
               Create Sub Category
              </Typography>
        
          <form
             onSubmit={(e) => {
              refetch();
              e.preventDefault();

              createCategory({ variables: { name: name.value, level:Number(parentlevel+1),parentId:parentid,isEnd:Boolean(check) } });
             name.value="";
             console.log("refetch");
             refetch();
             alert("Subcategory created successfully");
            history.push({
              pathname: "/treeview",
          
            })

            }}
          >
            <Grid container spacing={1}>
            <Grid item xs={8}>
              <br/>
         
              </Grid>
         
            
          
              <Grid item xs={8}>
              <br/>
              <label style={{fontSize:"20px"}}>SubCategoryName:</label>
                <input style={{marginLeft:"2px",padding:"10px",borderRadius:"10px"}}
                  ref={(node) => {
                    name = node;
                  }}
                /><br/><br/>

              </Grid>
              <Grid item xs={8}>
              <br/>
              <label htmlFor="chkisEnd"style={{fontSize:"20px"}}>
    <input type="checkbox" id="chkisEnd" style={{marginLeft:"2px",padding:"10px"}}  onChange={(e) => setCheck(e.target.checked)} />
   Is it the end level?
</label>
<hr />
                <br/><br/>
                
              </Grid>
            </Grid>
            <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{  marginTop:"80px",marginRight:"400px",marginLeft:"400px",borderRadius:"10px",backgroundColor:"#b68ce4",color:"white"}}
      >
        Save Sub Category 
      </Button>
          </form>
      
      </div>
     

    </div>
  );
}

export default CreateSubCategory;


