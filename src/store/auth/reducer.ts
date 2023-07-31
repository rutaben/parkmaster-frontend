import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp } from "./actions";

export type AuthStateType = {
  userToken: string | null;
  signInLoading: boolean;
  signInError: Array<{ [key: string]: string }> | string | null;
  signUpLoading: boolean;
  signUpSuccess: boolean;
  signUpError: Array<{ [key: string]: string }> | string | null;
  isAuthenticated: boolean;
};

export const initialState: AuthStateType = {
  userToken: null,
  signInLoading: true,
  signInError: null,
  signUpLoading: false,
  signUpSuccess: false,
  signUpError: null,
  isAuthenticated: !!localStorage.getItem("userToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
    },
    resetSignInError: (state) => {
      state.signInError = null;
    },
    resetSignUpError: (state) => {
      state.signUpError = null;
    },
  },
  // Reducers to handle async actions from actions fil
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.userToken = action.payload as string;
        state.signInLoading = false;
        state.signInError = null;
        state.isAuthenticated = true;
        localStorage.setItem("userToken", action.payload as string);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInLoading = false;
        state.signInError = action.payload as string;
      })

      .addCase(signUp.pending, (state) => {
        state.signUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpLoading = false;
        state.signUpSuccess = true;
        state.signUpError = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.payload as string;
      });
  },
});

// Action creators export
export const { signOut, resetSignInError, resetSignUpError } =
  authSlice.actions;

export default authSlice.reducer;
