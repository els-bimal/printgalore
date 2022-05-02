const products = require("../models/products");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {},
  Query: {
    getProdFromProduct: async (parent, args, context, info) => {
      // const cat = [];
      // const prodcata = await products.find();
      // //const prodcat =  products.distinct("category")
      // const unique = [...new Set(prodcata.map((item) => item.category))];

      // //console.log(unique);
      // for (var index = 0; index < unique.length; index++) {
      //   //console.log(unique);
      //   let cata = {
      //     _id: index + 1,
      //     category: unique[index],

      //   };
      //   cat.push(cata);
      //   //console.log(cat);
      // }

      const cat = [];
      var lastStr = " ";
      const prodcata = await products.find();
      //const prodcat =  products.distinct("category")
      const unique = [...new Set(prodcata.map((item) => item.category))];

      //console.log(unique);
      for (var index = 0; index < unique.length; index++) {
        //console.log(unique);

        var catStr = unique[index];
        var firstr = catStr.charAt(0);
        if (lastStr !== firstr) {
          lastStr = firstr;
          let cata = {
            _id: index + 1,
            category: unique[index],
          };
          cat.push(cata);
        }
        //console.log(cat);
      }

      return cat;
    },

    getSizeFromDbProduct: async (parent, args, context, info) => {
      const cat = [];
      const prodcata = await products.find();
      //const prodcat =  products.distinct("category")
      const unique = [...new Set(prodcata.map((item) => item.size))];
      for (var index = 0; index < unique.length; index++) {
        //console.log(unique[index]);
        let cata = {
          _id: index + 1,
          size: unique[index],
        };
        cat.push(cata);
        //console.log(cat);
      }
      return cat;
    },

    getColorFromDbProduct: async (parent, args, context, info) => {
      const cat = [];
      const prodcata = await products.find();
      //const prodcat =  products.distinct("category")
      const unique = [...new Set(prodcata.map((item) => item.color))];
      for (var index = 0; index < unique.length; index++) {
        //console.log(unique[index]);
        let cata = {
          _id: index + 1,
          color: unique[index],
        };
        cat.push(cata);
        //console.log(cat);
      }
      return cat;
    },

    getBrandFromDbProduct: async (parent, args, context, info) => {
      const cat = [];
      const prodcata = await products.find();
      //const prodcat =  products.distinct("category")
      const unique = [...new Set(prodcata.map((item) => item.brand))];
      for (var index = 0; index < unique.length; index++) {
        //console.log(unique[index]);
        let cata = {
          _id: index + 1,
          brand: unique[index],
        };
        cat.push(cata);
        //console.log(cat);
      }
      return cat;
    },

    getsProd: async (parent, args, context, info) => {
      console.log("args");
      console.log(args);
      const {
        color,
        size,
        brand,
        category,
        from,
        to,
        minprice,
        maxprice,
        search,
      } = args;
      const allProducts = await products.find();
      let prod = [];
      let flag = false;

      if (search) {
        flag = true;
        prod = allProducts.filter((auto) =>
          auto.prodName.toLowerCase().includes(search.toLowerCase())
        );
        //console.log(filterd);
        //prod.push(filterd[0]);
      }

      if (color) {
        flag = true;
        const colorarr = color.split(",");
        for (var index = 0; index < colorarr.length; index++) {
          const filterd = allProducts.filter((auto) =>
            auto.color.toLowerCase().includes(colorarr[index].toLowerCase())
          );
          prod.push(filterd[0]);
        }
      }
      if (size) {
        flag = true;
        const sizearr = size.split(",");
        for (var index = 0; index < sizearr.length; index++) {
          const filterd = allProducts.filter((auto) =>
            auto.size.toLowerCase().includes(sizearr[index].toLowerCase())
          );
          prod.push(filterd[0]);
          //console.log(prod)
        }

        /*
        flag = true;
        prod = allProducts.filter((auto) =>
          auto.size.toLowerCase().includes(size.toLowerCase())
        );*/
      }

      if (brand) {
        flag = true;
        const brandarr = brand.split(",");
        for (var index = 0; index < brandarr.length; index++) {
          const filterd = allProducts.filter((auto) =>
            auto.brand.toLowerCase().includes(brandarr[index].toLowerCase())
          );
          prod.push(filterd);
          //console.log(prod)
        }

        /*
        flag = true;
        prod = prod.filter((auto) =>
          auto.brand.toLowerCase().includes(brand.toLowerCase())
        );
        */
      }

      if (category) {
        flag = true;
        prod = allProducts.filter((auto) =>
          auto.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      if (minprice) {
        flag = true;
        let filterd = allProducts.filter(function (el) {
          return el.prodPrice > minprice;
        });

        filterd = filterd.filter(function (el) {
          return el.prodPrice < maxprice;
        });

        prod.push(filterd);
        prod = prod[0];
      }

      if (flag === true) {
        return {
          data: prod.slice(from, to),
          total: prod.length,
        };
      }

      //console.log(allProducts)
      return {
        data: allProducts.slice(from, to),
        total: allProducts.length,
      };
      //return allProducts;
    },

    prod_by_id: async (parent, args, context, info) => {
      const { _id } = args;
      const Products = await products.find({ _id });
      //console.log(Products);

      return Products;
    },
  },
};
