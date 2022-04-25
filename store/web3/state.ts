import { IWeb3Getter } from './gettets'

export interface IWeb3State {
  isConnected: boolean,
}

export const initState = (): IWeb3State => ({
  isConnected: false
})

export default initState
