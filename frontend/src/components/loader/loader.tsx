"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const LOADER_DURATION_MS = 300;

interface LoaderState {
  themeSetting: { dataLoader: string };
}

/** Full-screen loading indicator, same markup as the HTML template's `#loader-wrapper`. */
export const LoaderScreen = () => (
  <div id="loader-wrapper">
    <div id="loader">
      <span className="loader-line"></span>
    </div>
  </div>
);

/** Shows the loader briefly on first load and on every route change (HTML: script.js loader block). */
const RouteLoader = () => {
  const { pathname } = { pathname: usePathname() ?? "" };
  const enabled = useSelector((state: LoaderState) => state.themeSetting.dataLoader) !== "disable";
  const [visible, setVisible] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [pathname, enabled]);

  return visible ? <LoaderScreen /> : null;
};

export default RouteLoader;
