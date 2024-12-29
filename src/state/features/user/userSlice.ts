import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  role: "admin" | "user";
}

const initialState: UserState = {
  role: "admin",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state: UserState, action: PayloadAction<"admin" | "user">) => {
      state.role = action.payload;
    },
    toggleRole: (state: UserState) => {
      state.role = state.role === "admin" ? "user" : "admin";
    },
  },
});

export const { setRole, toggleRole } = userSlice.actions;

export default userSlice.reducer;
