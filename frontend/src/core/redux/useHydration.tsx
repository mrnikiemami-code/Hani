"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDataTheme, setLoader, setRtl } from './themeSettingSlice';

export const useHydration = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load theme settings from sessionStorage after hydration
    const dataTheme = sessionStorage.getItem("dataTheme");
    const dataLoader = sessionStorage.getItem("dataLoader");
    const rtl = sessionStorage.getItem("rtl");

    if (dataTheme) {
      dispatch(setDataTheme(dataTheme));
    }
    if (dataLoader) {
      dispatch(setLoader(dataLoader));
    }
    if (rtl) {
      dispatch(setRtl(JSON.parse(rtl)));
    }
  }, [dispatch]);
};
