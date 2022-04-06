import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';

import ProductView from './ProductView';
import RecentOrders from './RecentOrders';

import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Products', isActive: true },
];

const ProductsDashboard = () => {
  return (
    <PageContainer heading="Products Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} xl={7}>
          <RecentOrders />
        </Grid>

        <Grid item xs={12} xl={7}>
          <ProductView />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default ProductsDashboard;
