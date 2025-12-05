// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SERVER_URL } from "./constants/url.constants";

const client = new ApolloClient({
  link: new HttpLink({
    uri: SERVER_URL,
    credentials: "include", // если нужна авторизация (cookies)
  }),
  cache: new InMemoryCache(),
});

export default client;
