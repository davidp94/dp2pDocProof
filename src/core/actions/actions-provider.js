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