import { useEffect } from 'react';
import { useStore, Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from "react-helmet";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";


import { wrapper } from '~/store/index.js';
import Layout from '~/components/layout';

import { demoActions } from '~/store/demo';

import { currentDemo } from '~/server/queries';

import "~/public/sass/style.scss";


const App = ({ Component, pageProps }) => {

    
    const store = useStore();

    useEffect(() => {
        if (store.getState().demo.current !== currentDemo) {
            store.dispatch(demoActions.refreshStore(currentDemo));
        }
    }, [])

    return (
        <ApolloProvider client={client}>
        <Provider store={store} >
            <PersistGate
                persistor={store.__persistor}
                loading={<div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                        <div className="bounce4"></div>
                    </div>
                </div>}>
                <Helmet>
                    <meta charSet="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <title>Ramset eCommerce</title>

                    <meta name="keywords" content="React Template" />
                    <meta name="description" content="Ramset eCommerce" />
                    <meta name="author" content="D-THEMES" />
                </Helmet>

                <Layout>
                <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider></ApolloProvider>
    );
}

App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default wrapper.withRedux(App);

    // "resolve": {
    //     "extensions": [
    //         ".js",
    //         ".jsx"
    //     ]
    // }