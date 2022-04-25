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

export const getTime = (unix_timestamp: string): string => {
  // @ts-ignore
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

export const getDate = (unix_timestamp: string, locale: string): string => {
  // @ts-ignore
  const date = new Date(unix_timestamp * 1000);
  return date.toLocaleString(locale, { day: 'numeric', month: 'long' });
}
