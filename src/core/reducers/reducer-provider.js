import constants from 'core/types';

import _merge from 'lodash/merge';
import _remove from 'lodash/remove';


const initialState = {
  provider: null,
  contractState: {
    documents: {
      //key:documentHash
      //value: Object
    }
  }
};

export function providerReducer(state = initialState, action) {
  var newState;
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
  case constants.ADD_SIGNATURE:
    console.log(action.info);
    var _documentSrc = state.contractState.documents[action.info.document];
    var document = _merge({}, _documentSrc || {
      document: action.info.document,
      signersCount: 0,
      signers: [],
      notarized: false,
      notarizedBlockNumber: null,
      lastUpdateBlockNumber: null
    });

    newState = _merge({}, state);
    newState.contractState.documents[action.info.document] = document;
    newState.contractState.documents[action.info.document].signers.push(action.info.signer);
    newState.contractState.documents[action.info.document].signersCount++;
    newState.contractState.documents[action.info.document].lastUpdateBlockNumber = action.info.blockNumber;
    
    return newState;
  case constants.DEL_SIGNATURE:
    console.log(action.info);
    newState = _merge({}, state);
    _remove(newState.contractState.documents[action.info.document].signers, (s) => {
      s === action.info.signer;
    })
    newState.contractState.documents[action.info.document].signersCount--;
    newState.contractState.documents[action.info.document].lastUpdateBlockNumber = action.info.blockNumber;

    return newState;
  case constants.NOTARIZE_DOCUMENT:
    console.log(action.info);
    newState = _merge({}, state);
    newState.contractState.documents[action.info.document].notarized = true;
    newState.contractState.documents[action.info.document].notarizedBlockNumber = action.info.blockNumber;
    newState.contractState.documents[action.info.document].lastUpdateBlockNumber = action.info.blockNumber;
    
    return newState;
  default:
    return state;
  }
}