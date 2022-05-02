import React from 'react';
import { 
  AddToQueue, 
  AutoGraph, 
  Balance, 
  Inventory, 
  Article, 
  AccountCircle, 
  Addchart, 
  Approval, 
  Collections, 
  CurrencyExchange, 
  ContentPaste, 
  Cottage, 
  LibraryBooks, 
  ListAlt, 
  CurrencyBitcoin, 
  BookmarkAdded,
  AirportShuttle, 
  TapAndPlay, 
  Schedule  
} from '@mui/icons-material';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.system'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.admin'} />,
        type: 'item',
        icon: <Schedule />,
        link: '/time-clock',
      },
    ],
  },
  {
    name: <IntlMessages id={'sidebar.sale'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.sales.salesorder'} />,
        type: 'item',
        icon: <Balance />,
        link: '/salesorder',
      },
      {
        name: <IntlMessages id={'pages.sales.customer'} />,
        type: 'item',
        icon: <AccountCircle />,
        link: '/customer',
      },
      {
        name: <IntlMessages id={'pages.sales.quotes'} />,
        type: 'item',
        icon: <Article />,
        link: '/quotes',
      },
    ],
  },
  {
    name: <IntlMessages id={'sidebar.accounting'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.accounts.chart'} />,
        type: 'item',
        icon: <AutoGraph />,
        link: '/accounts-charts',
      },
      {
        name: <IntlMessages id={'pages.accounts.ledger'} />,
        type: 'item',
        icon: <Addchart />,
        link: '/ledger',
      },
      {
        name: <IntlMessages id={'pages.accounts.invoices'} />,
        type: 'item',
        icon: <Approval />,
        link: '/invoices',
      },
      {
        name: <IntlMessages id={'pages.accounts.batch.invoices'} />,
        type: 'item',
        icon: <Collections />,
        link: '/batch-invoices',
      },
      {
        name: <IntlMessages id={'pages.accounts.bills'} />,
        type: 'item',
        icon: <CurrencyExchange />,
        link: '/bills',
      },
      {
        name: <IntlMessages id={'pages.accounts.reporting'} />,
        type: 'item',
        icon: <AddToQueue />,
        link: '/reporting',
      },
    ],
  },
  {
    name: <IntlMessages id={'sidebar.operations'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.operations.products'} />,
        type: 'item',
        icon: <ContentPaste />,
        link: '/products',
      },
      {
        name: <IntlMessages id={'pages.operations.vendors'} />,
        type: 'item',
        icon: <Cottage />,
        link: '/vendors',
      },
      {
        name: <IntlMessages id={'pages.operations.purchase.orders'} />,
        type: 'item',
        icon: <LibraryBooks />,
        link: '/purchase-orders',
      },
      {
        name: <IntlMessages id={'pages.operations.request.for.quotes'} />,
        type: 'item',
        icon: <ListAlt />,
        link: '/request-for-quotes',
      },
      {
        name: <IntlMessages id={'pages.operations.pricing'} />,
        type: 'item',
        icon: <CurrencyBitcoin />,
        link: '/pricing',
      },
    ],


  },

  {
    name: <IntlMessages id={'sidebar.warehouse'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.warehouse.recieve.goods'} />,
        type: 'item',
        icon: <BookmarkAdded />,
        link: '/recieve-goods',
      },
      {
        name: <IntlMessages id={'pages.warehouse.inventory'} />,
        type: 'item',
        icon: <Inventory />,
        link: '/inventory',
      },
      {
        name: <IntlMessages id={'pages.warehouse.matierial.transfer'} />,
        type: 'item',
        icon: <AirportShuttle />,
        link: '/matierial-transfer',
      },
    ],


  },

  {
    name: <IntlMessages id={'sidebar.leagacy'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.leagcy.browser'} />,
        type: 'item',
        icon: <TapAndPlay />,
        link: '/browser',
      },
    ],


  }

];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <AddToQueue />,
        link: '/sample-page',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <AddToQueue />,
        link: '/sample-page',
      },
    ],
  },
];
