import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.system'} />, link: '/' },
  { label: <IntlMessages id={'pages.admin'} />, isActive: true },
];

const TimeClock = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.admin" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.admin" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.signUp" />
              </NavLink>
            </Box>
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.resetPassword" />
              </NavLink>
            </Box>

          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default TimeClock;
