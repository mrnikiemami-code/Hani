"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/core/redux/store";
import { useHydration } from "@/core/redux/useHydration";

type Props = {
  children: React.ReactNode;
};

function HydrationWrapper({ children }: Props) {
  useHydration();
  return <>{children}</>;
}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <HydrationWrapper>{children}</HydrationWrapper>
    </Provider>
  );
}
