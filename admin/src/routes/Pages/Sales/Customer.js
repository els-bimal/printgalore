import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';
import CustomerCard from './Customer/CustomerCard';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.sale'} />, link: '/' },
  { label: <IntlMessages id={'pages.sales.customer'} />, isActive: true },
];
let customers = [
  {
    no : '1',
    id : 'A1WIND',
    customerName : 'A-1 Windows and doors',
    billingAddress : '16122 ORANGE AVED, Paramount CA 90723',
    phone : '(562) 633-1090'
  },
  {
    no : '2',
    id : 'A2WIND',
    customerName : 'A-2 Windows and doors',
    billingAddress : '16122 ORANGE AVED, Paramount CA 90723',
    phone : '(562) 633-1090'
  },
  {
    no : '3',
    id : 'A3WIND',
    customerName : 'A-3 Windows and doors',
    billingAddress : '16122 ORANGE AVED, Paramount CA 90723',
    phone : '(562) 633-1090'
  },
  {
    no : '4',
    id : 'A4WIND',
    customerName : 'A-4 Windows and doors',
    billingAddress : '16122 ORANGE AVED, Paramount CA 90723',
    phone : '(562) 633-1090'
  },
]
const Customer = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.sales.customer" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.sales.customer" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Customer</h3>
              <Container className='elementContainer'>                
                <div >
                  <Row  >
                    <Col>
                      <CustomerCard customer={customers[0]} />
                    </Col>
                    <Col>
                      <CustomerCard customer={customers[1]} />
                    </Col>
                    <Col>
                      <CustomerCard customer={customers[2]} />
                    </Col>
                    <Col>
                      <CustomerCard customer={customers[3]} />
                    </Col>
                  </Row>
                  </div>
              </Container>
            <SidebarButtons />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Customer;
