export interface IWalletState {
  isConnected: boolean,
  isUpdating: boolean,
  messages: string[],
  chainId: string;
}

export const initState = (): { messages: string[], isConnected: boolean, isUpdating: boolean, chainId: string } => ({
  isConnected: false,
  isUpdating: true,
  messages: [],
  chainId: ''
})

export default initState
