import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.sale'} />, link: '/' },
  { label: <IntlMessages id={'pages.sales.salesorder'} />, isActive: true },
];

const SalesOrder = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.sales.salesorder" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.sales.salesorder" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Sales Order</h3>
            <SidebarButtons />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default SalesOrder;
