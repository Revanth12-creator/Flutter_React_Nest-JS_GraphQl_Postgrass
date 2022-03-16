import React, { useEffect, useState }from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Box, Paper, Typography } from "@material-ui/core";
import formStyle from "../styles/FormStyle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
const defaultValues = {
  name: "",
 
};
const Form = () => {
  const classes = formStyle();
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(allCategory);
  const [createCategory] = useMutation(ADD_CATEGORY);
  const [formValues, setFormValues] = useState(defaultValues);
  const {  control } = useForm();
  const [errMsg, setErrMsg] = useState("");
  
  const handleInputChange = (e) => {
    const { name,description,value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
     
    });
  };
  
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
      var name = data. allcategory[i].name;
      let level = data. allcategory[i].level;
      let parentId=data. allcategory[i].parentId;
     
      let newObject = {id:id,categoryId: categoryId, name: name,level:level,parentId:parentId };
      tableData.push(newObject);
     }
  
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
   
    createCategory({ variables: { name: formValues.name, level:1 } });
   
    alert("category created successfully");
   history.push({
     pathname: "/treeview",
 
   })
   refetch();
 
  };
  return (
    <Paper className={classes.body}>            
            <Box pt={3} className={classes.heading}>
              <Typography variant="h5" component="h2">
               Create Category
              </Typography>
              
            </Box>
      <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          {/* <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
            rules={{ required: "Please Enter Category Name!!!" }}
          /> */}
           <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Category"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="text"
                  />
                )}
                rules={{ required: "Enter a category" }}
              />
        </Grid>
    
        
       
            
        
        <div style={{margin:"20px"}}><Button variant="contained" color="primary" type="submit" >
          Save Category
        </Button></div>
        
      </Grid>
    </form>
  </Paper>
    
  );
};
export default Form;