import { MutationTree } from 'vuex'
import { IWalletState } from '~/store/wallet/state'

const mutations: MutationTree<IWalletState> = {
  SET_IS_CONNECTED: (state, payload: boolean) => (state.isConnected = payload),
  SET_IS_UPDATING: (state, payload: boolean) => (state.isUpdating = payload),
  SET_MESSAGES: (state, payload: string) =>  {
    state.messages.push(payload);
  }
}

export default mutations
