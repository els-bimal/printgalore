import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment'
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


    const { _id, status, dateTime, total, payMethod, salesOrderId } = myorder;
    const { first, last, company, country, address1, address2, state, city, phone, zip } = shipDet;



    const { data, loading, error } = useQuery(GET_ORDERBY_ID, { variables: { id: oid } });
    useEffect(() => {

        if (data) {
            console.log(data)
            //console.log(" x ->"+ JSON.stringify(data.orderById));

            setMyOrders(data.orderById);
            setOrderdProduct(data.orderById.product)
            setEmail(data.orderById.billingDetails.email)
            if (data.orderById.isDeferentShip == true) {
                console.log("true")

                setShipDet(data.orderById.shippingDetails)
            } else {
                console.log("false")
                setShipDet(data.orderById.billingDetails)
            }

            if (!loading) {
                //console.log( data.orderById);
                console.log(data.orderById.billingDetails.email);
                //console.log(data.orderById.product);

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


                <div className="container mt-8">




                    <div className="order-results">
                        <div className="overview-item">
                            <span>Order number:</span>
                            <strong> {salesOrderId} </strong>
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
                            <strong> {moment(parseInt(dateTime)).format("MM-DD-YY hh:mm:ss a")} </strong>
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
                                {payMethod}
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
                                        <strong>
                                            {payMethod}
                                        </strong>
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
                            {city}, {state} {zip}<br />
                            {phone}<br />


                        </p>
                        <p className="email">{email}</p>
                    </div>

                    <ALink href="/pages/account/" className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"><i className="d-icon-arrow-left"></i> Back to Account</ALink>
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

