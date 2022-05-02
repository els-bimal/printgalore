import gql from 'graphql-tag'


export const SAERCH_PRODUCT_ADMIN = gql`
  mutation SearchProducts($color: String!, $size: String!, $brand: String!, $category: String!, $search: String!, $skip: Int!, $limit: Int){
    SearchProducts(color: $color, size: $size, brand: $brand, category: $category, search: $search, skip: $skip, limit: $limit) {
      data {
        productCode
        category
        prodName
        stock
        short_description
        prodPrice
        large_pictures{
          width 
          height
          url
        }
        pictures{
          width
          height
          url
        }
        ratings
        url
        is_featured
        is_new
        is_top
        reviews
        color
        size
        brand
      }
    }
  }`;
