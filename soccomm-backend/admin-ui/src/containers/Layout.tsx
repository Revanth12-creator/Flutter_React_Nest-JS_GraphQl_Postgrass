import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/layout/navbar/Navbar";
import SideBar from "../components/layout/sidebar/SideBar";

const Layout: React.FC = ({ children }) => {
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2 }}
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
