import { gql } from "@apollo/client";

const USER_LOGIN = gql`
  mutation createLogin($email: String!, $password: String!) {
    login(login: { email: $email, password: $password }) {
      userId
      token
    }
  }
`;

const GET_USER_DATA_BY_UID = gql`
  query getUserDetailsByUId($id: String!) {
    user(id: $id) {
      username      
      email   
      avatar
      lastLogin
      address{
      phonenumber
     }     
    }
  }
`;

const GET_COUNT_OF_USERS_BY_STATUS = gql`
  query getUsersCount($fromDate: String!, $toDate: String!) {
    getCountOfActiveAndInactiveUsers(fromDate: $fromDate, toDate: $toDate)
  }
`;

const GET_USERS_BY_ACTIVITY_STATUS = gql`
  query getUsersByStatus($isActive: Boolean!,$fromDate: String!, $toDate: String!) {
    getUsersByStatus(isActive: $isActive,fromDate: $fromDate, toDate: $toDate) {
      id
      username
      email
      avatar
      createdAt
    }
  }
`;

const GET_USERS_COUNT = gql`
  query getCountOfUsers {
    findCount
  }
`;

const USER_COUNT_FOR_MONTHS = gql`
  query getUserCountForGraph($monthsArray: [MonthsArrayInput!]!) {
    getUserCountForGraph(monthsArray: $monthsArray)
  }
`;

const UPDATE_USER_AVATAR = gql`
mutation updateUserAvatar($id: String!, $avatar: String){
  updateUser(updateUserInput: {id: $id,avatar: $avatar}){
    __typename
  }
}
`;

const UPDATE_USER_LAST_LOGIN = gql`
mutation updateUserAvatar($id: String!, $lastLogin: DateTime){
  updateUser(updateUserInput: {id: $id,lastLogin: $lastLogin}){
   __typename
  }
}
`;

export {
  USER_LOGIN,
  GET_USERS_BY_ACTIVITY_STATUS,
  GET_COUNT_OF_USERS_BY_STATUS,
  GET_USER_DATA_BY_UID,
  GET_USERS_COUNT,
  USER_COUNT_FOR_MONTHS, 
  UPDATE_USER_AVATAR,
  UPDATE_USER_LAST_LOGIN
};
