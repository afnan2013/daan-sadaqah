import {
  ABOUT_TEXT_FAIL,
  ABOUT_TEXT_REQUEST,
  ABOUT_TEXT_SUCCESS,
  USEFUL_LINKS_REQUEST,
  USEFUL_LINKS_SUCCESS,
  USEFUL_LINKS_FAIL,
} from '../constants/footerConstants';

export const aboutSiteReducer = (state = { about: {} }, action) => {
  switch (action.type) {
    case ABOUT_TEXT_REQUEST:
      return { loading: true };
    case ABOUT_TEXT_SUCCESS:
      return { loading: false, about: action.payload };
    case ABOUT_TEXT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usefulLinksListReducer = (state = { usefulLinks: [] }, action) => {
  switch (action.type) {
    case USEFUL_LINKS_REQUEST:
      return { loading: true };
    case USEFUL_LINKS_SUCCESS:
      return { loading: false, usefulLinks: action.payload };
    case USEFUL_LINKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
