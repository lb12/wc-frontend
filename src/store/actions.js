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
