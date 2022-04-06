const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
let db = null;

module.exports = async function connectDB() {
  if (db) {
    return db;
  }

  let client = await MongoClient.connect(url, { useNewURLParser: true });
  db = client.db('printglore');
  console.info('got db', db);
  return db;
}
