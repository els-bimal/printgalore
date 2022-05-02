const products = require("./../../models/products");
const { ApolloError } = require("apollo-server-errors");
const { ProductSearchResult } = require("./../../utils/common")

const mongoose = require("mongoose");

//const MONGODB =
//  "mongodb+srv://maduUN:maduPW@cluster0.do5rk.mongodb.net/printglore?retryWrites=true&w=majority";
const MONGODB = "mongodb://localhost:27017/printgloreLDB?retryWrites=true&w=majority"; 




const SearchProducts = async (    
    color, // 1
    size, // 2
    brand, // 4
    category, // 8
    search, 
    skip,
    limit
) => {
    console.log('Came here...')
    let searchType =0;//1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 
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
    console.log(searchType);
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

        console.log('initialize began...')
        await mongoose.connect(MONGODB, { useNewUrlParser: true });
        console.log('processing...')

        console.log(skip);
        console.log(limit);
        allProducts = await products.find(findCriteria).skip(skip).limit(10000)
        console.log('Came here III...')
        //let havemore = null;
        //let count = 0;
        //if(skip !== 0){
        //    havemore = await products.find(findCriteria).skip(skip + limit ).limit(1)
        //    count = havemore.length();
        //}
        //console.log(allProducts)
        console.log(allProducts.length)
        return allProducts;
    }
    catch(err) {
        console.log(err.message);
    }
   
    //const result = new ProductSearchResult();
    ///result.products = allProducts;
    //result.color = [];//getUniqueColor(allProducts);
    //result.size = [];//getUniqueSize(allProducts);
    //result.brand = [];//getUniqueBrand(allProducts);
    //return result;
}

module.exports = SearchProducts;