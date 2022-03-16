import { makeStyles } from '@material-ui/core'

const loginStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '23.4375vw',
    },
    '& .MuiFormLabel-root':{
        color:"#386641",
        fontWeight:"bold",

    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(3),
      backgroundColor:"#386641",
      color:"white",
      fontWeight:"bold"
    },
  },
  body: {
    width: "31.25vw",
    height:"30vw",
    marginTop:"9rem",
    marginLeft:"4rem",
    borderRadius:"20px",
    backgroundColor:"#f3f4f6"
  },
  errorMsg: {
    color: 'red',
  },
  heading: {
    textAlign: 'center',
    color:"#386641",
    fontWeight:"bold",
    fontSize:"26px"
  },
  
}))

export default loginStyle
