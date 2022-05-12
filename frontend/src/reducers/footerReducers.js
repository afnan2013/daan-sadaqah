import { ABOUT_TEXT_FAIL, ABOUT_TEXT_REQUEST, ABOUT_TEXT_SUCCESS } from "../constants/footerConstants";

export const aboutReducer = (state = { }, action) => {
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