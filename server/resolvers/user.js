const Users = require("../models/user");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const { serialize } = require("cookie");

//import uuid from 'uuid';
//import md5 from 'md5';
const  connectDB  = require('../database/connectDB');
//import { assembleUserState } from './utility';

const authenticationTokens = [];



module.exports = {
  Mutation: {
    createUser: async (parent, args, context, info) => {
      
      const { email, firstName, lastName,  password } = args;
      console.log(lastName)
      var encryptedPassword = await bcrypt.hash(password, 10);

      let db = await connectDB();
      let collection = db.collection(`user`);

      let user = await collection.findOne({ email: email });
      if (user) {
        throw new ApolloError("This Email Address all ready Exsist");
      }


      const newUser = new Users({
        email: email,
        firstName:firstName,
        lastName:lastName,
        password: encryptedPassword,
      });

      await collection.insertOne(newUser)
       
    },

    LoginUser: async (parent, args, context, info) => {
      const { email, password } = args;
      const chk_users = await Users.findOne({ email });

      let db = await connectDB();
      let collection = db.collection(`user`);

      let user = await collection.findOne({ email: email });
      if (!user) {
        throw new ApolloError("Incorrect Username Or password");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        
        const toke = jwt.sign(
          {
            id: user.email,
            password: user.password,
          },
          "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn"
        );
        user.token = toke
      
        return user;
        
      } else {
        throw new ApolloError("Incorrect Username Or password");
      }
    },
  },
  Query: {
    hello: async () => {
      return "User";
    },

    chkLogin: async (parent, args, context, info) => {
      console.log('chkLogin ______________ 000 ______')

      const { email, password } = args;
      const chk_users = await Users.findOne({ email });
      //console.log(chk_users)
      if (chk_users && (await bcrypt.compare(password, chk_users.password))) {
        return chk_users;
      }
    },

    user_by_email: async (parent, args, context, info) => {
      console.log("RUNNING GET USER BY EMAIL")
      const { email } = args;
      const user = await Users.findOne({email})
console.log(user)
      if(user){
        return user
      } else {
        return {msg: "none"}
      }



    }
  },
};


/*

export const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send(`User not found`);
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      return res.status(500).send('Password incorrect');
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });

    let state = await assembleUserState(user);

    res.send({ token, state });
  });

  app.post('/user/create', async (req, res) => {
    let {
      username,
      password,
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      roleId,
      resetPassword,
      active,
      homeStore,
      dateJoined,
    } = req.body;
    console.log(username, password);
    let db = await connectDB();
    let collection = db.collection(`users`);
    let user = await collection.findOne({ name: username });
    if (user) {
      res.status(500).send({ message: 'A user with that account name already exists.' });
      return;
    }

    let userID = uuid();
    let groupID = uuid();

    await collection.insertOne({
      name: username,
      id: userID,
      passwordHash: md5(password),
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      roleId,
      resetPassword,
      active,
      homeStore,
      dateJoined,
    });

    let state = await assembleUserState({ id: userID, name: username });

    res.status(200).send({ userID, state });
  });
};


*/