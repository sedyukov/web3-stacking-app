import Token from '~/classes/Token'

export interface ITokensMap {
  [key: string]: Token;
}

export interface ITokenState {
  tokensMap: ITokensMap,
  tokenAddresses: string[]
}

export const initState = (): { tokenAddresses: string[]; tokensMap: {} } => ({
  tokensMap: {},
  tokenAddresses: []
})

export default initState
