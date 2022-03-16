import React from 'react'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PostsCountTable from '../tables/count/PostsCountTable'
import PieChartForCategories from '../pie-chart/PieChartForCategories'
import { GET_POST_COUNT_OF_CAT } from '../../../../services/PostService'
import { addDays, format } from 'date-fns'
import { PostCountForCategoryType } from '../../../../types'
import ButtonsAndDurationFieldsMain from '../../../get-data/ButtonsAndDurationFieldsMain'
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function PostsMain()
{
  const history = useHistory();
  const [selectedDuration, setSelectedDuration] = useState( 'day' )
  const [fromDate, setFromDate] = useState( format( new Date(), 'yyyy-MM-dd' ) )
  const [toDate, setToDate] = useState(
    format( addDays( new Date(), 1 ), 'yyyy-MM-dd' ),
  )
  var postsForEachCategory: PostCountForCategoryType[] = []
  const postsForCat = useQuery( GET_POST_COUNT_OF_CAT, {
    variables: {
      fromDate: fromDate,
      toDate: toDate,
    },
  } )

  if ( postsForCat.data ) {
    console.log( 'count of cat is', postsForCat, postsForCat.data )
    postsForCat.data.getPostsForCategories.forEach( function ( post )
    {
      if ( !postsForEachCategory.some( item => item.catId === post.category.id ) ) {
        console.log( post )
        let { id, name }: { id: string, name: string } = post.category
        let newPostInfo = { catId: id, catName: name, countOfPosts: 1 }
        postsForEachCategory.push( newPostInfo )
      }
      else {
        let indexOfDuplicateEle = postsForEachCategory.findIndex( item => item.catId === post.category.id );
        postsForEachCategory[indexOfDuplicateEle].countOfPosts++
      }
    }
    )
  }

  return (
    <div>
      <h3 style={{ margin: "0.938rem", textDecoration: "underline" }}>POSTS</h3>
      <div style={{ display: "flex" }}>
        <ButtonsAndDurationFieldsMain
          setToDate={setToDate}
          setFromDate={setFromDate}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />
        <Button variant="contained" onClick={()=>history.push("/manage-posts")}>
          Manage Posts
        </Button>
      </div>

      <Box sx={{ flexGrow: 1 }} style={{ padding: '1.875rem' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9} key="pieChart">
            <PieChartForCategories
              postCountForEachCategory={postsForEachCategory}
              fromDate={fromDate}
              toDate={toDate}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} key="table">
            <PostsCountTable
              postCountForEachCategory={postsForEachCategory}
              fromDate={fromDate}
              toDate={toDate}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <h1>from date:{fromDate}</h1>
      <h1>to Date:{toDate}</h1> */}
    </div >
  )
}

export default PostsMain
