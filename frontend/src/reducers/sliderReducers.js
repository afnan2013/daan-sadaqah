import {
  SLIDER_LIST_FAIL,
  SLIDER_LIST_REQUEST,
  SLIDER_LIST_SUCCESS,
} from '../constants/sliderConstants';

export const sliderListReducer = (state = { sliders: [] }, action) => {
  switch (action.type) {
    case SLIDER_LIST_REQUEST:
      return { loading: true };
    case SLIDER_LIST_SUCCESS:
      return { loading: false, sliders: action.payload };
    case SLIDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
