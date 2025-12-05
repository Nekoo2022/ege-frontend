"use client";

import client from "@/libs/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
import type { PropsWithChildren } from "react";

export function ApolloClientDriver({ children }: PropsWithChildren<unknown>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
