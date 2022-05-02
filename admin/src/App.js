import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import configureStore, { history } from './redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import Routes from './routes';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";


export const store = configureStore();

const App = () => (
  <ApolloProvider client={client} >
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContextProvider>
          <AppWrapper>
            <Switch>
              <Routes />
            </Switch>
          </AppWrapper>
        </AppContextProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default App;
