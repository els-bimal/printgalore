const orders = require("../models/orders");

const bcrypt = require("bcryptjs");

//let passhash = ''
//const a = async () =>{
//  await bcrypt.hash('abc123', 10).then(result => console.log(result))
//}
//a();  


module.exports = defaultState = {
  user: [
    {
      email: 'bprematillake@gmail.com',
      password : '$2a$10$.aRu1TUIQGcvuoOjBZ8kquQym16iRHhRZ11Mbac09dkcDNiUCpKf.',
      firstName: 'Bimal',
      lastName: 'Prematillake',
      token: '',
    },
    {
      email: 'bimal@endlinesolution.com',
      password : '$2a$10$.aRu1TUIQGcvuoOjBZ8kquQym16iRHhRZ11Mbac09dkcDNiUCpKf.',
      firstName: 'Bimal',
      lastName: 'Prematillake',
      token: '',
    }
  ],
  products:[
    {
      category: '0001',
      prodName: 'Single door',
      stock: 121,
      short_description: 'Single door 9V',
      prodPrice: 129,
      large_pictures: [
        {
          width: 5, 
          height: 7, 
          url:''
        }
        ],
      pictures:[
        {
          width: 1, height: 1, url:''
        }
      ],
      ratings: 4.5,
      url:  '',
      is_featured: false,
      is_new: false,
      is_top: false,
      reviews: 10,

    } 
  ],
  orders:[
    {
    shipingDetails: {
        first: 'Bimal',
        last: 'Prematillake',
        company: 'A & Co',
        country: 'Sri Lanka',
        address1: '',
        address2: '',
        state: '',
        city: '',
        phone: '',
        zip: '',
        email: '',
        adtional_info: ''
    },
    differentShipingDetails: {
        first: '',
        last: '',
        company: '',
        country: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        phone: '',
        zip: '',
        email: '',
        adtional_info: ''
    },
    product: [
        {
            prodId: '',
            prodName:'',
            qty: 2,
            price:129
        },
    ],
    isDeferentShip:false,
    isUserAgree:false,
    status:0,
    payMethod:1,
    dateTime:'2022-03-31',
    total: 0,
    isUserLoged:false,
    userId:'bprematilake@gmail.com'

    }
  ],
  prodcats:[
    {
      _id: '0001',
      catName : 'Cat 1',
      imageUrl : ''
    }
  ]   
};
