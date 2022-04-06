import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { useRouter } from "next/router";

import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";

import SlideToggle from "react-slide-toggle";

import { toDecimal, getTotalPrice } from "~/utils";
import { useQuery, gql, useMutation } from "@apollo/client";
import { CHECKOUT_MUTA, GET_USER } from "~/server/queries";
import { cartActions } from "~/store/cart";
//import { userActions } from "~/store/user";
import { getUser } from "~/store/actions/authActions"
import { getDomainLocale } from "next/dist/shared/lib/router/router";
var CommanFunctions = require("../../components/commanFunc/commanFunctions");

//var CommanFunctions = require("../../components/commanFunc/commanFunctions");

function Checkout(props) {
  console.log(props)
  const router = useRouter();
  const { cartList, initialState } = props;
  const [isFirst, setFirst] = useState(false);

  //ordder details\
  const [pageError, SetpageError] = useState();
  const [shipingDetails, setShipingDetails] = useState({});
  const [differentShipingDetails, setDeferentShipingDetails] = useState({});
  const [allInfoData, setAllInfoData] = useState([]);
  const [isDeferentShip, SetIsDeferentShip] = useState(false);
  const [isUserAgree, SetIsUserAgree] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUserLoged, setIsUserLoged] = useState(false);
  const [uidEmail, setUidEmail] = useState();
  const [user, setuser] = useState(null)

  useEffect(() => {
    console.log('____00____')
    console.log(props)
  },[props]);



  /*
  // const [user, setUser] = useState(useQuery(GET_USER, { variables: { email: "tristan.e.perera@gmail.com" } }))
  const user = useQuery(GET_USER, { variables: { email: "tristan.e.perera@gmail.com" } })
  console.log("GETTING USER: ")
  console.log(props)
  console.log(user.data)
  */
  const [check_out, { reg_loding }] = useMutation(CHECKOUT_MUTA, {
    update(proxy, result) {
      console.log(result.data.createOrder._id);
      initialState();
      router.push("order/?oid=" + result.data.createOrder._id);
    },
    onError(error) {
      console.log(error.message);
    },
    variables: {
      shipingDetails: shipingDetails,
      differentShipingDetails: differentShipingDetails,
      product: allInfoData,
      isDeferentShip: isDeferentShip,
      isUserAgree: isUserAgree,
      status: 0,
      payMethod: 0,
      dateTime: Date(),
      total: totalPrice,
      isUserLoged:isUserLoged,
      userId:uidEmail
     

    },
  });

  function deferentShip(e) {
    if (isDeferentShip === true) {
      SetIsDeferentShip(false);
    } else {
      SetIsDeferentShip(true);
    }
  }

  function clikUserAgreement() {
    if (isUserAgree === true) {
      SetIsUserAgree(false);
    } else {
      SetIsUserAgree(true);
    }
  }

  function addDefShopDetails(e) {
    setDeferentShipingDetails({
      ...differentShipingDetails,
      [e.target.name]: e.target.value,
    });
  }



  function addShopDetails(e) {
    setShipingDetails({ ...shipingDetails, [e.target.name]: e.target.value });
  }

  const placeOrder = async (e) => {
    e.preventDefault();

    setTotalPrice((getTotalPrice(cartList)));
    //alert(totalPrice);


    var requiredfeeildList =
      "first:First Name ,last: Last Name,company: Company Name,country: country,address1: Address ,city: City,state: State,zip: Zip Code,phone:Phone Number,email:email Address";
    var req_array = requiredfeeildList.split(",");

    var found = 0;
    for (var i = 0; i < req_array.length; i++) {
      //console.log(key + " -> " + shipingDetails[key]);
      found = 0;
      var feild_txt = req_array[i].split(":");
      for (var key in shipingDetails) {
        if (key === feild_txt[0]) {
          found = 1;
        }
      }
      //console.log(key + "--->" + "--->" + found);
      if (found === 0) {
        //SetpageError(req_array[i]);
        SetpageError("Please Fill Required Feilds " + feild_txt[1]);
        break;
      }
    }

    if (isDeferentShip === true) {
      requiredfeeildList =
        "first:First Name ,last: Last Name,company: Company Name,country: country,address1: Address ,city: City,state: State,zip: Zip Code,phone:Phone Number";
      var req_array = requiredfeeildList.split(",");
      var found = 0;
      for (var i = 0; i < req_array.length; i++) {
        //console.log(key + " -> " + shipingDetails[key]);
        found = 0;
        var feild_txt = req_array[i].split(":");
        for (var key in differentShipingDetails) {
          if (key === feild_txt[0]) {
            found = 1;
          }
        }
        console.log(key + "--->" + "--->" + found);
        if (found === 0) {
          //SetpageError(req_array[i]);
          SetpageError("Please Fill Different shipping Feilds " + feild_txt[1]);
          break;
        }
      }
    }

    if (found === 0) {
      return;
    }

    const { email } = shipingDetails;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

    } else {
      SetpageError("You have entered an invalid email address!");
      return
    }



    setAllInfoData([]);
    SetpageError("");

    if (isUserAgree === false) {
      SetpageError("Please Make Accept a Agreement ");
    } else {
      SetpageError(null);

      /*
      const arr_c = [
        { category: "Apple", prodName: "sd" },
        { category: "Oranges", prodName: "dsd" },
        { category: "Grapes", prodName: "22.00" }
      ]
      setAllInfoData(arr_c);
      */

      for (var i = 0; i < cartList.length; i++) {
        /*console.log(cartList[i].qty);
        console.log(cartList[i].product._id);*/
        //console.log(cartList[i].product.prodPrice);

        var ddd = {
          prodId: cartList[i].product._id,
          prodName: cartList[i].product.prodName,
          qty: cartList[i].qty,
          price: cartList[i].product.prodPrice,
        };
        //console.log((ddd))
        await setAllInfoData((allInfoData) => [...allInfoData, ddd]);
      }

      const returnval = CommanFunctions.checkUserLoged();
      //console.log("---*"+JSON.stringify(returnval))
      //console.log(returnval);
      if (returnval.success == true) {
        setIsUserLoged(true)
        //console.log("Welcome")
        //console.log(returnval.email)
        setUidEmail(returnval.email)
        check_out();
      } else{
        setIsUserLoged(false)
        check_out();
      }


      //console.log((allInfoData))
      
    }
  };

  //const [isloged, setIsloged] = useState(false);
  return (
    <main className="main checkout">
      <Helmet>
        <title>Printing Galore | Checkout</title>
      </Helmet>

      <h1 className="d-none">Printing Galore - Checkout</h1>

      <div
        className={`page-content pt-7 pb-10 ${cartList.length > 0 ? "mb-10" : "mb-2"
          }`}
      >
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="/pages/order">3. Order Complete</ALink>
          </h3>
        </div>
        <div className="container mt-7">
          {cartList.length > 0 ? (
            <>
              {/*<div className="card accordion">
                <Card
                  type="parse"
                  title="<div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                            <i class='fas fa-exclamation-circle'></i> <span class='text-body'>Returning customer?</span> <a href='#' class='text-primary collapse'>Click here to login</a>
                        </div>"
                >
                  <div className="alert-body collapsed">
                    <p>
                      If you have shopped with us before, please enter your
                      details below. If you are a new customer, please proceed
                      to the Billing section.
                    </p>
                    <div className="row cols-md-2">
                      <form className="mb-4 mb-md-0">
                        <label htmlFor="username">Username Or Email *</label>
                        <input
                          type="text"
                          className="input-text form-control mb-0"
                          name="username"
                          id="username"
                          autoComplete="username"
                        />
                      </form>
                      <form className="mb-4 mb-md-0">
                        <label htmlFor="password">Password *</label>
                        <input
                          className="input-text form-control mb-0"
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </form>
                    </div>
                    <div className="checkbox d-flex align-items-center justify-content-between">
                      <div className="form-checkbox pt-0 mb-0">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="signin-remember"
                          name="signin-remember"
                        />
                        <label
                          className="form-control-label"
                          htmlFor="signin-remember"
                        >
                          Remember Me
                        </label>
                      </div>
                      <ALink href="#" className="lost-link">
                        Lost your password?
                      </ALink>
                    </div>
                    <div className="link-group">
                      <ALink href="#" className="btn btn-dark btn-rounded mb-4">
                        Login
                      </ALink>{" "}
                      <span className="d-inline-block text-body font-weight-semi-bold">
                        or Login With
                      </span>{" "}
                      <div className="social-links mb-4">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-twitter fab fa-twitter"
                        ></ALink>
                      </div>
                    </div>
                  </div>
                </Card>
              </div> */}
              {/*
                                <div className="card accordion">
                                    <Card title="
                                            <div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                                                <i class='fas fa-exclamation-circle'></i>
                                                <span class='text-body'>Have a coupon?</span>
                                                <a href='#' class='text-primary'>Click here to enter your code</a>
                                            </div>" type="parse">

                                        <div className="alert-body mb-4 collapsed">
                                            <p>If you have a coupon code, please apply it below.</p>
                                            <form className="check-coupon-box d-flex">
                                                <input type="text" name="coupon_code" className="input-text form-control text-grey ls-m mr-4"
                                                    id="coupon_code" placeholder="Coupon code" />
                                                <button type="submit" className="btn btn-dark btn-rounded btn-outline">Apply Coupon</button>
                                            </form>
                                        </div>
                                    </Card>
                                </div>
                                */}
              <form action="#" className="form">
                <div className="row">
                  <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                    <h3 className="title title-simple text-left text-uppercase">
                      Billing Details
                    </h3>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                    </div>
                    <label>Company Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      onChange={addShopDetails}
                      required
                    />
                    <label>Country / Region *</label>
                    <div className="select-box">
                      <select
                        name="country"
                        className="form-control"
                        onChange={addShopDetails}
                        defaultValue=""
                      >
                        <option value="">Please Select</option>
                        <option value="us">United States (US)</option>
                        <option value="uk"> United Kingdom</option>
                        <option value="fr">France</option>
                        <option value="aus">Austria</option>
                      </select>
                    </div>
                    <label>Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address1"
                      onChange={addShopDetails}
                      required
                      placeholder="House number and street name"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="address2"
                      onChange={addShopDetails}
                      required
                      placeholder="Apartment, suite, unit, etc. (optional)"
                    />
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Town / City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>State *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>ZIP *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Phone *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          onChange={addShopDetails}
                          required
                        />
                      </div>
                    </div>
                    <label>Email Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={addShopDetails}
                      required
                    />

                    {/*<SlideToggle duration={300} collapsed >
                                                {({ onToggle, setCollapsibleElement }) => (
                                                    <div className="form-checkbox mb-0 pt-0">
                                                        <input type="checkbox" className="custom-checkbox" id="create-account" name="create-account" onChange={onToggle} />
                                                        <label className='form-control-label ls-s' htmlFor='create-account'>Create an account?</label>

                                                        <div ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                                                            <label htmlFor="account_username" className="pt-4">Account username&nbsp;
                                                                <abbr className="required" title="required">*</abbr>
                                                            </label>

                                                            <input type="text" className="form-control" name="account_username" id="account_username" placeholder="Username" rows="5" />

                                                            <label htmlFor="account_password">Create account password&nbsp;
                                                                <abbr className="required" title="required">*</abbr>
                                                            </label>

                                                            <input type="password" className="form-control mb-3" name="account_password" id="account_password" placeholder="Password" rows="5" />
                                                        </div>
                                                    </div>
                                                )}
                                            </SlideToggle> */}

                    <SlideToggle duration={300} collapsed>
                      {({ onToggle, setCollapsibleElement }) => (
                        <div className="form-checkbox mb-6">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="different-address"
                            name="different-address"
                            onClick={deferentShip}
                            onChange={onToggle}
                          />
                          <label
                            className="form-control-label ls-s"
                            htmlFor="different-address"
                          >
                            Ship to a different address?
                          </label>

                          <div
                            ref={setCollapsibleElement}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="row pt-4">
                              <div className="col-xs-6">
                                <label>First Name *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="first"
                                  onChange={addDefShopDetails}
                                  required
                                />
                              </div>
                              <div className="col-xs-6">
                                <label>Last Name *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="last"
                                  onChange={addDefShopDetails}
                                  required
                                />
                              </div>
                            </div>
                            <label>Company Name (Optional)</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company"
                              onChange={addDefShopDetails}
                              required
                            />
                            <label>Country / Region *</label>
                            <div className="select-box">
                              <select
                                name="country"
                                className="form-control"
                                defaultValue=""
                                onChange={addDefShopDetails}
                              >
                                <option value="">Please Select</option>
                                <option value="us">United States (US)</option>
                                <option value="uk"> United Kingdom</option>
                                <option value="fr">France</option>
                                <option value="aus">Austria</option>
                              </select>
                            </div>
                            <label>Street Address *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address1"
                              required
                              onChange={addDefShopDetails}
                              placeholder="House number and street name"
                            />
                            <input
                              type="text"
                              className="form-control"
                              name="address2"
                              required
                              onChange={addDefShopDetails}
                              placeholder="Apartment, suite, unit, etc. (optional)"
                            />
                            <div className="row">
                              <div className="col-xs-6">
                                <label>Town / City *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="city"
                                  required
                                  onChange={addDefShopDetails}
                                />
                              </div>
                              <div className="col-xs-6">
                                <label>State *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="state"
                                  required
                                  onChange={addDefShopDetails}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xs-6">
                                <label>ZIP *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="zip"
                                  required
                                  onChange={addDefShopDetails}
                                />
                              </div>
                              <div className="col-xs-6">
                                <label>Phone *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  required
                                  onChange={addDefShopDetails}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </SlideToggle>

                    <h2 className="title title-simple text-uppercase text-left mt-6">
                      Additional Information
                    </h2>
                    <label>Order Notes (Optional)</label>
                    <textarea
                      name="adtional_info"
                      className="form-control pb-2 pt-2 mb-0"
                      cols="30"
                      rows="5"
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      onChange={addShopDetails}
                    ></textarea>
                  </div>

                  <aside className="col-lg-5 sticky-sidebar-wrapper">
                    <div
                      className="sticky-sidebar mt-1"
                      data-sticky-options="{'bottom': 50}"
                    >
                      <div className="summary pt-5">
                        <h3 className="title title-simple text-left text-uppercase">
                          Your Order
                        </h3>
                        <table className="order-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>

                            {cartList.map((item) => (
                              <tr key={"checkout-" + item.product._id}>
                                <td className="product-name">
                                  {item.product.prodName}{" "}
                                  <span className="product-quantity">
                                    ×&nbsp;{item.qty}
                                  </span>
                                </td>
                                <td className="product-total text-body">
                                  ${toDecimal(item.price * item.qty)}
                                </td>
                              </tr>
                            ))}

                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Subtotal</h4>
                              </td>
                              <td className="summary-subtotal-price pb-0 pt-0">
                                ${toDecimal(getTotalPrice(cartList))}

                              </td>
                            </tr>
                            <tr className="sumnary-shipping shipping-row-last">
                              <td colSpan="2">
                                <h4 className="summary-subtitle">
                                  Calculate Shipping
                                </h4>
                                <ul>
                                  <li>
                                    <div className="custom-radio">
                                      <input
                                        type="radio"
                                        id="flat_rate"
                                        name="shipping"
                                        className="custom-control-input"
                                        defaultChecked
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="flat_rate"
                                      >
                                        Flat rate
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="custom-radio">
                                      <input
                                        type="radio"
                                        id="free-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="free-shipping"
                                      >
                                        Free shipping
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="custom-radio">
                                      <input
                                        type="radio"
                                        id="local_pickup"
                                        name="shipping"
                                        className="custom-control-input"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="local_pickup"
                                      >
                                        Local pickup
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr className="summary-total">
                              <td className="pb-0">
                                <h4 className="summary-subtitle">Total</h4>
                              </td>
                              <td className=" pt-0 pb-0">
                                <p className="summary-total-price ls-s text-primary">
                                  ${toDecimal(getTotalPrice(cartList))}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="payment accordion radio-type">
                          <h4 className="summary-subtitle ls-m pb-3">
                            Payment Methods
                          </h4>

                          <div className="checkbox-group">
                            <div className="card-header">
                              <ALink
                                href="#"
                                className={`text-body text-normal ls-m ${isFirst ? "collapse" : ""
                                  }`}
                                onClick={() => {
                                  !isFirst && setFirst(!isFirst);
                                }}
                              >
                                Check payments
                              </ALink>
                            </div>

                            <Collapse in={isFirst}>
                              <div className="card-wrapper">
                                <div className="card-body ls-m overflow-hidden">
                                  Please send a check to Store Name, Store
                                  Street, Store Town, Store State / County,
                                  Store Postcode.
                                </div>
                              </div>
                            </Collapse>

                            <div className="card-header">
                              <ALink
                                href="#"
                                className={`text-body text-normal ls-m ${!isFirst ? "collapse" : ""
                                  }`}
                                onClick={() => {
                                  isFirst && setFirst(!isFirst);
                                }}
                              >
                                Cash on delivery
                              </ALink>
                            </div>

                            <Collapse in={!isFirst}>
                              <div className="card-wrapper">
                                <div className="card-body ls-m overflow-hidden">
                                  Please send a check to Store Name, Store
                                  Street, Store Town, Store State / County,
                                  Store Postcode.
                                </div>
                              </div>
                            </Collapse>
                          </div>
                        </div>
                        <div className="form-checkbox mt-4 mb-5">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="terms-condition"
                            name="terms-condition"
                            onClick={clikUserAgreement}
                          />
                          <label
                            className="form-control-label"
                            htmlFor="terms-condition"
                          >
                            I have read and agree to the website{" "}
                            <ALink href="#">terms and conditions </ALink>*
                          </label>
                        </div>
                        <div>
                          <font color="red"> {pageError}</font>
                        </div>
                        <button
                          onClick={placeOrder}
                          className="btn btn-dark btn-rounded btn-order"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </form>
            </>
          ) : (
            <div className="empty-cart text-center">
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
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {

  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.auth.user1
  };
}

export default connect(mapStateToProps, {
  initialState: cartActions.initialState,
})(Checkout);
