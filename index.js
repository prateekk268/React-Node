const express = require("express");
const {buildSchema} = require("graphql");
const {graphqlHTTP} = require('express-graphql');
const app = express();


/* 
ID
String
Float
Boolean
list = []
*/

let message = "This is a message"

const schema = buildSchema(`

type Post {
      userId : Int
      id : Int
      title : String
      body : String
}

type User {
    name : String
    age : Int
    college : String
}

type Query {
    hello : String!
    welcomeMessage(name: String, dayOfWeek : String!): String
    getUser : User
    getUsers : [User]
    getPostsFromExternalAPI : [Post]
    message : String
}

input UserInput {
    name : String!
    age : Int!
    college : String!
}

type Mutation {
    setMessage(newMessage : String): String
    createUser(user : UserInput) : User
}
`)




const root = {
    hello : ()=> {
        return "Hello world!!!"
    },
    welcomeMessage : args => {
        console.log(args);
        return `Hey ${args.name}, hows life, today is ${args.dayOfWeek}`
    },
    getUser : ()=> {
        const user = {
            name : "Prateek Kumar",
            age : 24,
            college : "SVIET"
        };
        return user
    },
    getUsers : ()=> {
   const users = [
    {
        name : "Prateek",
        age : 24,
        college : "Sviet"
    },
    {
        name : "Rahul",
        age : 32,
        college : "Mit"
    },
   ]
   return users
    },
    getPostsFromExternalAPI : ()=> {

    },
    setMessage : ({newMessage})=> {
        message = newMessage
        return message
    },
    message : ()=> message,
    createUser : (args) => {
        console.log(args);
        return args.user;
    }
};

app.use("/graphql",graphqlHTTP({
    graphiql : true,
    schema : schema,
    rootValue : root,
}));


app.listen(4000, ()=> console.log("Server on PORT : 4000"));