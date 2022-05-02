const administarator = require("./../../models/adminUser");
const products  = require("./../../models/products");
const Product_01 = require('./init_01');
const Product_02 = require('./init_02');
const Product_03 = require('./init_03');
const Product_04 = require('./init_04');
const Product_05 = require('./init_05');
const Product_06 = require('./init_06');
const Product_07 = require('./init_07');
const Product_08 = require('./init_08');
const Product_09 = require('./init_09');
const Product_10 = require('./init_10');
const Product_11 = require('./init_11');
const Product_12 = require('./init_12');
const mongoose = require("mongoose");

//const MONGODB =
//  "mongodb+srv://maduUN:maduPW@cluster0.do5rk.mongodb.net/printglore?retryWrites=true&w=majority";
const MONGODB = "mongodb://localhost:27017/printgloreLDB?retryWrites=true&w=majority"; 

/* This code initializes the database with sample users.
 Note, it does not drop the database - this can be done manually. Having code in your application that could drop your whole DB is a fairly risky choice.*/
(async function initializeDB() {
  console.log('initialize began...')
  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  console.log('processing...')
  
  let count =1;
  let row=1;
  let ProductsList = Product_12; //EDit this 12 times (if you have enough ram you may try a few together) 
  let first = await products.findOne({productCode : ProductsList[0].productCode});
  if (first === null){
    ProductsList.forEach(async (element) => {
    
      let prod = new products();
      prod.productCode = element.productCode;
      prod.category = element.category;
      prod.prodName = element.prodName;
      prod.stock = element.stock;
      prod.short_description = element.short_description;
      prod.prodPrice = element.prodPrice;
      prod.large_pictures = element.large_pictures;
      prod.pictures = element.pictures;
      prod.ratings = element.ratings;
      prod.url = element.urll;
      prod.is_featured = element.is_featured;
      prod.is_new = element.is_new;
      prod.is_top = element.is_top;
      prod.reviews = element.reviews;
      prod.color = element.color;
      prod.size = element.size;
      prod.brand = element.brand;
      prod.inventorykey = element.inventorykey;
      prod.keywords = element.keywords;
      prod.Style = element.Style;
      prod.originStore = "main";
      const res = await prod.save();
      count++;
      if(count % 200 === 0){
        console.log("records upload count is : " + count + " please wait...")
      }
      setTimeout(() => {
      }, 100);
      //console.log(element);
    });

  }
  else{
    console.log('Record exist test failed!! Drop product collection and start again')
    //break;
  }



  //const res = await ProductList.save();

  //console.log(res);


  let find_user = await administarator.findOne({ username : 'bimal@endlinesolutions.com' });
  if (find_user === null) {
    const newUser = new administarator({
      username: 'bimal@endlinesolutions.com',
      firstName: 'Bimal',
      lastName: 'Prematillake',
      contactNumber: '94711326774',
      emailAddress: 'bimal@endlinesolutions.com',
      roleId: '1',
      password: '$2a$10$yVZ.JCpP5NVSj9J8r.1zZezRooUCsTZF9f155oNuasfNafztmPkOG', //123
      resetPassword: true,
      active: true,
      homeStore: '',
      dateCreated: new Date().toISOString(),
      token: '',
    });
    const res = await newUser.save();

  }
  find_user = await administarator.findOne({ username : 'tristan@endlinesolutions.com' });
  if (find_user === null) {

    const newUser = new administarator({
      username: 'tristan@endlinesolutions.com',
      firstName: 'Tristan',
      lastName: 'Perera',
      contactNumber: '94111111111',
      emailAddress: 'tristan@endlinesolutions.com',
      roleId: '1',
      password: '$2a$10$yVZ.JCpP5NVSj9J8r.1zZezRooUCsTZF9f155oNuasfNafztmPkOG', // 123
      resetPassword: true,
      active: true,
      homeStore: '',
      dateCreated: new Date().toISOString(),
      token: '',
    });
    const res = await newUser.save();

  }
  
})();
