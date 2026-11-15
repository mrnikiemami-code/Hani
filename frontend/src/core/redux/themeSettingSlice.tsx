import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeSettingState {
  dataTheme: string;
  dataLoader: string;
  isRtl: boolean | string;
}

const getInitialTheme = (): string => {
  return "light";
};

const getInitialLoader = (): string => {
  return "enable";
};

const getInitialRtl = (): boolean | string => {
  return false;
};

const initialState: ThemeSettingState = {
  dataTheme: getInitialTheme(),
  dataLoader: getInitialLoader(),
  isRtl: getInitialRtl(),
};

const themeSettingSlice = createSlice({
  name: "themeSetting",
  initialState,
  reducers: {
    setDataTheme: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute("class", action.payload);
        sessionStorage.setItem("dataTheme", action.payload);
      }
      state.dataTheme = action.payload;
    },
    setLoader: (state, action: PayloadAction<string>) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("dataLoader", action.payload);
        document.documentElement.setAttribute("data-loader", action.payload);
      }
      state.dataLoader = action.payload;
    },
    setRtl: (state, action: PayloadAction<boolean>) => {
      const rtlValue = action.payload;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("rtl", JSON.stringify(rtlValue));
        document.body.setAttribute("class", rtlValue ? "rtl" : "");
      }
      state.isRtl = rtlValue;
    },
    resetAllMode: (state: ThemeSettingState) => {
      state.dataTheme = "light";
      state.dataLoader = "enable";
      state.isRtl = "";
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("rtl", "");
      }
    },
  },
});

export const {
  resetAllMode,
  setDataTheme,
  setLoader,
  setRtl,
} = themeSettingSlice.actions;

export default themeSettingSlice.reducer;
