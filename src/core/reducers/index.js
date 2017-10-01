import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import { providerReducer } from 'core/reducers/reducer-provider';

const rootReducer = combineReducers({
  ui      : uiReducer,
  provider: providerReducer
});

export default rootReducer;
