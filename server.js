import express from "express";
import path from "path";
import graphqlHTTP from "express-graphql";

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

const Name = new GraphQLObjectType({
  name: "Name",
  fields: {
    id: {
      type: GraphQLID,
      resolve(self) {
        return `${self.first} ${self.last}`;
      }
    },
    first: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    },
    full: {
      type: GraphQLString,
      resolve(self) {
        return `${self.first} ${self.last}`;
      }
    }
  }
});

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: Name
    }
  }
});

var user = {
  id: "abc123",
  name: null
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      user: {
        type: User,
        resolve() {
          return user;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      user: {
        type: User,
        args: {
          firstname: {
            type: GraphQLString
          },
          lastname: {
            type: GraphQLString
          }
        },
        resolve(parent, args, context) {
          user.name = {
            first: args.firstname,
            last: args.lastname
          };
          return user;
        }
      }
    }
  })
});

const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(8080, () => console.log("listening"));
