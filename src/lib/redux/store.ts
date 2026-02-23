import authSliceReducer from "@/lib/redux/auth-slice";
import dashboardSliceReducer from "@/lib/redux/dashboard-slice";
import { configureStore } from "@reduxjs/toolkit";

// ...

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    dashboard: dashboardSliceReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
