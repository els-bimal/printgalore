import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import SalesOrder from './Pages/Sales/SalesOrder';
import Quotes from './Pages/Sales/Quotes';
import Customer from './Pages/Sales/Customer';
import Reporting from './Pages/Accounting/Reporting';
import Ledger from './Pages/Accounting/Ledger';
import Bills from './Pages/Accounting/Bills';
import BatchInvoices from './Pages/Accounting/BatchInvoices';
import Invoices from './Pages/Accounting/Invoices';
import AccountsChart from './Pages/Accounting/AccountsChart';
import Products from './Pages/Operations/Products';
import Vendors from './Pages/Operations/Vendors';
import PurchaseOrders from './Pages/Operations/PurchaseOrders';
import RequestForQuotes from './Pages/Operations/RequestForQuotes';
import Pricing from './Pages/Operations/Pricing';
import Inventory from './Pages/Warehouse/Inventory';
import RecieveGoods from './Pages/Warehouse/RecieveGoods';
import MatierialTransfer from './Pages/Warehouse/MatierialTransfer';
import Browser from './Pages/Leagacy/Browser';
import TimeClock from './Pages/SystemAdmin/TimeClock';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import ResetPassword from  './Auth/ResetPassword';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
import BasicAuth from '../services/auth/Basic/index';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  console.log('__________________');
  console.log(authUser)
  if(authUser !== null && authUser.resetPassword !== undefined && authUser.resetPassword !== null && authUser.resetPassword === true){
    location.pathname = '/setpassword';
  }
  if(authUser === null && !(location.pathname === '' || location.pathname === '/')){
    console.log('_________END_________');
    location.pathname = '/signin';  
    //location.pathname = '/';
  }
  console.log('__________________');
  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/signin'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/sample-page'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/time-clock" component={TimeClock} />
        <Route path="/sample-page" component={SamplePage} />
        <Route path="/salesorder" component={SalesOrder} />
        <Route path="/customer" component={Customer} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/ledger" component={Ledger} />
        <Route path="/accounts-charts" component={AccountsChart} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/batch-invoices" component={BatchInvoices} />
        <Route path="/reporting" component={Reporting} />
        <Route path="/bills" component={Bills} />
        <Route path="/products" component={Products} />
        <Route path="/vendors" component={Vendors} />
        <Route path="/purchase-orders" component={PurchaseOrders} />
        <Route path="/request-for-quotes" component={RequestForQuotes} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/matierial-transfer" component={MatierialTransfer} />
        <Route path="/recieve-goods" component={RecieveGoods} />
        <Route path="/browser" component={Browser} />
        <Route path="/signin" component={Login} />
        <Route path="/setpassword" component={ResetPassword} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
