import constants from 'core/types';

const initialState = {
  provider: null
};

export function providerReducer(state = initialState, action) {
  switch (action.type) {

  case constants.SPECIFY_PROVIDER:
    return Object.assign({}, state, {
      provider: action.provider
    });

  default:
    return state;
  }
}