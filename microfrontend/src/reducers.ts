import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    globalMfeUi: appReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
