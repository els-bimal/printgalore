const products = require("../models/products");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {
    SearchProducts: async (parent, args, context, info) => {
      console.log("args");
      console.log(args);
      let searchType =0;//1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 
      const {
        color, // 1
        size, // 2
        brand, // 4
        category, // 8
        search, 
        skip,
        limit
        
      } = args;
      if(color.trim() !== '' ){
        searchType += 1
      }
      if(size.trim() !== '' ){
        searchType += 2
      }
      if(brand.trim() !== '' ){
        searchType += 4
      }
      if(category.trim() !== '' ){
        searchType += 8
      }
      let allProducts = null;
      let searchCriteria = null;
      let searchCriteria2 = null;
      let findCriteria = null;
      switch (searchType){
      case 1:{
          console.log('here');
          searchCriteria = {$and: [
              { color : { $regex: '.*' + color + '.*' }}
          ]}
          break; 
      }
      case 2:{
          searchCriteria = {$and: [
              {size : size}
          ]}
          break; 
      }
      case 3:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {size : size}
          ]}
          break; 
      }
      case 4:{
          searchCriteria = {$and: [
              {brand : { $regex: '.*' + brand + '.*' }}
          
          ]}
          break; 
      }
      case 5:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {brand : { $regex: '.*' + brand + '.*' }}
          ]}
          break; 
      }
      case 6:{
          searchCriteria = {$and: [
              {size : size},
              {brand : { $regex: '.*' + brand + '.*' }}
          ]}
          break; 
      }
      case 7:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {size : size},
              {brand : { $regex: '.*' + brand + '.*' }}
          ]}
          break; 
      }
      case 8:{
          searchCriteria = {$and: [
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 9:{
          searchCriteria = {$and: [
              { color : { $regex: '.*' + color + '.*' }},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 10:{
          searchCriteria = {$and: [
              {size : size},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 11:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {size : size},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 12:{
          searchCriteria = {$and: [
              {brand : { $regex: '.*' + brand + '.*' }},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 13:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {brand : { $regex: '.*' + brand + '.*' }},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 14:{
          searchCriteria = {$and: [
              {size : size},
              {brand : { $regex: '.*' + brand + '.*' }},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }
      case 15:{
          searchCriteria = {$and: [
              {color : { $regex: '.*' + color + '.*' }},
              {size : size},
              {brand : { $regex: '.*' + brand + '.*' }},
              {category : { $regex: '.*' + category + '.*' }},
          ]}
          break; 
      }

      }
      console.log(searchCriteria);
      if(search.trim() !==''){
          if(searchCriteria !== null){
              findCriteria =  {
                  $and: [
                      {
                          $or:[
                                {short_description : { $regex: '.*' + search + '.*' }}, 
                                {prodName : { $regex: '.*' + search + '.*' }},
                                {category : { $regex: '.*' + search + '.*' }},
                                {color : { $regex: '.*' + search + '.*' }},
                                {size : { $regex: '.*' + search + '.*' }},
                                {brand : { $regex: '.*' + search + '.*' }},
                                {productCode : { $regex: '.*' + search + '.*' }},
                                {inventorykey : { $regex: '.*' + search + '.*' }},
                                {keywords : { $regex: '.*' + search + '.*' }},
                                {Style : { $regex: '.*' + search + '.*' }},
                          ]
                      },
                      {$and:[searchCriteria]}
                  ]
                  
              }
              

          }
          else{
          findCriteria =  {$or: [ 
                {short_description : { $regex: '.*' + search + '.*' }}, 
                {prodName : { $regex: '.*' + search + '.*' }},
                {category : { $regex: '.*' + search + '.*' }},
                {color : { $regex: '.*' + search + '.*' }},
                {size : { $regex: '.*' + search + '.*' }},
                {brand : { $regex: '.*' + search + '.*' }},
                {productCode : { $regex: '.*' + search + '.*' }},
                {inventorykey : { $regex: '.*' + search + '.*' }},
                {keywords : { $regex: '.*' + search + '.*' }},
                {Style : { $regex: '.*' + search + '.*' }},
          ] }

          }

      }
      if(findCriteria === null){
      findCriteria = searchCriteria

      }
      console.log('Came here II...')
      console.log(findCriteria) 
      try {

          console.log('processing...')

          allProducts = await products.find(findCriteria).skip(skip).limit(limit)
          console.log('Came here III...')
          console.log(allProducts.length)
          return allProducts;
      }
      catch(err) {
          console.log(err.message);
          throw new ApolloError(err.message);

      }
    },


  },
  Query: {
  }
}

