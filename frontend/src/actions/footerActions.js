import axios from 'axios';
import {
  ABOUT_TEXT_FAIL,
  ABOUT_TEXT_REQUEST,
  ABOUT_TEXT_SUCCESS,
  USEFUL_LINKS_REQUEST,
  USEFUL_LINKS_SUCCESS,
  USEFUL_LINKS_FAIL,
} from '../constants/footerConstants';
import { apiCall } from '../utils/apiCall';

export const getAbout = () => async (dispatch) => {
  try {
    dispatch({ type: ABOUT_TEXT_REQUEST });

    const { data } = await apiCall('get', '/api/about');

    dispatch({
      type: ABOUT_TEXT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ABOUT_TEXT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUseFulLinks = () => async (dispatch) => {
  try {
    dispatch({ type: USEFUL_LINKS_REQUEST });

    const { data } = await apiCall('get', '/api/usefullinks');
    console.log(data);

    dispatch({
      type: USEFUL_LINKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USEFUL_LINKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
