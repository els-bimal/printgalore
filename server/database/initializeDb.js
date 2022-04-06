const  defaultState  = require('./defaultState');
const  connectDB  = require('./connectdb');

/* This code initializes the database with sample users.
 Note, it does not drop the database - this can be done manually. Having code in your application that could drop your whole DB is a fairly risky choice.*/
(async function initializeDb() {
  let db = await connectDB();
  let user = await db.collection(`users`).findOne({ email: 'bprematillake@gmail.com' });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
})();
