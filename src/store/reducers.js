import * as Types from "./types";
import { PaginationFilters } from "../utils/variables.js";

export const initialState = {
  user: {},
  adverts: [],
  advert: {},
  createdAdvert: {},
  tags: [],
  paginationFilters: PaginationFilters, // page, adsPerPage,
  errorMessage: '',
  advertToDelete: '' // advert id
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case Types.FETCH_ADVERTS_SUCCESS:
    case Types.FETCH_MEMBER_ADVERTS_SUCCESS:
      return action.adverts;
    case Types.FETCH_ADVERTS_FAILURE:
    case Types.FETCH_MEMBER_ADVERTS_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export const advert = (state = initialState.advert, action) => {
  switch (action.type) {
    case Types.FETCH_ADVERT_SUCCESS:
      return action.advert;
    case Types.FETCH_ADVERT_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export const advertToDelete = (state = initialState.advertToDelete, action) => {
  switch (action.type) {
    case Types.SET_ADVERT_TO_DELETE:
    case Types.DELETE_ADVERT_SUCCESS:
      return action.advertToDelete;
    default:
      return state;
  }
};

export const createdAdvert = (state = initialState.createdAdvert, action) => {
  switch (action.type) {
    case Types.CREATE_ADVERT_SUCCESS:
      return action.createdAdvert;
    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case Types.FETCH_TAGS_SUCCESS:
      return action.tags;
    case Types.FETCH_TAGS_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case Types.SIGN_UP_SUCCESS:
    case Types.SIGN_IN_SUCCESS:
    case Types.UNSUBSCRIBE_SUCCESS:
    case Types.SET_USER:
    case Types.UPDATE_USER_DATA_SUCCESS:
      return action.user;
    case Types.SIGN_UP_FAILURE:
    case Types.SIGN_IN_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export const paginationFilters = (
  state = initialState.paginationFilters,
  action
) => {
  switch (action.type) {
    case Types.SET_PAGINATION_FILTERS:
      return action.paginationFilters;
    default:
      return state;
  }
};

export const errorMessage = (
  state = initialState.errorMessage,
  action
) => {
  switch (action.type) {
    case Types.UNSUBSCRIBE_FAILURE:
    case Types.UPDATE_USER_DATA_FAILURE:
    case Types.UPDATE_USER_PASSWORD_FAILURE:
    case Types.DELETE_ADVERT_FAILURE:
      return action.error;
    default:
      return state;
  }
};
