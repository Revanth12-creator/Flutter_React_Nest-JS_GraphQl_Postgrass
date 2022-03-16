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
import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client";
import { useStyles } from "./tableStyle";
import { GET_ALL_POSTS, DELETE_POST } from "../../../../../services/PostService";
import { PostsInfoType } from "../../../../../types";
import { format } from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ManagePosts() {  
  const classes = useStyles();
  var postsInfo: PostsInfoType[] = [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAlert, setOpenAlert] = useState(false);
  const [postId,setPostId]=useState("0")
  const [postedUser,setPostedUser]=useState("")
  const [postTitle,setPostTitle]=useState("")
  const allPosts = useQuery(GET_ALL_POSTS);
  const [deletePost] = useMutation(DELETE_POST);
  console.log("all posts got from query", allPosts);

  if (allPosts.data !== undefined) {    
    allPosts.data.allPostsInDescOrder.forEach(function (item) {
      let {
        createdAt,
        postTitle,
        user,
        id,
        description
      }: {
        createdAt: string;
        postTitle: string;
        user: { username: string };
        id: string;
        description:string;
      } = item;     
      createdAt = format(new Date(createdAt), "dd/MM/yyyy");
      let newPostInfo: PostsInfoType = {
        createdAt,
        postTitle,
        username: user.username,
        postId: id,
        description
      };     
      postsInfo.push(newPostInfo);
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

  async function handleDeleteBtnClick(postId: string, postTitle: string, postedUser: string){
    await setPostId(postId)
    await setPostTitle(postTitle)
    await setPostedUser(postedUser)
    await setOpenAlert(true)  
  };

  async function removePost(){          
    await deletePost({
      variables: {
        id: postId
      },
    });
    await setOpenAlert(false) 
    await allPosts.refetch()    
    console.log("removed")   
  }

  return (
    <div style={{padding: "0.625rem"}}>
      <h3>Manage Posts</h3>
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
              <TableCell
                align="center"
                className={classes.tableHeaderCell}
                style={{ color: "white" }}
              >
                Description
              </TableCell>             
               <TableCell
                align="center"
                className={classes.tableHeaderCell}               
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsInfo
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(function (row, index) {
                let { username, postTitle, createdAt, postId, description } = row;
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
                    <TableCell align="center">{description}</TableCell>                   
                    <TableCell align="center">                   
                       <DeleteIcon color="error" onClick={()=>handleDeleteBtnClick(postId,postTitle,username)}/>                    
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={postsInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openAlert}
        onClose={()=>setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove the post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The post by {postedUser} entitled "{postTitle}" will be deleted.            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenAlert(false)}>Cancel</Button>
          <Button onClick={removePost} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManagePosts;
