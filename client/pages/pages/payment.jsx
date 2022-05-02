import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { useRouter } from "next/router";

import PaymentTransactionResponse from '../elements/paymentTransactionResponse'
import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";

import SlideToggle from "react-slide-toggle";

import { toDecimal, getTotalPrice } from "~/utils";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { CHECKOUT_MUTA, GET_USER, TRY_PAYMENT } from "~/server/queries";
import { cartActions } from "~/store/cart";
import { userActions } from "~/store/user";
import { getDomainLocale } from "next/dist/shared/lib/router/router";
var CommanFunctions = require("../../components/commanFunc/commanFunctions");

function Payment(props) {

  // console.log(mutationVariables)
  const router = useRouter();
  const { cartList, initialState } = props;

  //ordder details
  const [pageError, SetpageError] = useState();
  const [billingDetails, setBillingDetails] = useState({});
  const [shippingDetails, setDeferentShipingDetails] = useState({});
  const [allInfoData, setAllInfoData] = useState([]);
  const [isDeferentShip, SetIsDeferentShip] = useState(false);
  const [isUserAgree, SetIsUserAgree] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUserLoged, setIsUserLoged] = useState(null);
  const [uidEmail, setUidEmail] = useState();
  const [ccNumber, setCcNumber] = useState();
  const [ccExpiryMM, setCcExpiryMM] = useState();
  const [ccExpiryYY, setCcExpiryYY] = useState();
  const [ccCSC, setCcCSC] = useState();
  const [paymentDetail, setPaymentDetail] = useState(null)
  const [paymentTransactionResponse, setPaymentTransactionResponse] = useState(null)
  const [gettingPayment, setGettingPayment] = useState(false)
  const [errors, setErrors] = useState([])
  const [approvalMessage, setApprovalMessage] = useState(null)
  const [paymentDetailId, setPaymentDetailId] = useState(null)
  const [newOrderId, setNewOrderId] = useState(null)
  const [mutationVariables, setMutationVariables] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("")

  console.log(ccNumber)
  console.log(paymentMethod)





  async function tryPayment() {
    await checkCardFirstDigit()
    await setPaymentTransactionResponse(null)

    console.log("Attempting payment...")

    await setCartInfo()
    // console.log(allInfoData)

    let paymentDetail = {
      userEmail: order_details.userEmail,
      credit_card: {
        number: JSON.stringify(ccNumber),
        expiration_month: JSON.stringify(ccExpiryMM),
        expiration_year: JSON.stringify(ccExpiryYY),

      },
      csc: JSON.stringify(ccCSC),
      amount: parseFloat(order_details.amount),
      billing_address: billing_address
    }

    await setPaymentDetail(paymentDetail)
    console.log("payment detail should be set:", paymentDetail, paymentTransactionResponse)

    // if (mutationVariables) {
    //   console.log("mutation variables ready: ")
    //   console.log(mutationVariables)
    //   await setPaymentDetail(paymentDetail)
    // } else {
    //   console.log("mutationVar NOT ready: ")
    //   console.log(mutationVariables)
    // }

  }



  // const [loading, setLoading] = useState(true)
  // setBillingDetails(JSON.parse(router.query.billingDetails))
  // console.log(JSON.parse(router.query.billingDetails))

  const returnval = CommanFunctions.checkUserLoged();
  if (returnval.success == true && isUserLoged === null) {
    setIsUserLoged(true)

    setUidEmail(returnval.email)
  } else if (returnval.success == false && isUserLoged === null) {
    setIsUserLoged(false)
  }


  // const { error, data } = useQuery(TRY_PAYMENT, {
  const { loading, error, data } = useQuery(TRY_PAYMENT, {
    variables:
      paymentDetail
    // , skip: (paymentTransactionResponse === null) && paymentDetail !== null ? false : true
    , skip: (paymentTransactionResponse === null) && paymentDetail !== null ? false : true
  })

  const [saveOrder, { orderData, orderLoading, orderError }] = useMutation(CHECKOUT_MUTA, {
    onCompleted(result) {
      initialState();

      // console.log(result)
      const orderId = result.createOrder._id
      // console.log(orderId);
      router.push("order/?oid=" + orderId);


    },

    onError(error) {
      console.log(error.message);
    },
    skip: paymentDetailId !== null && paymentTransactionResponse.tryPayment.status === 200 ? false : true,

    variables: {
      billingDetails: JSON.parse(router.query.billingDetails),
      paymentDetailId: paymentDetailId,
      shippingDetails: JSON.parse(router.query.shippingDetails),
      product: allInfoData,
      isDeferentShip: JSON.parse(router.query.isDeferentShip),
      isUserAgree: true,
      status: 0,
      payMethod: paymentMethod,
      dateTime: JSON.stringify(Date.now()),
      total: parseFloat(router.query.amount),
      isUserLoged: isUserLoged,
      userId: uidEmail
    },


  });

  const checkCardFirstDigit = () => {
    // console.log(`checking card assoc first ccNumber digit: ${ccNumber} ${typeof ccNumber}`)
    switch (String(ccNumber)[0]) {
      case "4":
        setPaymentMethod("VISA")
        break;
      case "3":
        setPaymentMethod("AMERICAN EXPRESS")
        break;
      case "5":
        setPaymentMethod("MASTERCARD")
        break;
      case "6":
        setPaymentMethod("DISCOVER")
        break;
      default:
        setPaymentMethod("")

    }
  }





  const setCartInfo = async () => {
    // console.log(cartList)
    console.log(`Total Items In Cart: `, cartList.length)

    let productList = []

    for (var i = 0; i < cartList.length; i++) {


      var ddd = {
        prodId: cartList[i].product._id,
        prodName: cartList[i].product.prodName,
        qty: cartList[i].qty,
        price: cartList[i].product.prodPrice,
      };

      productList.push(ddd)
      console.log(ddd)



    }

    if (productList.length > 0) {
      console.log("productList ready: ")
      // console.log(productList)
      await setAllInfoData(productList);
    } else {
      console.log("productList ready: ")

    }

    // if (allInfoData) {
    //   console.log("allInfoData ready: ")
    //   await setMutationVariables({
    //     billingDetails: JSON.parse(router.query.billingDetails),
    //     paymentDetailId: paymentDetailId,
    //     shippingDetails: JSON.parse(router.query.shippingDetails),
    //     product: allInfoData,
    //     isDeferentShip: JSON.parse(router.query.isDeferentShip),
    //     isUserAgree: true,
    //     status: 0,
    //     payMethod: 0,
    //     dateTime: Date(),
    //     total: parseFloat(order_details.amount),
    //     isUserLoged: isUserLoged,
    //     userId: uidEmail
    //   })


    // } else {
    //   console.log("allInfoData NOT ready: ")

    // }
  }


  // TEST / DEBUG
  // console.log(paymentTransactionResponse)
  // if (paymentTransactionResponse && paymentTransactionResponse.tryPayment.status === 200) {
  // console.log(paymentTransactionResponse.tryPayment.status)
  // console.log("SAVING ORDER TO DB")
  // console.log(mutationVariables)
  // }



  // console.log(router.query)
  let order_details = router.query
  let billing_address = {
    name: order_details.name,
    street_address: order_details.street_address,
    city: order_details.city,
    state: order_details.state,
    zip: order_details.zip
  }



  // console.log(order_details)


  // if (loading) {
  //   // console.log("running useQuery TRY_PAYMENT", paymentDetail)
  //   return (

  //     <div className="container mt-5 mb-5">
  //       <DotSpinner />

  //     </div>
  //   )
  // }

  if (data && paymentTransactionResponse === null && data.tryPayment.status === 200) {
    // console.log("TXN COMPLETE")
    // console.log(data)
    setPaymentTransactionResponse(data)


  } else if (data && data.tryPayment.status === 400) {
    setPaymentDetail(null)

  }

  if (data && data.tryPayment.errData && data.tryPayment.errData.success === false) {
    console.log("ERRORS: ", data.tryPayment.errData.errArr)
    setErrors(data.tryPayment.errData.errArr)
    // setPaymentTransactionResponse(null)

  }

  if (data && data.tryPayment.KeyedSaleTxnResponseData && data.tryPayment.KeyedSaleTxnResponseData.success === true) {
    // window.alert(data.tryPayment.KeyedSaleTxnResponseData.status_message)
    setApprovalMessage(`${data.tryPayment.KeyedSaleTxnResponseData.status_message}: PaymentDetailId:${data.tryPayment.paymentDetailId.substring(19)}`)
    setPaymentDetailId(data.tryPayment.paymentDetailId)

    saveOrder()
    // setPaymentTransactionResponse(null)
  }








  return (
    <div className="main payment">
      {/* {console.log(`PROPS `, ccNumber)} */}
      <Helmet>
        <title>Printing Galore | Payment</title>
      </Helmet>

      <h1 className="d-none">Printing Galore - Payment</h1>

      <div
        className={`page-content pt-7 pb-10 ${cartList.length > 0 ? "mb-10" : "mb-2"
          }`}
      >


        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            1. Shopping Cart
          </h3>
          <h3 className="title title-simple title-step">
            2. Checkout
          </h3>
          <h3 className="title title-simple title-step active">
            3. Payment
          </h3>
          <h3 className="title title-simple title-step">
            3. Order Complete
          </h3>
        </div>


        <div className="container mt-7">
          <div className="row">


            {cartList.length > 0 ? (
              <div className="col-lg-8">
                <div className="">
                  <div className="row">
                    <div className="col-lg-8 mb-6 mb-lg-0 pr-lg-4">
                      <h3 className="title title-simple text-left text-uppercase">
                        Payment Details
                      </h3>
                      <div className="">

                        <div className="col-xs-12">
                          <label>Credit Card Number {paymentMethod}</label>
                          <input autoFocus type="text" className="form-control pt-encrypt" maxlength="16" id="ccNumber" name="ccNumber" placeholder="Credit card text" onChange={e => { checkCardFirstDigit(), setCcNumber(parseInt(e.target.value)) }} />
                        </div>

                        <div className="row">

                          <div className="col-xs-4">
                            <label>CSC</label>
                            <input type="text" className="form-control pt-encrypt" maxlength="3" id="ccCSC" name="ccCSC" placeholder="Card security code" onChange={e => setCcCSC(parseInt(e.target.value))} />


                          </div>

                          <div className="col-xs-4">
                            <label>Expiry Month</label>
                            <input type="text" className="form-control pt-encrypt" maxlength="2" id="ccExpiryMM" name="ccExpiryMM" placeholder="YY" onChange={e => setCcExpiryMM(parseInt(e.target.value))} />


                          </div>

                          <div className="col-xs-4">
                            <label>Expiry Year</label>
                            <input type="text" className="form-control pt-encrypt" maxlength="2" id="ccExpiryYY" name="ccExpiryYY" placeholder="MM" onChange={e => setCcExpiryYY(parseInt(e.target.value))} />


                          </div>


                        </div>
                      </div>

                      {loading ?

                        <div className="container mt-5 mb-5">
                          {/* <DotSpinner /> */}
                          <div className="main-loading-overlay"></div>
                          <p>Processing your payment. Do not close or refresh the browser. </p>
                        </div>

                        :

                        approvalMessage || errors.length > 0 ?
                          <div>
                            <button
                              onClick={tryPayment}
                              // onClick={() => refetch()}
                              className="btn btn-dark btn-rounded btn-order"
                            >
                              Continue
                            </button>
                            {
                              errors.length > 0 ?
                                errors.map((err, index) => (
                                  <p className="mb-1 error-text">{err}</p>
                                ))
                                : null
                            }
                            {approvalMessage ?

                              <p className="mb-1 approval-text">{approvalMessage}</p>

                              : null}
                          </div>

                          :

                          <button
                            onClick={tryPayment}
                            // onClick={() => refetch()}
                            className="btn btn-dark btn-rounded btn-order"
                          >
                            Continue
                          </button>

                      }




                    </div>


                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart text-center col-lg-6">
                <p>Your cart is currently empty.</p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop mb-0">
                  <ALink
                    className="button wc-backward btn btn-dark btn-md"
                    href="/shop"
                  >
                    Return to shop
                  </ALink>
                </p>
              </div>
            )}



            <div className="col-lg-4">
              <h3 className="title title-simple text-left text-uppercase">
                Order Info
              </h3>
              <p>Billing Address</p>
              <p className="mb-0">{order_details.name}</p>
              <p className="mb-0">{order_details.street_address}</p>
              <p>{order_details.city}, {order_details.state} {order_details.zip}</p>
              <p className="title">Order Total: ${order_details.amount}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    //user: state.user.data,
    user: state.user.data
  };
}

export default connect(mapStateToProps, {
  initialState: cartActions.initialState

})(Payment);
