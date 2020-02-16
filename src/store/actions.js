import * as Types from "./types";
import * as API from "../services/APIService";
import { PaginationFilters } from "../utils/variables";

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

export const fetchAdvert = id => {
  return async (dispatch, getState) => {
    dispatch(fetchAdvertRequest());
    try {
      const response = await API.getAdvertById(id);

      if (!response.success || response.errors) {
        dispatch(fetchAdvertFailure(response));
        return;
      }

      dispatch(fetchAdvertSuccess({ advert: response.result }));
    } catch (error) {
      dispatch(fetchAdvertFailure(error));
    }
  };
};

export const fetchMemberAdverts = memberId => {
  return async (dispatch, getState) => {
    dispatch(fetchMemberAdvertsRequest());
    try {
      const { paginationFilters } = getState();
      const response = await API.listMemberAdverts(memberId, paginationFilters, false);

      if (!response.success || response.errors) {
        dispatch(fetchMemberAdvertsFailure(response));
        return;
      }

      dispatch(
        fetchMemberAdvertsSuccess({
          adverts: response.results,
          total: response.totalAdverts
        })
      );
    } catch (error) {
      dispatch(fetchMemberAdvertsFailure(error));
    }
  };
};

export const fetchMemberFavouriteAdverts = memberId => {
  return async (dispatch, getState) => {
    dispatch(fetchMemberFavouriteAdvertsRequest());
    try {
      const { paginationFilters } = getState();
      const response = await API.listMemberAdverts(memberId, paginationFilters, true);

      if (!response.success || response.errors) {
        dispatch(fetchMemberFavouriteAdvertsFailure(response));
        return;
      }

      dispatch(
        fetchMemberFavouriteAdvertsSuccess({
          adverts: response.results,
          total: response.totalAdverts
        })
      );
    } catch (error) {
      dispatch(fetchMemberFavouriteAdvertsFailure(error));
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

export const fetchAdvertRequest = () => ({
  type: Types.FETCH_ADVERT_REQUEST
});

export const fetchAdvertSuccess = advert => ({
  type: Types.FETCH_ADVERT_SUCCESS,
  advert
});

export const fetchAdvertFailure = error => ({
  type: Types.FETCH_ADVERT_FAILURE,
  error
});

export const fetchMemberAdvertsRequest = () => ({
  type: Types.FETCH_MEMBER_ADVERTS_REQUEST
});

export const fetchMemberAdvertsSuccess = adverts => ({
  type: Types.FETCH_MEMBER_ADVERTS_SUCCESS,
  adverts
});

export const fetchMemberAdvertsFailure = error => ({
  type: Types.FETCH_MEMBER_ADVERTS_FAILURE,
  error
});

export const fetchMemberFavouriteAdvertsRequest = () => ({
  type: Types.FETCH_MEMBER_FAVOURITE_ADVERTS_REQUEST
});

export const fetchMemberFavouriteAdvertsSuccess = adverts => ({
  type: Types.FETCH_MEMBER_FAVOURITE_ADVERTS_SUCCESS,
  adverts
});

export const fetchMemberFavouriteAdvertsFailure = error => ({
  type: Types.FETCH_MEMBER_FAVOURITE_ADVERTS_FAILURE,
  error
});

export const setAdvertToDelete = advert => ({
  type: Types.SET_ADVERT_TO_DELETE,
  advertToDelete: advert
});

export const deleteAdvert = advert => {
  return async function(dispatch, getState) {
    dispatch(deleteAdvertRequest());
    try {
      const { token } = getState().user;
      const response = await API.deleteAdvert(advert, token);

      if (!response.success || response.errors) {
        dispatch(deleteAdvertFailure(response));
        return;
      }

      dispatch(deleteAdvertSuccess(response.result));
    } catch (error) {
      dispatch(deleteAdvertFailure(error));
    }
  };
};

export const deleteAdvertRequest = () => ({
  type: Types.DELETE_ADVERT_REQUEST
});

export const deleteAdvertSuccess = advert => ({
  type: Types.DELETE_ADVERT_SUCCESS,
  advertToDelete: advert
});

export const deleteAdvertFailure = error => ({
  type: Types.DELETE_ADVERT_FAILURE,
  error
});

export const createAdvert = formData => {
  return async function(dispatch, getState) {
    dispatch(createAdvertRequest());
    try {
      const { token } = getState().user;

      formData.append('token', token);

      const response = await API.createAdvert(formData);

      if (!response.success || response.errors) {
        dispatch(createAdvertFailure(response));
        return;
      }

      dispatch(createAdvertSuccess(response.result));
    } catch (error) {
      dispatch(createAdvertFailure(error));
    }
  };
};

export const editAdvert = formData => {
  return async function(dispatch, getState) {
    dispatch(editAdvertRequest());
    try {
      const { token } = getState().user;
      const advertId = formData.get('id');
      const memberId = formData.get('member');

      formData.append('token', token);


      const response = await API.editAdvert(advertId, memberId, formData);

      if (!response.success || response.errors) {
        dispatch(editAdvertFailure(response));
        return;
      }

      dispatch(editAdvertSuccess(response.result));
    } catch (error) {
      dispatch(editAdvertFailure(error));
    }
  };
};


export const createAdvertRequest = () => ({
  type: Types.CREATE_ADVERT_REQUEST
});

export const createAdvertSuccess = advert => ({
  type: Types.CREATE_ADVERT_SUCCESS,
  advert
});

export const createAdvertFailure = error => ({
  type: Types.CREATE_ADVERT_FAILURE,
  error
});


export const editAdvertRequest = () => ({
  type: Types.EDIT_ADVERT_REQUEST
});

export const editAdvertSuccess = advert => ({
  type: Types.EDIT_ADVERT_SUCCESS,
  advert
});

export const editAdvertFailure = error => ({
  type: Types.EDIT_ADVERT_FAILURE,
  error
});


export const setUserFavs = favs => {
  return async function(dispatch, getState) {
    dispatch(setUserFavsRequest());
    try {
      const { user } = getState();

      const response = await API.setUserFavs(favs, user.user._id, user.token);

      if (!response.success || response.errors) {
        dispatch(setUserFavsFailure(response));
        return;
      }

      console.log(response.result)
      dispatch(setUserFavsSuccess(response.result));
    } catch (error) {
      dispatch(setUserFavsFailure(error));
    }
  };
};


export const setUserFavsRequest = () => ({
  type: Types.SET_USER_FAVS_REQUEST
});

export const setUserFavsSuccess = user => ({
  type: Types.SET_USER_FAVS_SUCCESS,
  user
});

export const setUserFavsFailure = error => ({
  type: Types.SET_USER_FAVS_FAILURE,
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

export const unsubscribeUser = () => {
  return async function(dispatch, getState) {
    const { user } = getState();
    dispatch(unsubscribeRequest());
    try {
      const response = await API.unsubscribeUser(user.user._id, user.token);
      if (!response.success || response.errors || response.error) {
        dispatch(unsubscribeFailure(response));
        return;
      }

      dispatch(unsubscribeSuccess({}));
    } catch (error) {
      console.log(error);
      dispatch(unsubscribeFailure(error));
    }
  };
};

export const updateUserData = userObj => {
  return async function(dispatch, getState) {
    const { user, token } = getState().user;
    const { _id } = user;
    dispatch(updateUserDataRequest());
    try {
      const response = await API.updateUserData(_id, userObj, token);
      if (!response.success || response.errors || response.error) {
        dispatch(updateUserDataFailure(response));
        return;
      }

      dispatch(updateUserDataSuccess(response.result));
    } catch (error) {
      console.log(error);
      dispatch(updateUserDataFailure(error));
    }
  };
};

export const updateUserPassword = password => {
  return async function(dispatch, getState) {
    const { user, token } = getState().user;
    const { _id } = user;
    dispatch(updateUserPasswordRequest());
    try {
      const response = await API.changeUserPassword(_id, password, token);
      if (!response.success || response.errors || response.error) {
        dispatch(updateUserPasswordFailure(response));
        return;
      }

      dispatch(updateUserPasswordSuccess(response.result));
    } catch (error) {
      console.log(error);
      dispatch(updateUserPasswordFailure(error));
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

// UNSUBSCRIBE_USER
export const unsubscribeRequest = () => ({
  type: Types.UNSUBSCRIBE_REQUEST
});

export const unsubscribeSuccess = user => ({
  type: Types.UNSUBSCRIBE_SUCCESS,
  user
});

export const unsubscribeFailure = error => ({
  type: Types.UNSUBSCRIBE_FAILURE,
  error
});

// UPDATE_USER_DATA
export const updateUserDataRequest = () => ({
  type: Types.UPDATE_USER_DATA_REQUEST
});

export const updateUserDataSuccess = user => ({
  type: Types.UPDATE_USER_DATA_SUCCESS,
  user
});

export const updateUserDataFailure = error => ({
  type: Types.UPDATE_USER_DATA_FAILURE,
  error
});

// UPDATE_USER_PASSWORD
export const updateUserPasswordRequest = () => ({
  type: Types.UPDATE_USER_PASSWORD_REQUEST
});

export const updateUserPasswordSuccess = user => ({
  type: Types.UPDATE_USER_PASSWORD_SUCCESS,
  user
});

export const updateUserPasswordFailure = error => ({
  type: Types.UPDATE_USER_PASSWORD_FAILURE,
  error
});

// Pagination actions
export const setChangePage = page => {
  return function(dispatch, getState) {
    const { paginationFilters } = getState();
    dispatch(setPaginationFilters({ ...paginationFilters, page }));
  };
};

export const resetPaginationFilters = () => {
  return function(dispatch) {
    dispatch(setPaginationFilters(PaginationFilters));
  };
};

export const setPaginationFilters = paginationFilters => ({
  type: Types.SET_PAGINATION_FILTERS,
  paginationFilters
});
