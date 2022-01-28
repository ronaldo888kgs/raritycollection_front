export interface ChainConfig {
  id: number
  name: string
  infuraAddress: string
  bscNodeAddress: string  
}

export const infuraKey = process.env.REACT_APP_INFURA_KEY

export const allowedChains = [1]
export const paginationLimit = 18;

export const chainsConfig: ChainConfig[] = [
  {
    id: 1,
    name: 'mainnet',
    infuraAddress: `https://mainnet.infura.io/v3/${infuraKey}`,
    bscNodeAddress: `https://bsc-dataseed.binance.org/`
  }
]

/**
 * @deprecated Deprecated in favor of chainConfigV2
 */
export const getChainConfigById = (id: number): ChainConfig => chainsConfig.find(chain => chain.id === id) || chainsConfig[0]
