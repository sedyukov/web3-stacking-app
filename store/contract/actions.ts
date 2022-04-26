import { ActionTree } from 'vuex'
import { ITokenState } from '~/store/contract/state'
import {fetchContractData, getFee, getUserAddress} from '~/utils/web3'
import {STACKING_CONTRACT} from "~/utils/abis/stackingContract";
import {ITokenGetter} from "~/store/token/getters";
import {getDate, getTime, shiftedBy } from "~/utils";
import {STACKING_ERC20} from "~/utils/abis/stacking";
import Token from "~/classes/Token";
import BasicContract from "~/classes/BasicContract/BasicContract";

const actions: ActionTree<ITokenState, ITokenState> = {
  async getStakerData ({ commit, getters }) {
    try {
      let data = await fetchContractData('getStakerData', STACKING_CONTRACT, getters.getContractAddress, [getUserAddress()]);
      let staked = shiftedBy(data[0], '18', 1);
      commit('SET_STAKER_DATA', staked);
    } catch (e) {
      console.log(e)
    }
  },
  async getClaimableAmount ({ commit, getters }) {
    try {
      let data = await fetchContractData('getClaimableAmount', STACKING_CONTRACT, getters.getContractAddress, [getUserAddress()]);
      data = shiftedBy(data, '18', 1);
      commit('SET_CLAIMABLE_AMOUNT', data);

    } catch (e) {
      console.log(e)
    }
  },
  async stake ({ getters }, amount: string) {
    try {
      const bigAmount = shiftedBy(amount, `-18`);
      // example get fee
      let fee = await getFee('stake', STACKING_CONTRACT, getters.getContractAddress, [bigAmount])
      fee = shiftedBy(fee, '18', 1)
      await BasicContract.stake(getters.getContractAddress, STACKING_CONTRACT, bigAmount)
    } catch (e) {
      console.log(e)
    }
  },
  async unstake ({ getters }, amount: string) {
    try {
      const bigAmount = shiftedBy(amount, `-18`);
      // example get fee
      let fee = await getFee('unstake', STACKING_CONTRACT, getters.getContractAddress, [bigAmount])
      fee = shiftedBy(fee, '18', 1)
      await BasicContract.unstake(getters.getContractAddress, STACKING_CONTRACT, bigAmount)
    } catch (e) {
      console.log(e)
    }
  },
  async claim ({ getters }) {
    try {
      await BasicContract.claim(getters.getContractAddress, STACKING_CONTRACT)
    } catch (e) {
      console.log(e)
    }
  },
  async pastEvents ({ getters, commit }) {
    try {
      const data = await BasicContract.pastEvents(getters.getContractAddress, STACKING_CONTRACT, getUserAddress())
      const eventNames = ['Staked', 'Unstaked', 'Claimed']
      const prepared = data.result.filter((el: any) => {
        return eventNames.includes(el.event)  && el.returnValues.sender.toLowerCase() === getUserAddress().toLowerCase()
      })
        .map((el: any) => {
          let symbol = el.event === 'Claimed' ? 'REW' : 'CST';
          return {
            event: el.event,
            blockNumber: el.blockNumber,
            amount: `${shiftedBy(el.returnValues.amount, '18')} ${symbol}`,
            timestamp: el.returnValues.time
          }
      })
      commit('SET_EVENTS', prepared)
    } catch (e) {
      console.log(e)
    }
  }
}

export default actions
