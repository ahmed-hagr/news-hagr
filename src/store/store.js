import { configureStore } from "@reduxjs/toolkit";
import newsorgReducer from "./newsorgSlice";
import newsApiReducer from "./newsapiSlice";
import newsPreferencesReducer from './newsPreferencesSlice' 
export default configureStore({
  reducer: {
    newsorg: newsorgReducer,
    newsApi: newsApiReducer,
    newsPreferences: newsPreferencesReducer,
 
  },
});
