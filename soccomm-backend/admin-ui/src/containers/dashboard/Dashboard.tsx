import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import dashboardItemsList from "./dashboardItems";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: "50px" }}>
      <Grid container spacing={1}>
        {dashboardItemsList.map(function (item, index) {
          const { text, url, miniChart } = item;
          return (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <Card
                sx={{ minHeight: 150 }}
                style={{ 
                  backgroundColor: "#f8f9fa",
                  boxShadow:"2px 2px 2px 1px #cccccc",
                  margin:"10px",
                  borderRadius:"10px"
                 }}
                onClick={() => history.push(url)}
              >
                <CardContent >
                  <Typography
                    sx={{ fontSize: 18}}
                    color="#1b4332"
                    gutterBottom
                  >
                    {text}
                  </Typography>
                  <div style={{textAlign:"center"}}>
                  {miniChart}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
