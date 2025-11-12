"use client";
import { config, queryClient } from "../config";
import { AlchemyAccountProvider } from "@account-kit/react";
import { PropsWithChildren } from "react";

export const Providers = (props: PropsWithChildren<{}>) => {
  return (
    <AlchemyAccountProvider config={config} queryClient={queryClient}>
      {props.children}
    </AlchemyAccountProvider>
  );
};
