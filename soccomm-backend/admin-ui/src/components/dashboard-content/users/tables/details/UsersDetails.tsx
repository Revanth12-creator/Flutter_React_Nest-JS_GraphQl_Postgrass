import React from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
  TablePagination,
  Paper,
  Grid,
  Avatar, 
} from "@mui/material";
import { useStyles } from "./tableStyle";
import { useQuery } from "@apollo/client";
import { UsersDetailsType } from "../../../../../types";
import { GET_USERS_BY_ACTIVITY_STATUS } from "../../../../../services/UserService";
import { format } from "date-fns";

function UsersDetails() {
  let location = useLocation();
  const classes = useStyles();
  var usersDetails: UsersDetailsType[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const users = useQuery(GET_USERS_BY_ACTIVITY_STATUS, {
    variables: {
      isActive: location.state.isActive,     
      fromDate: location.state.fromDate,
      toDate: location.state.toDate,    
    },
  });

  if (users.data !== undefined) {
    users.data.getUsersByStatus.map(function (item) {
      let {
        id,
        username,
        email,
        avatar,
        createdAt,
      }: {
        id: string;
        username: string;
        email: string;
        avatar: string;
        createdAt: string;
      } = item;
      console.log("item is", item);
      createdAt = format(new Date(createdAt), "dd/MM/yyyy");
      let newUserInfo: UsersDetailsType = {
        id,
        username,
        email,
        avatar,
        createdAt,
      };
      usersDetails.push(newUserInfo);
      return usersDetails;
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{padding: "0.625rem"}}>
      <h3>{location.state.status} Users</h3>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ backgroundColor: "#efebe9" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Joined On
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(function (row,index) {
                let {
                  id,
                  username,
                  email,
                  avatar,
                  createdAt,
                }: {
                  id: string;
                  username: string;
                  email: string;
                  avatar: string;
                  createdAt: string;
                } = row;
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell>
                      <Grid item lg={2}>
                        <Avatar alt={username} src={avatar} />
                      </Grid>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {username}
                    </TableCell>
                    <TableCell align="center">{email}</TableCell>
                    <TableCell align="center">{createdAt}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={usersDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default UsersDetails;
