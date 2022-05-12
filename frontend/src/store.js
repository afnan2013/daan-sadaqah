import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sliderListReducer } from './reducers/sliderReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import {
  aboutSiteReducer,
  usefulLinksListReducer,
} from './reducers/footerReducers';

const reducer = combineReducers({
  sliderList: sliderListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  aboutSite: aboutSiteReducer,
  usefulLinksList: usefulLinksListReducer,
});

const initialState = {};

const middlwares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlwares))
);

export default store;
