import { ActionTree } from 'vuex'
import { ITokensMap, ITokenState } from '~/store/token/state'
import Token from '~/classes/Token'
import {fetchContractData, getFee, getUserAddress} from '~/utils/web3'
import { shiftedBy } from '~/utils'
import { STACKING_ERC20 } from '~/utils/abis/stacking'
import { ITokenGetter } from '~/store/token/getters'
import {REWARD_ERC20} from "~/utils/abis/reward";

const actions: ActionTree<ITokenState, ITokenState> = {
  createTokensByAddresses ({ commit }, { addresses }: { addresses: Array<string>, abi: any}) {
    commit('SET_TOKENS', addresses)
    const abis = [STACKING_ERC20, REWARD_ERC20];
    const tokens = addresses.map((address, i) => new Token({ address, abi: abis[i] }))
    const map: ITokensMap = {}
    tokens.forEach((inst) => {
      map[inst.address] = inst
    })
    commit('SET_TOKENS_MAP', map)
  },
  async fetchCommonDataToken ({ getters, dispatch }:{ getters: ITokenGetter, dispatch: any }) {
    const { getTokensKeys: tokenKeys } = getters
    await Promise.all(tokenKeys.map((address: string) => dispatch('fetchCommonDataTokenByAddress', { address })))
  },
  async fetchCommonDataTokenByAddress ({ getters, commit }, { address }: { address: string}) {
    const { getTokensMap: tokensMap } = getters
    const token = tokensMap[address]
    const [
      symbol,
      decimals
    ] = await Promise.all([
      token.fetchContractData('symbol'),
      token.fetchContractData('decimals')
    ])
    commit('SET_TOKEN_PROPS', {
      address,
      value: {
        symbol,
        decimals
      }
    })
  },
  async fetchUserDataToken ({ getters, dispatch }:{ getters: ITokenGetter, dispatch: any }) {
    const { getTokensKeys: tokenKeys } = getters
    await Promise.all(tokenKeys.map((address: string) => dispatch('fetchUserDataTokenByAddress', { address })))
  },
  async fetchUserDataTokenByAddress ({ getters, commit }:{ getters: ITokenGetter, commit: any }, { address }: { address: string }) {
    const { getTokensMap: tokensMap } = getters
    const token = tokensMap[address]
    let balance = await token.fetchContractData('balanceOf', [getUserAddress()])
    balance = shiftedBy(balance, token.decimals, 1)
    commit('SET_TOKEN_PROPS', {
      address,
      value: {
        balance
      }
    })
  },
  async mintStaking ({ getters },  amount: string) {
    const tokenAddress = process.env.stacking || '';
    const decimals = getters.getDecimalsByAddress(tokenAddress);
    const bigAmount = shiftedBy(amount, `-${decimals}`);
    await Token.mint(tokenAddress, STACKING_ERC20, bigAmount)
  },
  async approve ({ getters }:{ getters: ITokenGetter }, amount: string) {
    try {
      const tokenAddress = getters.getTokens[0];
      const contractAddress = process.env.stackingContract || '';
      const bigAmount = shiftedBy(amount, `-18`);
      // example get fee
      // let fee = await getFee('approve', STACKING_ERC20, tokenAddress, [getUserAddress(), bigAmount])
      // fee = shiftedBy(fee, '18', 1)
      // console.log(fee)
      await Token.approve(tokenAddress, contractAddress, STACKING_ERC20, bigAmount)
    } catch (e) {
      console.log(e)
    }
  },
  async getAllowance ({ commit, getters }) {
    try {
      const contractAddress = process.env.stackingContract || '';
      const data = await Promise.all([
        fetchContractData('allowance', STACKING_ERC20, getters.getTokens[0], [getUserAddress(), contractAddress]),
        fetchContractData('allowance', REWARD_ERC20, getters.getTokens[1], [getUserAddress(), contractAddress])
      ])
      const shiftedData = data.map((el, i) => shiftedBy(el, getters.getDecimalsByAddress(getters.getTokens[i], 1)))
      commit('SET_ALLOWANCE', shiftedData);
    } catch (e) {
      console.log(e)
    }
  }
}

export default actions
