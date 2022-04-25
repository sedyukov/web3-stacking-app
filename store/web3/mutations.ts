import { MutationTree } from 'vuex'
import { IWeb3State } from '~/store/web3/state'

const mutations: MutationTree<IWeb3State> = {
  SET_IS_CONNECTED: (state, payload: boolean) => (state.isConnected = payload)
}

export default mutations
