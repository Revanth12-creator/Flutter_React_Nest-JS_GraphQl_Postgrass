import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Workspace from "./containers/Workspace";
import ManageGroups from "./containers/ManageGroups";
import GroupsMain from "./components/dashboard-content/groups/GroupsMain";
import UsersMain from "./components/dashboard-content/users/UsersMain";
import CreateCategory from "./containers/CreateCategory";
import CreateAttribute from "./containers/CreateAttribute";
import TransactionsMain from "./components/dashboard-content/transactions/TransactionsMain";
import AnalyticsMain from "./components/dashboard-content/analytics/AnalyticsMain";
import Dashboard from "./containers/dashboard/Dashboard";
import PostsMain from "./components/dashboard-content/posts/main/PostsMain";
import SummaryMain from "./components/dashboard-content/summary/SummaryMain";
import GroupsDashboard from "./containers/GroupsDashboard";
import TreeViewCategories from "./containers/TreeViewCategories";
import PostsDetailsTable from "./components/dashboard-content/posts/tables/details/PostsDetailsTable";
import ManagePosts from "./components/dashboard-content/posts/tables/details/ManagePosts"
import GroupUserDetails from "./components/dashboard-content/groups/users/GroupUserDetails";
import UsersDetails from "./components/dashboard-content/users/tables/details/UsersDetails";
import CreateSubCategory from "./containers/CreateSubCategory";
import ManageAttributes from "./containers/ManageAttributes";
import Layout from "./containers/Layout";
import ProfileMain from "./components/profile/ProfileMain"
import { useQuery } from "@apollo/client";
import { GET_USER_DATA_BY_UID } from "./services/UserService";
import ManageTreeView from "./containers/ManageTreeview";
import ManageAttribute from "./containers/ManageAttribute";
import Form from "./containers/AddCategory";

function AppRouter()
{
  var userId: string = String( localStorage.getItem( "userId" ) );
  const userData = useQuery( GET_USER_DATA_BY_UID, {
    variables: {
      id: userId,
    },
  } );
  if ( userData.data !== undefined ) {
    window.localStorage.setItem( "userName", userData.data.user.username );
    window.localStorage.setItem( "email", userData.data.user.email );
    window.localStorage.setItem( "lastLogin", userData.data.user.lastLogin )
    if ( userData.data.user.avatar !== null ) {
      window.localStorage.setItem( "profileFileName", userData.data.user.avatar.split( /[\\]+/ ).pop() );
      window.localStorage.setItem( "profileImagePath", userData.data.user.avatar )
    }
    if ( Array.isArray( userData.data.user.address ) && userData.data.user.address.length ) {
      window.localStorage.setItem( "phoneNum", userData.data.user.address[0].phonenumber )
    }
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            strict
            sensitive
            exact
            path="/"
            render={() =>
            {
              return <Redirect to="/workspace" />;
            }} />
          <Route strict exact path="/workspace" component={Workspace} />
          <Route path="/dashboard" component={Dashboard} />         
          <Route path="/manage-groups" component={ManageGroups} />
          {/* <Route path="/manage-categories" component={ManageCategories} />
          <Route path="/manage-subcategories" component={ManageSubCategories} /> */}
          <Route path="/manage-attributes" component={ManageAttributes} />
          <Route path="/manage-attribute" component={ManageAttribute} />
          <Route path="/grp-dashboard" component={GroupsDashboard} />
          <Route path="/cat" component={CreateCategory} />
          <Route path="/addcat" component={Form} />
          <Route path="/subcat" component={CreateSubCategory} />
          <Route path="/attri" component={CreateAttribute} />
          <Route path="/treeview" component={TreeViewCategories} />
          <Route path="/manageSub" component={ManageTreeView} />
          <Route exact path="/posts-information" component={PostsMain} />
          <Route exact path="/manage-posts" component={ManagePosts} />
          <Route
            exact
            path="/transactions-information"
            component={TransactionsMain}
          />
          <Route path="/groups-information" component={GroupsMain} />
          <Route path="/users-information" component={UsersMain} />
          <Route path="/users-details" component={UsersDetails} />
          <Route path="/analytics-information" component={AnalyticsMain} />
          <Route path="/posts-details" component={PostsDetailsTable} />
          <Route path={"/group-users"} component={GroupUserDetails} />
          <Route path={"/summary"} component={SummaryMain} />
          <Route path="/profile" component={ProfileMain} />        
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;
