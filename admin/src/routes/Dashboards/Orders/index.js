import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import ApplicationsSummary from './ApplicationsSummary';
import LastMonthSale from './LastMonthSale';
import NewOrders from './NewOrders';
import OnlineSignups from './OnlineSignups';
import OnlineTraffic from './OnlineTraffic';
import OrderAnalyticsSummary from './OrderAnalyticsSummary';
import PopularProducts from './PopularProducts';
import ProductView from './ProductView';
import RecentOrders from './RecentOrders';
import SalesStatistic from './SalesStatistic';
import SimpleNotifications from './SimpleNotifications';
import TotalEmailSent from './TotalEmailSent';
import TotalRevenue from './TotalRevenue';
import WebBrowsers from './WebBrowsers';
import YearlyProfitReport from './YearlyProfitReport';
import YearlySalesReport from './YearlySalesReport';
import MarketingCampaign from '../../Widgets/Classic/MarketingCampaign';
import SiteVisitors from './SiteVisitors';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Orders', isActive: true },
];

const OrdersDashboard = () => {
  return (
    <PageContainer heading="Orders Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} xl={7}>
          <NewOrders />
        </Grid>

        <Grid item xs={12} xl={7}>
          <RecentOrders />
        </Grid>

        <Grid item xs={12}>
          <SalesStatistic />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <LastMonthSale />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalRevenue />
        </Grid>

        <Grid item xs={12} lg={4}>
          <GridContainer>
            <Grid item xs={12} sm={6} lg={12}>
              <YearlySalesReport />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <YearlyProfitReport />
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default OrdersDashboard;
