export interface Collection {
    id?: string
    name: string
    slug?: string
    opensea?: string
    discord?: string
    telegram?: string
    website?:string
    description?: string
    blockchain?: string
    address?: string
    mint_date?: string
    reveal?: string
    image?: string
    upcoming?: string
    featured?: string
    discord_tag?: string
    ticket?: string
  }

  export interface CollectionStats {
    count?: number
    floor?: number
    volume?: number
    traits?: Object
  }

  export interface Traits {
    trait_type: string
    value: string
    display_type: string
    max_value: number
    trait_count: number
    order: number
  }

  export interface NFTItem {
    id: number
    token_id: string
    name: string
    description?: string
    token_metadata: string
    banner?: string
    image?:string
    isPresale?: boolean
    presaleDate?: Date
    traits: Traits[]
    rarity: number
    ranking: number
    price?: number
    collection: Collection
  }