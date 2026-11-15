"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDataTheme, setLoader, setRtl, THEME_STORAGE } from "../redux/slices/themeSettingSlice";

/** Restores saved theme settings after hydration and mirrors them onto <html>/<body> (reducers stay pure). */
const ThemeSync = () => {
  const dispatch = useAppDispatch();
  const { dataTheme, dataLoader, isRtl } = useAppSelector((state) => state.themeSetting);
  const restored = useRef(false);

  useEffect(() => {
    const theme = localStorage.getItem(THEME_STORAGE.theme);
    const loader = localStorage.getItem(THEME_STORAGE.loader);
    const rtl = localStorage.getItem(THEME_STORAGE.rtl);
    if (theme) dispatch(setDataTheme(theme));
    if (loader) dispatch(setLoader(loader));
    if (rtl) dispatch(setRtl(rtl));
    restored.current = true;
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("class", dataTheme);
    if (restored.current) localStorage.setItem(THEME_STORAGE.theme, dataTheme);
  }, [dataTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-loader", dataLoader);
    if (restored.current) localStorage.setItem(THEME_STORAGE.loader, dataLoader);
  }, [dataLoader]);

  useEffect(() => {
    if (isRtl) document.body.setAttribute("class", String(isRtl));
    if (restored.current) localStorage.setItem(THEME_STORAGE.rtl, String(isRtl || ""));
  }, [isRtl]);

  return null;
};

export default ThemeSync;
