import React from "react";
import { Category, Group, Work, Dashboard,  } from "@mui/icons-material";

const itemsList = [
  {
    text: "My Workspace",
    url: "/",
    icon: <Work />,
  },
  {
    text: "Dashboard",
    url: "/dashboard",
    icon: <Dashboard />,
  },
  // {
  //   text: "Groups",
  //   url: "/manage-groups",
  //   icon: <Group />,
  // },
  {
    text: "Groups",
    url: "/grp-dashboard",
    icon: <Group />,
  },
  {
    text: "Categories",
    url: "/treeview",
    icon: <Category />,
  },
  {
    text: "Attributes",
    url: "/manage-attribute",
    icon: <Category />,
  }, 
];

export default itemsList;
