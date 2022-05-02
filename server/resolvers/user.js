const Users = require("../models/user");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

module.exports = {
  Mutation: {
    createUser: async (parent, args, context, info) => {
      
      const { email, firstName, lastName,  password } = args;
      console.log(lastName)
      var encryptedPassword = await bcrypt.hash(password, 10);

      //const user_obj = new Users({ email:email, fname:fname, lastname: lastname, password: encryptedPassword });
      const old_user = await Users.findOne({ email });
      //console.log(user_obj);
      if (old_user === null) {
        const newUser = new Users({
          email: email,
          firstName:firstName,
          lastName:lastName,
          password: encryptedPassword,
        });
        const res = await newUser.save();

        return newUser;
      } else {
        throw new ApolloError("This Email Address all ready Exsist");
        //return ({ sucess: false, message: 'This Email Address all ready Exsist' })
      }
    },
    LoginUser: async (parent, args, context, info) => {
      
      
      const { email, password } = args;
      const chk_users = await Users.findOne({ email });
      //console.log(chk_users)
      if (chk_users && (await bcrypt.compare(password, chk_users.password))) {
        
        const toke = jwt.sign(
          {
            id: chk_users.email,
            password: chk_users.password,
          },
          "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn"
        );

        chk_users.token = toke;
        return chk_users;
        
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
