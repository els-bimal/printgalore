import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URI = `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`
const client = new ApolloClient({
    uri: API_URI,
    cache: new InMemoryCache(),
});




export default client;