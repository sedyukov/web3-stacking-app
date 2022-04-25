import BigNumber from 'bignumber.js'

export interface IResponse {
  ok: boolean,
  result?: any,
  code?: number,
  msg?: string,
  data?: any
}

export const output = (res?: any): IResponse => ({
  ok: true,
  result: res
})

export const error = (code?: number, msg?: string, data?: any): IResponse => ({
  ok: false,
  code,
  msg,
  data
})

export const shiftedBy = (value: string, decimals: string, mode?: number | 0): string => {
  const decimalsInt = mode === 0 ? parseInt(decimals) : -parseInt(decimals)
  return new BigNumber(value).shiftedBy(decimalsInt).toString()
}
