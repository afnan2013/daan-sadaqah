import axios from 'axios';


export const apiCall = async ({
  method,
  URL,
  publicAccess = true,
  payload,
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  token,
}) => {
  if (!publicAccess) {
    config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (method === 'post') {
    if (payload) {
      if (publicAccess) {
        return await axios.post(URL, payload, config);
      } else {
      }
    } else {
      console.log('Payload not found for POST API Request');
    }
  } else if (method === 'get') {
    if (publicAccess) {
      return await axios.get(URL);
    } else {
      return await axios.get(URL, config);
    }
  } else if (method === 'delete') {
  } else if (method === 'put') {
  } else {
    console.log('Please Specify API Request Method. Method Not Found');
  }
};
