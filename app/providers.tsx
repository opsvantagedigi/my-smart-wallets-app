"use client";
import { config, queryClient } from "../config";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";

export const Providers = (props: any) => {
  return (
    <AlchemyAccountProvider config={config} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </AlchemyAccountProvider>
  );
};
