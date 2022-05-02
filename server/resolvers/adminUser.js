const AdminUsers = require("../models/adminUser");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailWelcomeUser = require("../emails/SendNewAdminUserEmail");
const emailResetAdmineUser = require("../emails/resetAdminUserEmail");
var generator = require('generate-password');

//const { serialize } = require("cookie");

module.exports = {
  Mutation: {
    createAdminUser: async (parent, args, context, info) => {
      console.log('*********[0]********');
      const { username, firstName, lastName, emailAddress, contactNumber } = args;
      console.log(username);

      const passwordnew = generator.generate({
        length: 10,
        numbers: true
      });      
      var passwordHash = await bcrypt.hash(
        '123',// REPLACE 123 => passwordnew ONECE EMAIL CONFIGURED
        10);

      const find_user = await AdminUsers.findOne({ username });
      if (find_user === null) {
        const newUser = new AdminUsers({
            username: username,  
            emailAddress: emailAddress,
            firstName:firstName,
            lastName:lastName,
            password: passwordHash,
            contactNumber : contactNumber,
            resetPassword: true,
            active: true,
            roleId:'',
            homeStore: '',
            dateCreated:  new Date().toISOString(),
            token : ''

        });
        console.log('before admin user saved');
        console.log(newUser);
        const res = await newUser.save();
        //username is also the email 
        /*
        ***********CONFIGURE EMAIL AND UNCOMMENT HERE***********
        */
        //emailWelcomeUser(username, username, firstName, password);
        console.log('admin user saved');
        console.log(newUser);
        console.log(res);
        return res;
      } else {
        console.log('Admin username allready exist');  
        throw new ApolloError("This user name all ready Exsist");
        //return ({ sucess: false, message: 'This Email Address all ready Exsist' })
      }
    },


    LoginAdminUser: async (parent, args, context, info) => {
      
      const { username, password } = args;
      try{
        const passwordHash = await bcrypt.hash(password, 10);
        
        const find_user = await AdminUsers.findOne({ username });
        if (find_user !== null) {
          if (find_user && (await bcrypt.compare(password, find_user.password))) {
            const token = jwt.sign({
                id: find_user.username,
                password: find_user.password,
              },
              "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn"
            );

            find_user.token = token;
            return find_user;
          }
          else{

          }
          
        }
        
        throw new ApolloError("Incorrect user-name or password");
      }
      catch(err) {
        throw new ApolloError(err.message);
      }
      
    },
    ResetAdminUser: async (parent, args, context, info) => {
      
      console.log('Reset Password');
      const { username, password, newpassword } = args;
      try {
        const find_user = await AdminUsers.findOne({ username });
        //console.log(chk_users)
        var passwordHash = await bcrypt.hash(newpassword, 10);
        if (find_user && (await bcrypt.compare(password, find_user.password))) {
          console.log('Found...');

          let filter = { _id: find_user._id };
          let update = { password : passwordHash, resetPassword : false };
          let updated_doc = await AdminUsers.findOneAndUpdate(filter, update, {
            new: true
          });
          if(updated_doc){
            console.log('Reset Done!!');
            const token = jwt.sign({
                id: updated_doc.username,
                password: updated_doc.password,
              },
              "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn"
            );

            updated_doc.token = token;
            /*
            ***********CONFIGURE EMAIL AND UNCOMMENT HERE***********
            */
            //emailResetAdmineUser(updated_doc.username, updated_doc.username, updated_doc.firstName);
            //console.log('email sent');
            return updated_doc;

          }  
          throw new ApolloError("Reset password failed");
        } 
        else{
          throw new ApolloError("Incorrect Username Or password");
        }
      }
      catch(err) {
        throw new ApolloError(err.message);
      }

    },
    FogotAdminPassword: async (parent, args, context, info) => {
      
      console.log('Reset Password');
      const { username } = args;
      try {
        const passwordnew = generator.generate({
          length: 10,
          numbers: true
        });      
        var passwordHash = await bcrypt.hash(
          '123', //REPLACE 123 => passwordnew 
          10);

        const find_user = await AdminUsers.findOne({ username });
        if (find_user !== null) {
          let filter = { _id: find_user._id };
          let update = { password : passwordHash, resetPassword : true };
          let updated_doc = await AdminUsers.findOneAndUpdate(filter, update, {
            new: true
          });
          if(updated_doc){
            console.log('Reset Done!!');
            updated_doc.token = '';
            /*
            ***********CONFIGURE EMAIL AND UNCOMMENT HERE***********
            */
            //emailResetAdmineUser(updated_doc.username, updated_doc.username, updated_doc.firstName);
            //console.log('email sent');
            
            return updated_doc;

          }
        } 
        else{
          throw new ApolloError("No such user found");
        }
      }
      catch(err) {
        throw new ApolloError(err.message);
      }

    },
  },
  Query: {
    hello: async () => {
      return "User";
    },

    chkLogin: async (parent, args, context, info) => {
      const { username, password } = args;
      const chk_users = await AdminUsers.findOne({ username });
      //console.log(chk_users)
      if (chk_users && (await bcrypt.compare(password, chk_users.password))) {
        return chk_users;
      }
    },
  }
};
