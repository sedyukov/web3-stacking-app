import { ActionTree } from 'vuex'
import { IWeb3State } from '~/store/web3/state'
import { connectNode, connectWallet } from '~/utils/web3'

const actions: ActionTree<IWeb3State, IWeb3State> = {
  async connectNode ({ dispatch }) {
    const r = connectNode()
    const addressesTokens = [
      process.env.stacking,
      process.env.reward,
      process.env.stackingContract,
    ]
    dispatch('token/createTokensByAddresses', { addresses: addressesTokens }, { root: true })
    await dispatch('token/fetchCommonDataToken', null, { root: true })
    return r
  },
  async connectWallet ({ commit, dispatch }) {
    const r = await connectWallet()
    if (!r.ok) {
      commit('SET_IS_CONNECTED', false);
      return r
    }
    await dispatch('token/fetchUserDataToken', null, { root: true })
    commit('SET_IS_CONNECTED', true);
    return r
  }
}

export default actions
