import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const GraphQLProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://rickandmortyapi.com/graphql",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
