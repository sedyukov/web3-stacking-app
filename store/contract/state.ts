export interface ITokenState {
  stakerData: string,
  claimableAmount: string,
  contractAddress: string,
  events: any[],
  isModal: boolean,
}

export const initState = (): { stakerData: string, claimableAmount: string, contractAddress: string, events: any[], isModal: boolean} => ({
  stakerData: '',
  claimableAmount: '',
  contractAddress: process.env.stackingContract || '',
  events: [],
  isModal: false,
})

export default initState
