import gql from "graphql-tag";

export const getNameId = gql`
  fragment getNameId on RootQueryType {
    user {
      name {
        id
      }
    }
  }
`;

export const getUserId = gql`
  fragment getUserId on RootQueryType {
    user {
      id
    }
  }
`;

export const getUserFirstName = gql`
  fragment getUserFirstName on RootQueryType {
    user {
      name {
        first
      }
    }
  }
`;

export const getUserLastName = gql`
  fragment getUserLastName on RootQueryType {
    user {
      name {
        last
      }
    }
  }
`;

export const getUserFullName = gql`
  fragment getUserFullName on RootQueryType {
    user {
      name {
        full
      }
    }
  }
`;
