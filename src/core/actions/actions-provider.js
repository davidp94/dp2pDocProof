import constants from 'core/types';

/**
 * specifyProvider - Specify the Web3 PRovider
 */
export function specifyProvider(provider) {
  return {
    provider: provider,
    type    : constants.SPECIFY_PROVIDER
  };
}

/**
 * getContractInitInfo
 */
export function setContractInitInfo(initInfo) {
  return {
    contractInitInfo: initInfo,
    type    : constants.SET_CONTRACT_INIT_INFO
  };
}

/**
 * addSignature
 */
export function addSignature(info) {
  return {
    info: info,
    type    : constants.ADD_SIGNATURE
  };
}

/**
 * delSignature
 */
export function delSignature(info) {
  return {
    info: info,
    type    : constants.DEL_SIGNATURE
  };
}

/**
 * notarizeDocument
 */
export function notarizeDocument(info) {
  return {
    info: info,
    type    : constants.NOTARIZE_DOCUMENT
  };
}