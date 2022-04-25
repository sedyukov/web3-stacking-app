export interface IWalletState {
  isConnected: boolean,
  isUpdating: boolean,
  messages: string[]
}

export const initState = (): { messages: string[], isConnected: boolean, isUpdating: boolean } => ({
  isConnected: false,
  isUpdating: true,
  messages: [],
})

export default initState
