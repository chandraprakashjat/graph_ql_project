const express = require('express');

const mongoose = require("mongoose");
const schema = require('./server/schema/schema')

//const typesSchema = require('./server/schema/types_schema')

var { graphqlHTTP } = require('express-graphql');

const app = express();

const port = process.env.port || 32 ;

const cors = require("cors");
app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema:schema
  }))

mongoose.connect('mongodb+srv://prakash:QTGOrlYOjFCafqCb@graphqlcluster.uwtd2.mongodb.net/testing?retryWrites=true&w=majority' ,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>
{
app.listen({port:port},()=>{
  console.log(port);
    console.log('listening for request my awsome server port');
})
}).catch((e) => console.log("Error" + e));
