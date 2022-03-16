import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { useStyles } from "./tableStyle";
import { PostCountForCategoryType } from "../../../../../types";

type Props = {
  postCountForEachCategory: PostCountForCategoryType[];
  fromDate: string;
  toDate: string;
};

const PostsCountTable: React.FC<Props> = ({
  postCountForEachCategory,
  fromDate,
  toDate,
}) => {
  const classes = useStyles();
  const history = useHistory();

  function clickAction(row: PostCountForCategoryType) {
    let { catName, catId }: { catName: string; catId: string } = row;
    history.push({
      pathname: "/posts-details",
      search: `?category=${catName}`,
      state: { catName, fromDate, toDate, catId },
    });
  }

  return (    
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      style={{ backgroundColor: "#efebe9" }}
    >
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.tableHeaderCell}
              style={{ color: "white" }}
            >
              Category
            </TableCell>
            <TableCell
              align="right"
              className={classes.tableHeaderCell}
              style={{ color: "white" }}
            >
              Posts
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postCountForEachCategory.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => clickAction(row)}
            >
              <TableCell component="th" scope="row">
                {row.catName}
              </TableCell>
              <TableCell align="center">{row.countOfPosts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>    
  );
};

export default PostsCountTable;
