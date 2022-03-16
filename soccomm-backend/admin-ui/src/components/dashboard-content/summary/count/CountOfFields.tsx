import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useQuery } from "@apollo/client";
import { GET_POSTS_COUNT } from "../../../../services/PostService";
import { GET_GROUPS_COUNT } from "../../../../services/GroupService";
import { GET_USERS_COUNT } from "../../../../services/UserService";
import countItemsList from "./countItemsList";

function CountOfFields() {
  const countOfPosts = useQuery(GET_POSTS_COUNT);
  const countOfGroups = useQuery(GET_GROUPS_COUNT);
  const countOfUsers = useQuery(GET_USERS_COUNT);
  if (countOfPosts.data) {
    countItemsList[0].count = countOfPosts.data.getPostsCount;
  }
  if (countOfUsers.data) {
    countItemsList[1].count = parseInt(countOfUsers.data.findCount);
  }
  if (countOfGroups.data) {
    countItemsList[2].count = countOfGroups.data.getGroupsCount;
  }

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: "50px" }}>
      <Grid container spacing={1}>
        {countItemsList.map(function (item, index) {
          let {
            text,
            count,
          }: {
            text: string;
            count: number;
          } = item;
          return (
            <Grid item xs={12} sm={12} md={4} key={index}>
              <Card
                sx={{ minHeight: 150 }}
                style={{ backgroundColor: "#efebe9" }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {text}
                  </Typography>
                  {count}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CountOfFields;
