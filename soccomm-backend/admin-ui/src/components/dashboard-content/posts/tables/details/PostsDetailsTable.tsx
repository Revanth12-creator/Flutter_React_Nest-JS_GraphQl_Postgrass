import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
  TablePagination, 
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStyles } from "./tableStyle";
import { POSTS_BRIEF_INFO_BY_CAT } from "../../../../../services/PostService";
import { PostsBriefInfoType } from "../../../../../types";
import { format } from "date-fns";

function PostsDetailsTable() {
  let location = useLocation(); 
  const classes = useStyles();
  var postsBriefInfo: PostsBriefInfoType[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log("location is", location, location.state.fromDate);

  const postsByCat = useQuery(POSTS_BRIEF_INFO_BY_CAT, {
    variables: {
      fromDate: location.state.fromDate,
      toDate: location.state.toDate,
      catId: location.state.catId,
    },
  });
  console.log("posts by category", postsByCat);

  if (postsByCat.data !== undefined) {
    console.log("posts", postsByCat);
    console.log("posts data", postsByCat.data.getPostsByCategoryId);
    postsByCat.data.getPostsByCategoryId.forEach(function (item) {
      let {
        createdAt,
        postTitle,
        user,
        id,
      }: {
        createdAt: string;
        postTitle: string;
        user: { username: string };
        id: string;
      } = item;
      console.log("item is", item, user);
      createdAt = format(new Date(createdAt), "dd/MM/yyyy");
      let newPostInfo: PostsBriefInfoType = {
        createdAt,
        postTitle,
        username: user.username,
        postId: id,
      };
      console.log("new post", newPostInfo);
      postsBriefInfo.push(newPostInfo);
    });
    console.log("posts brief info", postsBriefInfo);
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
      <h3>Posts on {location.state.catName}</h3>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ backgroundColor: "#efebe9" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Posted By
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Posted On
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsBriefInfo
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(function (row, index) {
                let { username, postTitle, createdAt, postId } = row;
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      {username}
                    </TableCell>
                    <TableCell align="center">{postTitle}</TableCell>
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
        count={postsBriefInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default PostsDetailsTable;
