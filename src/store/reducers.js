import * as Types from "./types";

export const initialState = {
  user: {}
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case Types.SIGN_UP_SUCCESS:
    case Types.SIGN_IN_SUCCESS:
    case Types.SET_USER:
      return action.user;
    case Types.SIGN_UP_FAILURE:
    case Types.SIGN_IN_FAILURE:
      return action.error;
    default:
      return state;
  }
};
