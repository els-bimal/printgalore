const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        id: Int!
        name: String
        slug: ID
        short_description: String
        price: [Float]
        until: String
        sku: String
        stock: Int
        ratings: Float
        reviews: Int
        sale_count: Int
        is_top: Boolean
        is_new: Boolean
        is_featured: Boolean
        small_pictures: [Media]
        pictures: [Media]
        large_pictures: [Media]
        brands: [ProductBrand]
        tags: [ProductTag]
        categories: [ProductCategory]
        variants: [Variant]
        content: String
        discount: Int
    }

    type Media {
        width: Int
        height: Int
        url: String
    }

    type Variant {
        price: Float
        sale_price: Float
        size: Size
        color: Color
    }

    type Size {
        name: String
        size: String
        thumb: Media
    }

    type Color {
        name: String
        color: String
        thumb: Media
    }

    type ProductTag {
        id: Int!
        name: String
        slug: ID
    }

    type ProductCategory {
        id: Int!
        name: String
        slug: ID
    }

    type ProductCategoryResponse {
        id: Int!
        name: String
        slug: ID
        children: [ProductCategory]
    }

    type ProductBrand {
        id: Int!
        name: String
        slug: ID
    }

    type Video {
        url: String,
        width: Int,
        height: Int
    }

    type Post {
        id: Int!
        title: String
        slug: ID
        author: String
        date: String
        comments: Int
        content: String
        type: PostType
        large_picture: [Media]
        picture: [Media]
        small_picture: [Media]
        video: Video
        categories: [PostCategory]
    }

    type PostCategory {
        id: Int!
        name: String
        slug: ID
    }

    
    enum PostType {
        image
        video
        gallery
    }

    type ProductSingleResponse {
        data: Product
        prev: Product
        next: Product
        related: [Product]
    }

    type SpecialProducts {
        featured: [Product]
        bestSelling: [Product]
        topRated: [Product]
        latest: [Product]
        onSale: [Product]
    }

    type ShopSidebarResponse {
        categories: [ProductCategoryResponse],
        featured: [Product]
    }

    type ShopResponse {
        data: [Product]
        total: Int
        slugs: [String]
    }

    type PostsResponse {
        data: [Post]
        total: Int
        counts: [Int]
    }

    type PostSingleResponse {
        data: Post
        related: [Post]
    }

    type PostSidebarResponse {
        categories: [PostCategory]
        recent: [Post]
    }

    type PaymentResponse {
        msg: String
        paymentDetailId: String
        status: Int
        KeyedSaleTxnResponseData: KeyedSaleTxnResponseData 
        errData: ErrorData
    }

    type KeyedSaleTxnResponseData {
        success: Boolean,
        response_code: Int,
        status_message: String,
        transaction_id: String,
        approval_code: String,
        approval_message: String,
        avs_response: String,
        csc_response: String,
        external_transaction_id: String,
        masked_card_number: String,
    }

       
    type ErrorData{
        success: Boolean,
        response_code: Int,
        status_message: String,
        external_transaction_id: String,
        masked_card_number: String,
        errArr : [String]
    }

       
    type User{
        email : String
        firstName:String
        lastName:String
        password : String
        token : String
    }

    input RegisterInput{
        email : String
        firstName:String
        lastName:String
        password : String
        token : String
    }
    input UserInput{
        email : String
        password : String
        token : String
    }
    type ProductCategoryFromProdDB{
        _id:String
        category: String
        url: String
    }
    type ProductSizefromProdDB{
        _id:String
        size: String
    }

    type ProductColorfromProdDB{
        _id:String
        color: String
    }
    type ProductBrandfromProdDB{
        _id:String
        brand: String
    }
    


    type prodcats{
        _id:String
        category: String
        url: String
    }

    type prodshop{
        _id: String
        category: String
        prodName: String
        stock:Int
        short_description : String
        prodPrice: Float
        large_pictures: [Media]
        pictures:[Media]
        ratings: Float
        url:  String
        is_featured: Boolean
        is_new: Boolean
        is_top: Boolean
        reviews: Float
        color:String
        size:String
        brand:String
    }
    type products{
        data:[prodshop]
        total:Int
    }

    type productsdet{
        _id: String
        category: String
        prodName: String
        stock:Int
        short_description : String
        prodPrice: Float
        large_pictures: [Media]
        pictures:[Media]
        ratings: Float
        url:  String
        is_featured: Boolean
        is_new: Boolean
        is_top: Boolean
        reviews: Float
        color:String
        size:String
        brand:String
    }

    type order{
        _id:String
    }

    type orderDet{
        _id:String
        salesOrderId:Int
        billingDetails:billingDetails
        shippingDetails:shippingDetails
        isDeferentShip:Boolean,
        isUserAgree:Boolean,
        status:Int
        payMethod:String
        dateTime:String
        total: Float
        product: [productOrder]
        isUserLoged:Boolean
        userId:String
        paymentDetailId:String

        
    }

    type productOrder{
        prodId: String,
        prodName:String
        qty: Int,
        price:Float

    }

    type billingDetails{
        first:String
        last:String
        company:String
        country:String
        address1:String
        address2:String
        state:String
        city:String
        phone:String
        zip:String
        email:String
        adtional_info:String
    }

    type shippingDetails{
        first:String
        last:String
        company:String
        country:String
        address1:String
        address2:String
        state:String
        city:String
        phone:String
        zip:String
        email:String
        adtional_info:String
    }
  
    
    
    input productInput{
        prodId: String,
        prodName:String
        qty: Int,
        price:Float

    }
    input PictureFormatInput{
        width:Float,
        height:Float,
        url:String,
    }
    

    input orderInput{
        first:String
        last:String
        company:String
        country:String
        address1:String
        address2:String
        state:String
        city:String
        phone:String
        zip:String
        email:String
        adtional_info:String
    }

    input CreditCard{
        number:String
        expiration_month:String
        expiration_year:String
 
    }

    input BillingAddress{
        name:String
        street_address:String
        city:String
        state:String
        zip:String
    }

    type ProductSearchResult {
        products: [Product]
        color: [String]
        size: [String]
        brand: [String]
    
    }


    type Query {
        hello: String
        hello1: String
        products(demo: String!, search: String, colors: [String] = [], sizes: [String] = [], brands: [String] = [], min_price: Int = null, max_price: Int = null, category: String, tag: String, ratings:[Int] = [], sortBy: String, from: Int = 0, to: Int): ShopResponse
        product(demo: String!, slug: String!, onlyData: Boolean): ProductSingleResponse
        specialProducts(demo: String!, featured: Boolean, bestSelling: Boolean, topRated: Boolean, latest: Boolean, onSale: Boolean, count: Int): SpecialProducts
        shopSidebarData(demo: String!, featured: Boolean): ShopSidebarResponse
        dealProducts(demo: String!, count: Int = 1): [Product]
        posts(demo: String!, category: String, from: Int = 0, to: Int, categories: [String]): PostsResponse
        post(demo: String!, slug: String!): PostSingleResponse
        postSidebarData(demo: String!): PostSidebarResponse
        
        chkLogin(email: String!, password:String):User
        user_by_email(email: String):User
        getsProdCat:[prodcats],
        getsProd(_id:String, prodPrice:Float, color:String, size:String, brand:String, category:String, from:Int, to:Int, minprice:Float, maxprice:Float, search: String):products,
        prod_by_id(_id:String):[productsdet],
        orderById(_id:String):orderDet,
        getOrdersByUserId(userId:String!):[orderDet],
        allOrders:[orderDet],
        getProdFromProduct:[ProductCategoryFromProdDB]
        getSizeFromDbProduct:[ProductSizefromProdDB]
        getColorFromDbProduct:[ProductColorfromProdDB]
        getBrandFromDbProduct:[ProductBrandfromProdDB]
        
        tryPayment(credit_card: CreditCard!, csc: String!, amount: Float!, billing_address: BillingAddress!): PaymentResponse!
    }

    type adminUser {
        username: String
        firstName: String!
        lastName: String!
        contactNumber: String!
        emailAddress: String!
        roleId: String!
        password: String!
        resetPassword: Boolean!
        active: Boolean!
        homeStore: String!
        dateCreated: String!
        token: String!
    }
    type ImageProp {
        width: Int! 
        height: Int! 
        url:String!
    }

    type adminProduct {
        productCode: String!
        category: String!
        prodName: String!
        stock:Float!
        short_description: String!
        prodPrice: Float!
        large_pictures: [ImageProp!]!
        pictures:[ImageProp!]!
        ratings: Float!
        url: String
        is_featured: Boolean!
        is_new: Boolean!
        is_top: Boolean!
        reviews: Float!
        color: String!
        size: String!
        brand: String!
        inventorykey: String!
        keywords: String!
        Style: String!
        originStore: String!
    }
    
    
    type Mutation {
    createUser(email:String, firstName:String, lastName:String password:String):User!
    LoginUser(email:String, password:String):User!
    createOrder(billingDetails: orderInput, shippingDetails:orderInput, product:[productInput],isDeferentShip:Boolean, isUserAgree: Boolean, status:Int , payMethod:String , dateTime:String, total: Float, isUserLoged:Boolean, userId:String, paymentDetailId:String):order! 
    LoginAdminUser(username:String, password:String):adminUser!
    createAdminUser(username:String, firstName:String, lastName:String, emailAddress:String, contactNumber:String):adminUser!
    ResetAdminUser(username:String, password:String, newpassword:String):adminUser!
    FogotAdminPassword(username:String):adminUser!
    SearchProducts(color:String, size:String, brand:String, category:String, search : String, skip : Int, limit : Int ):[adminProduct!]!
 
}
`

module.exports = typeDefs;