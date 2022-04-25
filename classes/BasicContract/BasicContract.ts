import {
  createInst,
  fetchContractData, getFee, getUserAddress
} from '~/utils/web3'
import {error, IResponse, output} from "~/utils";

export default class BasicContract {
  [key: string]: any;
  address: string
  abi: any

  constructor ({ address, abi }: { address: string; abi: any; }) {
    this.address = address
    this.abi = abi
  }

  fetchContractData (method: string, params?: Array<any>): Promise<any> {
    return fetchContractData(method, this.abi, this.address, params)
  }

  getFee (method: string, params?: Array<any>): Promise<any> {
    return getFee(method, this.abi, this.address, params)
  }

  static async stake (tokenAddress: string, abi: any, amount: string): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress);
      const r = await inst.stake(amount);
      return output(r)
    } catch (e) {
      console.log(e)
      return error(500, 'stake error', e)
    }
  }

  static async unstake (tokenAddress: string, abi: any, amount: string): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress);
      const r = await inst.unstake(amount);
      return output(r)
    } catch (e) {
      console.log(e)
      return error(500, 'stake error', e)
    }
  }

  static async claim (tokenAddress: string, abi: any): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress);
      const r = await inst.claim();
      return output(r)
    } catch (e) {
      console.log(e)
      return error(500, 'claim error', e)
    }
  }

  static async pastEvents (tokenAddress: string, abi: any, userAddress: string): Promise<IResponse> {
    try {
      const inst = await createInst(abi, tokenAddress);
      const data = await inst.getPastEvents("allEvents", {
        fromBlock: 0,
        toBlock: 'latest',
      })
      return output(data);
    } catch (e) {
      console.log(e)
      return error(500, 'stake error', e)
    }
  }
}
