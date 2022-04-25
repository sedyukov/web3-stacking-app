import { GetterTree } from 'vuex'
import { ITokenState } from '~/store/contract/state'

export interface ITokenGetter {
  getStakerData: string;
  getClaimableAmount: string;
  getContractAddress: string;
  getEvents: any;
  getIsModal: boolean;
}

const getters: GetterTree<ITokenState, ITokenState> = {
  getStakerData: (state):  string => state.stakerData,
  getContractAddress: (state):  string => state.contractAddress,
  getClaimableAmount: (state):  string => state.claimableAmount,
  getEvents: (state): any[] => state.events,
  getIsModal: (state): boolean => state.isModal,
}

export default getters
