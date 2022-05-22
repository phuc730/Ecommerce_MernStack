import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./userRedux";
import { removeCart } from "./cartRedux";

import { publicRequest, userRequest } from "../RequestMethod";
import { checkoutFailure, checkoutStart, checkoutSuccess } from "./orderRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auths/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(loginStart());
  try {
    dispatch(loginFailure());
  } catch (err) {}
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auths/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const emptyCart = async (dispatch) => {
  dispatch(removeCart());
};

export const createOrder = async (dispatch, order) => {
  dispatch(checkoutStart());
  try {
    const res = await userRequest.post("/orders/CreateOrder", order);
    dispatch(checkoutSuccess(res.data));
  } catch (err) {
    dispatch(checkoutFailure());
  }
};
