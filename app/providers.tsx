"use client";
import { config, queryClient } from "../config.js";
// import { AlchemyClientState } from "@account-kit/core";
// import { AlchemyAccountProvider } from "@account-kit/react";
// import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const Providers = (props: any) => {
  // Minimal provider for deployment
  return <>{props.children}</>;
};
