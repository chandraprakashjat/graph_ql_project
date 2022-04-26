const graphql = require("graphql");

const _ = require("lodash");

const User = require("../models/User");
const Hobbey = require("../models/Hobbey");
const Post = require("../models/Post");
const { type } = require("express/lib/response");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//Dummy Data

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(postType),
      resolve(parent, args) {
        return Post.find({ userId: parent.id });
        //return _.filter(postData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbeyType),
      resolve(parent, args) {
        return Hobbey.find({ userId: parent.id });
        //return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbeyType = new GraphQLObjectType({
  name: "Hobbey",
  description: "User Hobbies...",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const postType = new GraphQLObjectType({
  name: "Post",
  description: "Post Description..",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

//RootQuery

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },

    hobbey: {
      type: HobbeyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Hobbey.findById(args.id);
      },
    },

    hobbies: {
      type: new GraphQLList(HobbeyType),
      resolve(parent, args) {
        return Hobbey.find({});
      },
    },

    post: {
      type: postType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve(parent, args) {
        return Post.find({});
      },
    },
  },
});

//Mutations

var Mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        // id:{type:GraphQLID},
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },

    //Update User
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession,
            },
          },
          { new: true }
        );
      },
    },

    //Remove User

    RemoveUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        let removedUser = User.findByIdAndRemove(args.id).exec();
        if(!removedUser)
        {
           throw new "Error"();
        }

        return removedUser;
      },
    },

    // Create Post Mutations

    CreatePost: {
      type: postType,
      args: {
        // id:{type:GraphQLID},
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = Post({
          id: args.id,
          comment: args.comment,
          userId: args.userId,
        });

        return post.save();
      },
    },

    //Update Post

    UpdatePost: {
      type: postType,
      args: {
        postId: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.postId,
          {
            $set: {
              comment: args.comment,
              
            },
          },
          { new: true }
        );
      },
    },

    //Remove Post

    RemovePost: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let removedPost = Post.findByIdAndRemove(args.id).exec();

        if(!removedPost)
        {
           throw new "Error"();
        }

        return removedPost;
      },
    },

    // Todo: Create Hobbie Mutations

    CreateHobbey: {
      type: HobbeyType,
      args: {
        //  id:{type:GraphQLID}
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let hobbey = Hobbey({
          title: args.title,
          description: args.description,
          userId: args.userId,
        });

        return hobbey.save();
      },
    },

    //Update Hobbey

    UpdateHobbey: {
      type: HobbeyType,
      args: {
        hobbeyId: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        
      },
      resolve(parents, args) {
        return Hobbey.findByIdAndUpdate(
          args.hobbeyId,
          {
            $set: {
              title: args.title,
              description: args.description,
             
            },
          },
          { new: true }
        );
      },
    },

    //Remove Hobbey

    RemoveHobbey: {

      type:HobbeyType,
      args:
      {
        id:{type: new GraphQLNonNull(GraphQLID)},

      },
      resolve(parent,args)
      {
        let removedHobbey = Hobbey.findByIdAndRemove(args.id).exec();

        if(!removedHobbey)
        {
         throw new "Hobbey"();
        }

        return removedHobbey;
      }
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
