import { RootState } from "@/lib/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  emailToVerify: string;
}

export const initialState: AuthState = {
  emailToVerify: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addEmailToVerify(state, action: PayloadAction<string>) {
      state.emailToVerify = action.payload;
    },
  },
});

export const { addEmailToVerify } = authSlice.actions;
export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
