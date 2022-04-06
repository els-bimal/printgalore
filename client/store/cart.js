import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';

import CartPopup from '~/components/features/product/common/cart-popup';

const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART: 'UPDATE_CART',
    REFRESH_STORE: 'REFRESH_STORE'
}

const initialState = {
    data: []
}

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let tmpProduct = { ...action.payload.product };
            return { ...state, data: [...state.data, tmpProduct] };

        /*

        if ( state.data.findIndex( item => item.name === action.payload.product.name ) > -1 ) {
            let tmpData = state.data.reduce( ( acc, cur ) => {
                if ( cur.name === tmpProduct.name ) {
                    acc.push( {
                        ...cur,
                        qty: parseInt( cur.qty ) + parseInt( tmpProduct.qty )
                    } );
                } else {
                    acc.push( cur );
                }

                return acc;
            }, [] )

            return { ...state, data: tmpData };
        } else {
            return { ...state, data: [ ...state.data, tmpProduct ] };
        }
*/
        case actionTypes.REMOVE_FROM_CART:
            let cart = state.data.reduce((cartAcc, product) => {
                //console.log(JSON.stringify(product.product._id))
                //console.log(JSON.stringify(action.payload.product._id))
                

                if (product.product._id !== action.payload.product._id) {
                    cartAcc.push(product);
                }
                return cartAcc;
            }, []);

            //console.log(cart);
            return { ...state, data: cart };
            
            

        case actionTypes.UPDATE_CART:
            return { ...state, data: action.payload.products };

        case actionTypes.REFRESH_STORE:
            return initialState;

        default:
            return state;
    }
}

export const cartActions = {
    addToCart: product => ({ type: actionTypes.ADD_TO_CART, payload: { product } }),
    removeFromCart: product => ({ type: actionTypes.REMOVE_FROM_CART, payload: { product } }),
    updateCart: products => ({ type: actionTypes.UPDATE_CART, payload: { products } }),
    initialState: products => ({ type: actionTypes.REFRESH_STORE, payload: {  } })
};

export function* cartSaga() {
    yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
        toast(<CartPopup product={e.payload.product} />);
    })
}

const persistConfig = {
    keyPrefix: "riode-",
    key: "cart",
    storage
}

export default persistReducer(persistConfig, cartReducer);