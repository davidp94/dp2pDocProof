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
  case constants['web3/RECEIVE_ACCOUNT']:
  case constants['web3/CHANGE_ACCOUNT']:
    return Object.assign({}, state, {
      account: action.address
    });
  case constants.SET_CONTRACT_INIT_INFO:
    return Object.assign({}, state, {
      contractInitInfo: action.contractInitInfo
    });


  default:
    return state;
  }
}