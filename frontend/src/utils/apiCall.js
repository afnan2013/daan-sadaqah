import axios from 'axios';

export const apiCall = async (method, URL, publicAccess, payload, token) => {
  if (!publicAccess) {
    publicAccess = true;
  }
  if (method === 'post') {
  } else if (method === 'get') {
    if (publicAccess) {
      return await axios.get(URL);
    }
  } else if (method === 'delete') {
  } else if (method === 'put') {
  } else {
    console.log('Please Specify API Request Method. Method Not Found');
  }
};
