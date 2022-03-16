import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination, 
  Paper,
  Avatar,
  Grid, 
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useStyles } from "./tableStyle";
import { greyForBg } from "../../../../assets/colors";
import { useQuery } from "@apollo/client";
import { GET_USERS_OF_GROUP } from "../../../../services/GroupService";

function GroupUserDetails() {
  let location = useLocation();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  var rows = [{ avatar: "", username: "", email: "" }];
  rows.shift();

  const usersOfGroup = useQuery(GET_USERS_OF_GROUP, {
    variables: {
      id: location.state.groupId,
    },
  });

  console.log("users of group", usersOfGroup);

  if (usersOfGroup.data !== undefined) {
    usersOfGroup.data.group.groupusers.forEach(function (item) {
      let { user } = item;
      let { avatar, username, email } = user;
      let newRow = { avatar, username, email };
      rows.push(newRow);      
    });
    console.log("rows are", rows);
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
      <Typography variant="h6" gutterBottom component="div">
        Members of group "{location.state.groupName}"
      </Typography>

      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ backgroundColor: greyForBg }}
        sx={{ flexGrow: 1 }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
                align="center"
              >
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(function (row, index) {
                let { username, email, avatar } = row;
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Grid item lg={2}>
                        <Avatar alt={username} src={avatar} />
                      </Grid>
                    </TableCell>
                    <TableCell align="center">{username}</TableCell>
                    <TableCell align="center">{email}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default GroupUserDetails;
