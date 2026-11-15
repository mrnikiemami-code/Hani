import { configureStore } from "@reduxjs/toolkit";
import themeSettingSlice from "./slices/themeSettingSlice";
import sidebarSlice from "./slices/sidebarSlice";

const store = configureStore({
  reducer: {
    themeSetting: themeSettingSlice,
    sidebarSlice: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
