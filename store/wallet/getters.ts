import { GetterTree } from 'vuex'
import { IWalletState } from '~/store/wallet/state'

export interface IWeb3Getter {
  getIsConnected: boolean;
  getIsUpdating: boolean;
  getMessages: string[];
  chainId: string;
}


const getters: GetterTree<IWalletState, IWalletState> = {
  getIsConnected: (state): boolean => state.isConnected,
  getIsUpdating: (state): boolean => state.isUpdating,
  getMessages: (state): string[] => state.messages,
  getChainId: (state): string => state.chainId,
}

export default getters
