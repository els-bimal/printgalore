import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';

import RevenueHistory from './RevenueHistory';
import NewCustomers from './NewCustomers';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Customers', isActive: true },
];

const CustomersDashboard = () => {
  return (
    <PageContainer heading="Customers Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} xl={7}>
          <NewCustomers />
        </Grid>

        <Grid item xs={12} xl={7}>
          <RevenueHistory />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default CustomersDashboard;
