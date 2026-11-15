import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const THEME_STORAGE = { theme: "dataTheme", loader: "dataLoader", rtl: "rtl" } as const;

interface ThemeSettingState {
  dataTheme: string;
  dataLoader: string;
  isRtl: string | boolean;
}

// Server-safe defaults; ThemeSync restores the saved values from localStorage after hydration.
const initialState: ThemeSettingState = {
  dataTheme: "light",
  dataLoader: "enable",
  isRtl: false,
};

const themeSettingSlice = createSlice({
  name: "themeSetting",
  initialState,
  reducers: {
    setDataTheme: (state, action: PayloadAction<string>) => {
      state.dataTheme = action.payload;
    },
    setLoader: (state, action: PayloadAction<string>) => {
      state.dataLoader = action.payload;
    },
    setRtl: (state, action: PayloadAction<string | boolean>) => {
      state.isRtl = action.payload;
    },
    resetAllMode: (state) => {
      state.dataTheme = "light";
      state.dataLoader = "enable";
      state.isRtl = "";
    },
  },
});

export const { resetAllMode, setDataTheme, setLoader, setRtl } = themeSettingSlice.actions;
export default themeSettingSlice.reducer;
