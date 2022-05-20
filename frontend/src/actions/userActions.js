import axios from 'axios';
import {
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import { apiCall } from '../utils/apiCall';

export const login = (phone, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await apiCall({
      method: 'post',
      URL: '/api/users/login',
      payload: { phone, password },
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {}
};

export const register = (phone, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await apiCall({
      method: 'post',
      URL: '/api/users',
      payload: { phone, password },
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await apiCall({
      method: 'get',
      URL: `/api/users/${id}`,
      token: userInfo.token,
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserProfile =
  (id, name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, email, password },
        config
      );

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: (({ token, ...o }) => o)(data),
      });

      localStorage.setItem(
        'userInfo',
        JSON.stringify(getState().userLogin.userInfo)
      );
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
