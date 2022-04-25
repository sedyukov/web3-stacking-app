import Token from '~/classes/Token'

export interface ITokensMap {
  [key: string]: Token;
}

export interface ITokenState {
  tokensMap: ITokensMap,
  tokenAddresses: string[],
  allowance: string[],
}

export const initState = (): { tokenAddresses: string[], tokensMap: {}, allowance: string[] } => ({
  tokensMap: {},
  tokenAddresses: [],
  allowance: [],
})

export default initState
