import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import React, { useEffect, useState } from 'react';
import ALink from '~/components/features/custom-link';

import { toDecimal, getTotalPrice } from '~/utils';
import { useRouter } from 'next/router'
import { GET_ORDERBY_ID } from "~/server/queries";
import { useQuery, gql, useMutation } from "@apollo/client";


function Order(props) {
    const { cartList } = props;
    const router = useRouter()
    const { oid } = router.query

    const [myorder, setMyOrders] = useState([]);
    const [shipDet, setShipDet] = useState({})
    const [email, setEmail] = useState()


    const [orderdProduct, setOrderdProduct] = useState([])


    const { _id, status, dateTime, total, payMethod } = myorder;
    const { first, last, company, country, address1, address2, state, city, phone, zip } = shipDet;



    const { data, loading, error } = useQuery(GET_ORDERBY_ID, { variables: { id: oid } });
    useEffect(() => {

        if (data) {
            //console.log(" x ->"+ JSON.stringify(data.orderById));

            setMyOrders(data.orderById[0]);
            setOrderdProduct(data.orderById[0].product)
            setEmail(data.orderById[0].shipingDetails.email)
            if (data.orderById[0].isDeferentShip == true) {
                console.log("true")
                
                setShipDet(data.orderById[0].differentShipingDetails)
            } else {
                console.log("false")
                setShipDet(data.orderById[0].shipingDetails)
            }

            if (!loading) {
                //console.log( data.orderById);
                console.log(data.orderById[0].shipingDetails.email);
                //console.log(data.orderById[0].product);

                //console.log(myorder)
            }


        }



    })/*, [loading, product])*/

    return (
        <main className="main order">
            <Helmet>
                <title>Printing Galore | Order</title>
            </Helmet>

            <h1 className="d-none">Printing Galore - Order</h1>

            <div className="page-content pt-7 pb-10 mb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step"><ALink href="/pages/cart">1. Shopping Cart</ALink></h3>
                    <h3 className="title title-simple title-step"><ALink href="/pages/checkout">2. Checkout</ALink></h3>
                    <h3 className="title title-simple title-step active"><ALink href="#">3. Order Complete</ALink></h3>
                </div>
                <div className="container mt-8">
                    <div className="order-message mr-auto ml-auto">
                        <div className="icon-box d-inline-flex align-items-center">
                            <div className="icon-box-icon mb-0">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enableBackground="new 0 0 50 50" xmlSpace="preserve">
                                    <g>
                                        <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" d="
                                        M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                                        c0-0.7,0-1.4-0.1-2.1"></path>
                                        <polyline fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" points="
                                        48,6.9 24.4,29.8 17.2,22.3 	"></polyline>
                                    </g>
                                </svg>
                            </div>
                            <div className="icon-box-content text-left">
                                <h5 className="icon-box-title font-weight-bold lh-1 mb-1">Thank You!</h5>
                                <p className="lh-1 ls-m">Your order has been received</p>
                            </div>
                        </div>
                    </div>


                    <div className="order-results">
                        <div className="overview-item">
                            <span>Order number:</span>
                            <strong> {_id} </strong>
                        </div>
                        <div className="overview-item">
                            <span>Status:</span>
                            <strong>
                                {status === 0 && "PROCESSING"}
                                {status === 1 && "PACKED"}
                                {status === 2 && "DELEVERD"}
                            </strong>
                        </div>
                        <div className="overview-item">
                            <span>Date:</span>
                            <strong> {dateTime} </strong>
                        </div>
                        <div className="overview-item">
                            <span>Email:</span>
                            <strong>{email}</strong>
                        </div>
                        <div className="overview-item">
                            <span>Total:</span>
                            <strong>${parseFloat(total).toFixed(2)}</strong>
                        </div>
                        <div className="overview-item">
                            <span>Payment method:</span>
                            <strong>
                                {payMethod === 0 && "CASH ON DELIVERY"}
                                {payMethod === 1 && "CHECK PAYMENT"}
                                {payMethod === 2 && "VISA - MASTER"}
                            </strong>
                        </div>
                    </div>

                    <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">Order Details</h2>
                    <div className="order-details">
                        <table className="order-details-table">
                            <thead>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h3 className="summary-subtitle">Product</h3>
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    orderdProduct.map(item =>
                                        <tr key={'order-' + item._id}>
                                            <td className="product-name">{item.prodName}<span> <i className="fas fa-times"></i>{item.qty} </span></td>
                                            <td className="product-price">${toDecimal(item.qty * item.price)}</td>

                                        </tr>
                                    )
                                }
                                { /*
                                    cartList.map(item =>
                                        <tr key={'order-' + item.product._id}>
                                            <td className="product-name">{item.product.prodName} <span> <i className="fas fa-times"></i> {item.qty}</span></td>
                                            <td className="product-price">${toDecimal(item.qty * item.product.prodPrice)}</td>

                                        </tr>
                                    )*/}
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Subtotal:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">${parseFloat(total).toFixed(2)}</td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Shipping:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">Free shipping</td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Payment method:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">
                                        {payMethod === 0 && "CASH ON DELIVERY"}
                                        {payMethod === 1 && "CHECK PAYMENT"}
                                        {payMethod === 2 && "VISA - MASTER"}
                                    </td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Total:</h4>
                                    </td>
                                    <td>
                                        <p className="summary-total-price">${parseFloat(total).toFixed(2)}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="title title-simple text-left pt-10 mb-2">Billing Address</h2>
                    <div className="address-info pb-8 mb-6">
                        <p className="address-detail pb-2">
                            {first + " " + last} <br />
                            {company}<br />
                            {address1}<br />
                            {address2}<br />
                            {state}<br />
                            {city}<br />
                            {zip}<br />
                            {phone}<br />


                        </p>
                        <p className="email">{email}</p>
                    </div>

                    <ALink href="/shop" className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"><i className="d-icon-arrow-left"></i> Back to List</ALink>
                </div>
            </div>
        </main>
    )
}

function mapStateToProps(state) {
    return {
        cartList: state.cart.data ? state.cart.data : []
    }
}


export default connect(mapStateToProps)(Order);

