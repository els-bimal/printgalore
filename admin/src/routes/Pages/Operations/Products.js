import React,  { useState, connect, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import InfiniteScroll from "react-infinite-scroller";
import { Waypoint } from 'react-waypoint';
//import { useLazyQuery } from '@apollo/react-hooks';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setProductItems } from '../../../redux/actions/product/productAction'
import { useDispatch, useSelector } from 'react-redux';



import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { CurrentAuthMethod } from '../../../@jumbo/constants/AppConstants'; //'../../../constants/AppConstants';
import  ProductCard from './ProductItem';
//import {SAERCH_PRODUCT_ADMIN} from '../../../controllers/queries';


import { useQuery, gql, useMutation } from "@apollo/client";


const SAERCH_PRODUCT_ADMIN = gql`
  mutation SearchProducts($color: String!, $size: String!, $brand: String!, $category: String!, $search: String!, $skip: Int!, $limit: Int){
    SearchProducts(color: $color, size: $size, brand: $brand, category: $category, search: $search, skip: $skip, limit: $limit) {
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
        inventorykey
        keywords
        Style
        originStore
     }
  }
`;



const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.operations'} />, link: '/' },
  { label: <IntlMessages id={'pages.operations.products'} />, isActive: true },
];

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const style1 = {
  height:700,

}
const colstyles1 = {
  padding:12
}
const colstyles2 = {
  padding:4
}
const styles = {
  backgroundColor:'#d9d9d9',
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 1
  }
}
const imgStyles = {
  padding: 4,
  width: 100,
  height: 130,
}
 

const Products = ( { props, method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [isNewSearch, setisNewSearch] = useState(true);
  const [search, setsearch] = useState('');
  const [color, setcolor] = useState('');
  const [size, setsize] = useState('');
  const [brand, setbrand] = useState('');
  const [category, setcategory] = useState('');
  const [skip, setskip] = useState(0);
  const [limit, setlimit] = useState(10);
  const classes = useStyles({ variant });
  const [items, setitems] = useState([]);
  const [hasmore, sethasmore] = useState(true)
  const dispatch = useDispatch();



  useEffect( () => {
    setTimeout( () => {
      setisNewSearch(true);
      setskip(0);
      
      searchProducts();
    }, 2000 );

  }, [ search, color, size, brand, category ] )

  const [searchProducts, { user_loding }] = useMutation(SAERCH_PRODUCT_ADMIN, {
    onCompleted(result) {
      dispatch(fetchSuccess("Completed"));
      //dispatch(setProductItems(result.SearchProducts))
      if(isNewSearch){
        setitems(result.SearchProducts)
      }
      else{
        setitems(items => [...items, ...result.SearchProducts])
      }
      
      setskip(skip => skip + 10);
      setisNewSearch(false);
    },
    onError(error) {
      console.log(error);
      dispatch(fetchError(error.message));
    },
    variables: { 
      search: search, 
      color : color, 
      size : size, 
      brand : brand, 
      category: category,
      skip : skip, 
      limit : limit

    },
     
  });

  if (user_loding) {
    dispatch(fetchError("Please Wait...."))
  }



  const fetchMoreData = () => {
    if(isNewSearch){
      setskip(0);
    }
    if(hasmore){
      searchProducts();
      
    }
    
  };


  const onSubmit = () => {
        searchProducts();
  }

     const getColumnsForRow =()=>{
        let products = items.map((item, index) => {
          return ( 
            <div key={item.productCode} style={styles} >
              <Grid container style={colstyles1} >
                <Grid item md={1}>
                  <img src={item.pictures[0].url} style={imgStyles} alt="" />
                </Grid>
                <Grid item md={11} style={colstyles2}>
                  <h3>{item.category} - {item.prodName} - Price : {item.prodPrice} - Stock : {item.stock}</h3> 
                  <h4>Code : <em>{item.productCode}</em> - Color : <em>{item.color}</em> - Size : <em>{item.size}</em> - Brand : <em>{item.brand}</em> - Style : <em>{item.Style}</em> - Inventory-Key : <em>{item.inventorykey}</em> - Origine-Store : <em>{item.originStore}</em></h4>
                  <p>
                    {item.short_description}
                  </p>
                </Grid>
              </Grid>
            </div>
          );
   
      });
      return products;
    };



  return (
    <>
    
      <PageContainer heading={<IntlMessages id="pages.operations.products" />} breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12}>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.product.search" />}
                fullWidth
                onChange={event => {
                  //setisNewSearch(true);
                  setsearch(event.target.value)
                }}
                defaultValue={search}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.product.color" />}
                fullWidth
                onChange={event => {
                    //setisNewSearch(true);
                    setcolor(event.target.value)
                  }
                }
                defaultValue={color}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.product.size" />}
                fullWidth
                onChange={event => {
                    //setisNewSearch(true);
                    setsize(event.target.value)

                  }
                }
                defaultValue={size}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.product.brand" />}
                fullWidth
                onChange={event => {
                    //setisNewSearch(true);
                    setbrand(event.target.value)
                  }
                }
                defaultValue={brand}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.product.category" />}
                fullWidth
                onChange={event => {
                    //setisNewSearch(true);
                    setcategory(event.target.value)
                  }
                }
                defaultValue={category}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <IntlMessages id="appModule.product.find" />
              </Button>

            </Box>
            <Divider />
          </Grid>
        </GridContainer>
      </PageContainer>
        {/*items !== undefined && items !== null && items.length !== 0?
        <Grid container spacing={24}>
          <Grid item md={3}>
            <ProductCard item={items[0]} />
          </Grid>
          <Grid item md={3}>
            <ProductCard item={items[1]} />
          </Grid>
          <Grid item md={3}>
            <ProductCard item={items[2]} />
          </Grid>
        </Grid>
        :null
  */}
      <Container>
            <div>
            {items !== undefined && items !== null && items.length !== 0?
                    getColumnsForRow()
                   
            :null
            }
          </div>
          {items?
            <Waypoint
              onEnter={fetchMoreData}
            >
              <h5 className='text-muted m-5'>Loading data...</h5>
            </Waypoint>
            :null}                    


      </Container>
    </>
  );
};

export default Products;
