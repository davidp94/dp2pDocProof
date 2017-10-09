import constants from 'core/types';

const initialState = {
  leftNavOpen: false,
  snackbarOpen: false,
  snackbarText: null
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {

  case constants.OPEN_NAV:
    return Object.assign({}, state, {
      leftNavOpen: true,
      snackbarOpen: false
    });

  case constants.CLOSE_NAV:
    return Object.assign({}, state, {
      leftNavOpen: false,
      snackbarOpen: false
    });

  case constants.SNACKBAR:
    return Object.assign({}, state, {
      snackbarOpen : true,
      snackbarText: action.text
    });

  default:
    return state;
  }
}