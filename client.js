import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  getUserFullName,
  getUserFirstName,
  getUserLastName,
  getUserId,
  getNameId
} from "./fragments";

const getFullUser = gql`
  query getFullUser {
    ...getNameId
    ...getUserId
    ...getUserFirstName
    ...getUserLastName
    ...getUserFullName
  }
  ${getNameId}
  ${getUserId}
  ${getUserFirstName}
  ${getUserLastName}
  ${getUserFullName}
`;

const getPartialUser = gql`
  query getPartialUser {
    ...getNameId
    ...getUserId
    ...getUserFirstName
    ...getUserLastName
  }
  ${getNameId}
  ${getUserId}
  ${getUserFirstName}
  ${getUserLastName}
`;

const SET_USER = gql`
  mutation setUser($firstname: String!, $lastname: String!) {
    user(firstname: $firstname, lastname: $lastname) {
      id
      name {
        id
        first
        last
      }
    }
  }
`;

//APOLLO
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:8080/graphql"
});
const client = new ApolloClient({
  cache,
  link
});

const ShowUser = ({ query, children }) => {
  return (
    <Query query={query}>
      {({ data, loading, error }) => {
        if (loading) return <div>LOADING</div>;
        if (error) return <div>ERROR</div>;

        return (
          <>
            <pre>{JSON.stringify(data, null, "\t")}</pre>
          </>
        );
      }}
    </Query>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ShowUser query={getFullUser} />
    <ShowUser query={getPartialUser} />
    <Mutation mutation={SET_USER} refetchQueries={() => ["getFullUser"]}>
      {setUser => (
        <button
          onClick={() => {
            setUser({
              variables: {
                firstname: "Jane",
                lastname: "Doe"
              }
            });
          }}
        >
          Mutate
        </button>
      )}
    </Mutation>
  </ApolloProvider>,
  document.getElementById("react")
);
