import { ErrorPayload, UserReducerInitial } from "@/types/AllTypes";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  companySignupSubmit,
  getUser,
  loginUser,
  logoutUser,
  signupUser,
  verifyinguser,
} from "../actions/userActions";
import toast from "react-hot-toast";
import {
  passwordUpdation,
  updateProfile,
  updateProfileThreePercent,
  updateProfileTwoPercent,
  verifyForgotEmail,
} from "../actions/secondaryAction";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  role: null,
  user: null,
  message: "",
  status: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserReducerInitial>) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.err = false;
        state.message = payload.message;
        toast.success("Verification link has been sended Your mail", {
          className: "text-center",
        });
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
        state.user = null;
      })
      .addCase(verifyinguser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyinguser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.role = payload.user.role;
        state.err = false;
      })
      .addCase(verifyinguser.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      //get User and Check Authentication
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload?.user;
        state.role = payload?.role;
        if (payload.role === "company") {
          state.status = payload.approvelStatus;
        }
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user;
        state.role = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload?.role;
        if (payload) {
          toast.success("Login Succesfull !!");
        }
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.user = payload?.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      // Company Signup
      .addCase(companySignupSubmit.pending, (state) => {
        state.loading = true;
      })
      .addCase(companySignupSubmit.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.role = payload.role;
        state.message = payload.message;
        state.user = payload.user;
        state.status = payload.status;
      })
      .addCase(companySignupSubmit.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      // forgot password
      .addCase(verifyForgotEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyForgotEmail.fulfilled, (state) => {
        state.loading = false;
        state.err = false;
        state.user = null;
      })
      .addCase(verifyForgotEmail.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
      })
      // password updation for forgot
      .addCase(passwordUpdation.pending, (state) => {
        state.loading = true;
      })
      .addCase(passwordUpdation.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.err = false;
      })
      .addCase(passwordUpdation.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      // company profile updation
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload.role;
        state.message = payload.message;
        state.user = payload.user;
        state.status = payload.status;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(updateProfileTwoPercent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileTwoPercent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload.role;
        state.message = payload.message;
        state.user = payload.user;
        state.status = payload.status;
      })
      .addCase(updateProfileTwoPercent.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(updateProfileThreePercent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileThreePercent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload.role;
        state.message = payload.message;
        state.user = payload.user;
        state.status = payload.status;
      })
      .addCase(updateProfileThreePercent.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      });
  },
});
export default userReducer.reducer;
export const { resetMessage } = userReducer.actions;
