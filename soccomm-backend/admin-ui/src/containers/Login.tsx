import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import loginStyle from "../styles/LoginStyle";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_LOGIN } from "../services/UserService";
import leave from "../assets/images/leave.jpg"

type Props = {
  loginAction: () => void;
};

const Login: React.FC<Props> = ({ loginAction }) => {
  const history = useHistory();
  const classes = loginStyle();
  const { handleSubmit, control } = useForm();
  const [errMsg, setErrMsg] = useState("");
  const [createLogin] = useMutation(USER_LOGIN);

  const doAuthentication = async (email, password) => {
    return createLogin({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  const onSubmit = async (formData) => {  
    await doAuthentication(formData.email, formData.password)
      .then((result) => {       
        localStorage.setItem("token", result.data.login.token);
        localStorage.setItem("userId", result.data.login.userId);
        loginAction();        
      })
      .catch((error) => {        
        let errMessage: string = error.toString();
        let firstLine: string = errMessage.split("\n", 1)[0];
        let errMsgOnLoginScreen = firstLine.split(":");      
        setErrMsg(errMsgOnLoginScreen[1]);
        history.push("/login");
      });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        // alignItems="center"
        justifyContent="space-around"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={7} style={{         
          backgroundImage:`url(${leave})`,         
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover",
          borderRadius:"0px 50px 50px 0px",
          boxShadow:"1px 1px 1px 1px #cccccc"
        }}>
          
        </Grid>

        <Grid item xs={5} style={{
          margin:"0px"
        }}>    
          <h4 style={{textAlign:"center"}}>SOCCOMM APPLICATION</h4>    
          <Paper className={classes.body}>            
            <Box pt={3} className={classes.heading}>
              <Typography variant="h5" component="h2">
                Sign in
              </Typography>
              <Typography id="errorMsg" className={classes.errorMsg}>
                {errMsg}
              </Typography>
            </Box>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)} style={{
              marginTop:"4rem"
            }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="email"
                  />
                )}
                rules={{ required: "Enter an email or phone number" }}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Password"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="password"
                  />
                )}
                rules={{ required: "Enter a password" }}
              />
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Log in
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
