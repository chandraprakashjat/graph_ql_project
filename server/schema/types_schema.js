const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const Person = new GraphQLObjectType({
    name: "Person",
    description: "Description.... ",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLInt },
      isMarried: { type: GraphQLBoolean },
      gpa: { type: GraphQLFloat },

      justAType:
      {
          type:Person,
          resolve(parent,args)
          {
              return parent;
          }
      }
    }),
  });

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {

    person:
    {
      type:Person,
      args:{ id:{type:GraphQLID} },
      resolve(parent,args)
      {
          let personObj = 
          {
              id:"23",
              name:"Prakash",
              age:23,
              isMarried:false,
              gpa:23.5
             
          }

          return personObj;
      }  
    }
  },
});



module.exports = new GraphQLSchema({
  query: RootQuery,
});
