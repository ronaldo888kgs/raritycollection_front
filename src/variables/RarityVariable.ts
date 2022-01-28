import { makeVar } from '@apollo/client'

export const sortingDirectionItemsVar = makeVar<'asc' | 'desc'>('desc')

// eslint-disable-next-line no-shadow
export enum Filter {
  all = '',
  button = '',
  price = '',
  rarity_min = '',
  rarity_max = '',
  traits = ''
}
export const filtersVar = makeVar<Filter>(Filter.all)
export const filtersButtonVar = makeVar<Filter>(Filter.button)
export const filtersPriceVar = makeVar<Filter>(Filter.price)
export const filtersRarityMinVar = makeVar<Filter>(Filter.rarity_min)
export const filtersRarityMaxVar = makeVar<Filter>(Filter.rarity_max)
export const filtersTraitsVar = makeVar<Filter>(Filter.traits)
