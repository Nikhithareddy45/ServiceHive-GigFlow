import { createSlice } from "@reduxjs/toolkit";

const stored = (() => {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null");
  } catch {
    return null;
  }
})();
const initialState = {
  user: stored,
  isAuthenticated: !!stored,
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      } catch {}
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem("auth_user");
      } catch {}
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
