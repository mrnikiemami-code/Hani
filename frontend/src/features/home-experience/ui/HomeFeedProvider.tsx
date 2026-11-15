"use client";

import { createContext, useContext } from "react";
import type { HomeFeed } from "../domain/home-feed";

const HomeFeedContext = createContext<HomeFeed | null>(null);

export function HomeFeedProvider({
  value,
  children
}: {
  value: HomeFeed | null;
  children: React.ReactNode;
}) {
  return (
    <HomeFeedContext.Provider value={value}>
      {children}
    </HomeFeedContext.Provider>
  );
}

export function useHomeFeed(): HomeFeed | null {
  return useContext(HomeFeedContext);
}
