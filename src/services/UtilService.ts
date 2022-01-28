import { allowedChains } from '../config'
import {API} from '../constants/api'

export function formatShortAddressWallet(addressFormat: string): string {
  return `${addressFormat.slice(0, 6)}`
}

export const imgLH3 = (url: string, size: number): string => {
  if(url == undefined) return;
  return url.includes('https://lh3') ? url.split('=s')[0] + '=s' + size + '-c' : url.includes('/static') ? url : API.server_url + API.collection_image + url
}

export function isAllowedChain(chainId: number): boolean {
  return allowedChains.includes(chainId)
}

