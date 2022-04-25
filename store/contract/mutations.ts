import { MutationTree } from 'vuex'
import { ITokenState } from '~/store/contract/state'

const mutations: MutationTree<ITokenState> = {
  SET_STAKER_DATA: (state, payload: string) => {
    state.stakerData = payload;
  },
  SET_CLAIMABLE_AMOUNT: (state, payload: string) => {
    state.claimableAmount = payload;
  },
  SET_EVENTS: (state, payload: any[]) => {
    state.events = payload;
  },
  SET_IS_MODAL: (state, payload: boolean) => {
    state.isModal = payload;
  }
}

export default mutations
