import { ABOUT_TEXT_FAIL, ABOUT_TEXT_REQUEST, ABOUT_TEXT_SUCCESS } from "../constants/footerConstants";

export const about = () => async (dispatch) => {
    try {
      dispatch({ type: ABOUT_TEXT_REQUEST });
  
      const { data } = await axios.get('/api/about');
  
      // console.log(data);
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
  