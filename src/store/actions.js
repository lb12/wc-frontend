import * as Types from "./types";
import * as API from "../services/APIService";

// User actions
export const signUpUser = user => {
  return async function(dispatch) {
    dispatch(signUpRequest(user));
    try {
      const response = await API.signUp(user);

      if (!response.success || response.errors) {
        dispatch(signUpFailure(response));
        return;
      }
      
      dispatch(signUpSuccess(response.result));
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
};

export const signInUser = user => {
  return async function(dispatch) {
    dispatch(signInRequest(user));
    try {
      const response = await API.signIn(user);

      if (!response.success || response.errors) {
        dispatch(signInFailure(response));
        return;
      }
      
      dispatch(signInSuccess(response.result));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
};

export const setUser = user => ({
  type: Types.SET_USER,
  user
});


// SIGN_UP CREATION
export const signUpRequest = () => ({
  type: Types.SIGN_UP_REQUEST
});

export const signUpSuccess = user => ({
  type: Types.SIGN_UP_SUCCESS,
  user
});

export const signUpFailure = error => ({
  type: Types.SIGN_UP_FAILURE,
  error
});

// SIGN_IN CREATION
export const signInRequest = () => ({
  type: Types.SIGN_IN_REQUEST
});

export const signInSuccess = user => ({
  type: Types.SIGN_IN_SUCCESS,
  user
});

export const signInFailure = error => ({
  type: Types.SIGN_IN_FAILURE,
  error
});
