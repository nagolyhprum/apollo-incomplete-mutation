import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_USER = gql`
  query getUser {
    user {
      id
      name {
        id
        first
        last
        full
      }
    }
  }
`;

const SET_USER = gql`
  mutation setUser($firstname: String!, $lastname: String!) {
    user(firstname: $firstname, lastname: $lastname) {
      id
      name {
        id
        first
        #last
        #full
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={GET_USER}>
      {({ data, loading, error }) => {
        if (loading) return <div>LOADING</div>;
        if (error) return <div>ERROR</div>;

        const { name } = data.user;

        return (
          <Mutation mutation={SET_USER}>
            {setUser => (
              <div>
                <button
                  onClick={() => {
                    setUser({
                      variables: {
                        firstname: "Jane",
                        lastname: "Deer"
                      }
                    });
                  }}
                >
                  Mutate
                </button>
                Hello {name && name.first} {name && name.last}:
                {name && name.full}
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("react")
);
