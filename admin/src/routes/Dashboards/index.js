import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const Dashboards = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/orders`} />

        <Route path={`${requestedUrl}/products`} component={lazy(() => import('./Products'))} />
        <Route path={`${requestedUrl}/customers`} component={lazy(() => import('./Customers'))} />
        <Route path={`${requestedUrl}/orders`} component={lazy(() => import('./Orders'))} />

        <Route component={lazy(() => import('../ExtraPages/404'))} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
