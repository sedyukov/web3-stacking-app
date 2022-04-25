import { ActionTree } from 'vuex'
import { IWalletState } from '~/store/wallet/state'
import { connectNode, connectWallet } from '~/utils/web3'

const actions: ActionTree<IWalletState, IWalletState> = {
  async connectNode ({ dispatch }) {
    const r = connectNode()
    const addressesTokens = [
      process.env.stacking,
      process.env.reward,
    ]
    dispatch('token/createTokensByAddresses', { addresses: addressesTokens }, { root: true })
    await dispatch('token/fetchCommonDataToken', null, { root: true })
    return r
  },
  async connectWallet ({ commit, dispatch }) {
    const r = await connectWallet()
    if (!r.ok) {
      commit('SET_IS_CONNECTED', false);
      console.log(r)
      return r
    }
    await dispatch('token/fetchUserDataToken', null, { root: true })
    commit('SET_IS_CONNECTED', true);
    return r
  },
}

export default actions
