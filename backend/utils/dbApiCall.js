import dotenv from 'dotenv';
import axios from 'axios';
import asyncHandler from 'express-async-handler';

export const getUserDetails = async (user_id) => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/getUsers');

  if (result.data.status === 1) {
    const users = result.data.returnTables[0];
    for (let i in users) {
      // const [id, userid, username, rolecode, status, creationdate] = users[i];
      if (users[i][1] === user_id) {
        console.log(users[i]);
        return users[i];
      }
    }
    return {};
  }
};

export const getUserLogin = async (p_userid, p_password) => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/login', {
    p_userid,
    p_password
  });

  // console.log(result.data.token);
  return {
    returnTables: result.data.returnTables,
    token: result.data.token
  }
   
 
};

export const getUserRolesFromDb = async (user_id) => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/getUsers');
  // console.log(result.data.returnTables);
  if (result.data.status === 1) {
    const users = result.data.returnTables[0];
    for (let i in users) {
      const {id, userid, username, rolecode, status, creationdate} = users[i];
      if (userid === user_id) {
        return rolecode;
      }
    }
  }
  return '';
};

export const getRolesFromDb = async () => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/getRoles');

  if (result.data.status === 1) {
    const roles = result.data.returnTables[0];
    return roles;
    //console.log(json);
  }
  return {};
};

export const getMenusFromDb = async (filter) => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/getMenus');

  if (result.data.status === 1) {
    const menus = result.data.returnTables[0];
    const filterdMenu = [];
    if (filter) {
      for (let i in menus) {
        const [id, menucode, menuname] = menus[i];

        for (let j in filter) {
          if (filter[j] === menucode) {
            filterdMenu.push(menus[i]);
          }
        }
      }
      return filterdMenu;
    }
    return menus;
    //console.log(json);
  }
  return {};
};

export const getMenuForRoleFromDb = async (role_code) => {
  let dbgw = process.env.DB_API_GW_HOST;
  const result = await axios.post(dbgw + '/getRoleMenuMaps');

  let menus = [];
  let menuCodes = [];
  if (result.data.status === 1) {
    const rolemenumaps = result.data.returnTables[0];
    for (let i in rolemenumaps) {
      const [id, rolecode, menucode] = rolemenumaps[i];

      if (rolecode === role_code) {
        menuCodes.push(menucode);
      }
    }
    //console.log(json);
  }

  menus = await getMenusFromDb(menuCodes);

  return menus;
};
