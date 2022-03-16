import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import { UPDATE_USER_LAST_LOGIN } from "../../../services/UserService"
import { useMutation } from "@apollo/client";
import  './NavBar.css';

type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
};
const Navbar: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  var userName:string=String(localStorage.getItem("userName"))
  var userId:string=String(localStorage.getItem("userId"))
  var currentDate:Date=new Date()
  const [updateUserLastLogin] = useMutation( UPDATE_USER_LAST_LOGIN );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logOutAction(){
   const updatedUserLastLogin = await updateUserLastLogin( {
     variables: {
         id: userId,
         lastLogin: currentDate,
     },
   });
   console.log("last login updated",updatedUserLastLogin)
   handleClose();
   localStorage.clear();
   sessionStorage.clear();
   window.location.href = "/";             
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
        <div>         
            <Avatar 
            sx={{ bgcolor: deepOrange[500] }}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            style={{ position: "absolute", right: "0.5rem", top: "0.563rem" }}>
             {userName.charAt(0).toUpperCase()}
            </Avatar>         
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>history.push("/profile")}>
             Profile
            </MenuItem>
            <MenuItem
              onClick={logOutAction}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
