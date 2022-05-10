import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sliderListReducer } from './reducers/sliderReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  sliderList: sliderListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const initialState = {};

const middlwares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlwares))
);

export default store;
