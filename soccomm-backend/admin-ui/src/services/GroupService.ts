import { gql } from "@apollo/client";

const GET_ALL_GROUPS = gql`
  query getGroups($toDate: String!,$fromDate: String!) {
    findAllGroupsInRange(fromDate: $fromDate, toDate: $toDate) {
      id
      name
      type
      groupusers {
        user {
          id
        }
      }
    }
  }
`;

const GET_USERS_OF_GROUP = gql`
  query getUsers($id: String!) {
    group(id: $id) {
      groupusers {
        user {
          id
          username
          email
          avatar
        }
      }
    }
  }
`;

const GET_GROUPS_COUNT = gql`
  query groupsCount {
    getGroupsCount
  }
`;

const GROUP_COUNT_FOR_MONTHS = gql`
  query getGroupCountForGraph($monthsArray: [MonthsArrayInput!]!) {
    getGroupCountForGraph(monthsArray: $monthsArray)
  }
`;

export {
  GET_ALL_GROUPS,
  GET_USERS_OF_GROUP,
  GET_GROUPS_COUNT,
  GROUP_COUNT_FOR_MONTHS,
};
