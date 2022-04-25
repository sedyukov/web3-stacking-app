import BasicContract from '~/classes/BasicContract/BasicContract'
import { STACKING_ERC20 } from '~/utils/abis/stacking'
import { createInst, fetchContractData, getUserAddress } from '~/utils/web3'
import { error, IResponse, output } from '~/utils'

export default class Token extends BasicContract {
  decimals = '0'
  symbol: string | undefined
  balance: string | undefined

  constructor ({ address, abi }:{ address: string, abi: any}) {
    super({
      address,
      abi
    })
  }

  static async approve (tokenAddress: string, contractAddress: string, abi: any, amount: string): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress)
      // const r = await inst.approve(recipient, shiftedBy('1000000000', 18)) // use this if you want to make only one big approve
      const r = await inst.approve(contractAddress, amount)
      return output(r)
    } catch (e) {
      console.log(e)
      return error(500, 'approve error', e)
    }
  }

  static async mint (tokenAddress: string, abi: any, amount: string): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress);
      const r = await inst.mint(getUserAddress(), amount);
      return output(r)
    } catch (e) {
      console.log(e)
      return error(500, 'mint error', e)
    }
  }
}
