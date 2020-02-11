import * as Types from "./types";
import * as API from "../services/APIService";

// Advert actions
export const fetchAdverts = filters => {
  return async (dispatch, getState) => {
    dispatch(fetchAdvertsRequest());
    try {
      const { paginationFilters } = getState();
      const response = await API.listAdverts(filters, paginationFilters);

      if (!response.success || response.errors) {
        dispatch(fetchAdvertsFailure(response));
        return;
      }

      dispatch(
        fetchAdvertsSuccess({
          adverts: response.results,
          total: response.totalAdverts
        })
      );
    } catch (error) {
      dispatch(fetchAdvertsFailure(error));
    }
  };
};

export const fetchAdvertsRequest = () => ({
  type: Types.FETCH_ADVERTS_REQUEST
});

export const fetchAdvertsSuccess = adverts => ({
  type: Types.FETCH_ADVERTS_SUCCESS,
  adverts
});

export const fetchAdvertsFailure = error => ({
  type: Types.FETCH_ADVERTS_FAILURE,
  error
});

// Tags actions
export const fetchTags = () => {
  return async (dispatch, getState) => {
    const { tags } = getState();

    // Compruebo si los tags YA están cargados en el redux antes de consultar API
    if (!tags || Object.entries(tags).length === 0) {
      dispatch(fetchTagsRequest());
      try {
        const response = await API.getTags();

        if (!response.success || response.errors) {
          dispatch(fetchTagsFailure(response));
          return;
        }

        dispatch(fetchTagsSuccess(response.results));
      } catch (error) {
        dispatch(fetchTagsFailure(error));
      }
    }
  };
};

// TAGS_FETCH
export const fetchTagsRequest = () => ({
  type: Types.FETCH_TAGS_REQUEST
});

export const fetchTagsSuccess = tags => ({
  type: Types.FETCH_TAGS_SUCCESS,
  tags
});

export const fetchTagsFailure = error => ({
  type: Types.FETCH_TAGS_FAILURE,
  error
});

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

// Pagination actions
export const setDisableNextPage = disableNextPage => {
  return function(dispatch, getState) {
    const { paginationFilters } = getState();
    dispatch(setPaginationFilters({ ...paginationFilters, disableNextPage }));
  };
};

export const setPaginationFilters = paginationFilters => ({
  type: Types.SET_PAGINATION_FILTERS,
  paginationFilters
});
