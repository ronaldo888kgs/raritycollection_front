import axios from 'axios'
import { Collection, NFTItem, CollectionStats } from '../types/CollectionTypes'
import { API } from '../constants/api';
import { code } from '../messages'
import { notifyError, notifyWarning } from './NotificationService'
import Cookies from 'universal-cookie';

interface CollectionService {
  getCollections(
    paginationLimit: number,
    offset?: number,
    featured?: string,
    upcoming?: string
  ): Promise<Collection[]>,
  getCollectionInfor(
    slug: string
  ): Promise<CollectionStats>,
  getItems(
    address: string,
    slug: string,
    token_id: string,
    filterButton: string,
    filterPrice: string,
    filterRarityMin: string,
    filterRarityMax: string,
    filterTraits: string,
    paginationLimit: number,
    orderDirection: 'asc' | 'desc',
    offset?: number
  ): Promise<NFTItem[]>,
  imageUpload(
    data: any
  ): Promise<boolean>,
  addCollection(
    data: any
  ): Promise<boolean>
}

export const collectionService = (): CollectionService => {
  return {
    async getCollections(
      paginationLimit,
      offset = 0,
      featured = '',
      upcoming = ''
    ) {
        
      let collections: Collection[] = [];
      
      let data = {featured: featured, upcoming: upcoming, paginationLimit: paginationLimit, offset: offset};
      await axios.post(API.server_url + API.collection_list, data)
        .then(response => {
            if(response.status === 200){
              let data = response.data;
              if(data['status']){
                let w_items = data['data'];
                for(let i = 0; i < w_items.length; i ++) {
                  let w_item: Collection = {id:'', name:'', slug:'', opensea:'', discord:'', telegram:'', website:'', description:'', blockchain:'', address:'', mint_date:'', reveal:'', image:'', upcoming:'', featured:'', discord_tag:'', ticket:''};
                  
                  w_item.id = w_items[i]['_id'];
                  w_item.name = w_items[i]['name'];
                  w_item.slug = w_items[i]['slug'];
                  w_item.opensea = w_items[i]['opensea'];
                  w_item.discord = w_items[i]['discord'];
                  w_item.telegram = w_items[i]['telegram'];
                  w_item.website = w_items[i]['website'];
                  w_item.description = w_items[i]['description'];
                  w_item.blockchain = w_items[i]['blockchain'];
                  w_item.address = w_items[i]['address'];
                  w_item.mint_date = w_items[i]['mint_date'];
                  w_item.reveal = w_items[i]['reveal_date'];
                  w_item.image = w_items[i]['image'];
                  w_item.featured = w_items[i]['featured'];
                  w_item.upcoming = w_items[i]['upcoming'];
                  w_item.discord_tag = w_items[i]['discord_tag'];
                  w_item.ticket = w_items[i]['ticket'];
                  
                  collections.push(w_item)
                }
              } 
              notifyWarning(data['message'])
            }
        })
        .catch(error => {
            notifyError(code[5001], error)
        })
        
      return collections;
    },
    async getCollectionInfor(
      slug
    ) {
      let collectionInfo: CollectionStats = {}
      let w_result = await axios.get(API.opensea_collection_url + slug)
      let w_data: any = w_result.data;
      let collection: any = w_data.collection;

      collectionInfo.count = collection['stats']['count'];
      collectionInfo.floor = Math.round(collection['stats']['floor_price'] * 1000) / 1000;
      collectionInfo.volume = Math.round(collection['stats']['total_volume'] * 1000) / 1000;

      let traits: any = [];
      let data = {slug: slug};
      
      await axios.post(API.server_url + API.collection_traits, data)
        .then(response => {
            if(response.status === 200){
                let data = response.data;
                if(data['status']){
                  traits = data['data'];
                }
            }
        })
        .catch(error => {
            notifyError(code[5001], error)
        })

      
      let count = collectionInfo.count;
      const traitsData = [];
      for(let i = 0; i < traits.length; i++) {
        let w_traitData = {};
        w_traitData['title'] = traits[i]['key'];
        w_traitData['show'] = false;

        let counts = traits[i]['counts'];
        let data = [];
        for(let j = 0; j < counts.length; j++) {
          let w_data = {};
          w_data['title'] = counts[j]['value'];
          w_data['value'] = counts[j]['count'] + '(' + Math.round(counts[j]['count'] * 100 / count * 100) / 100 + '%)';
          w_data['active'] = false;

          data.push(w_data);
        }
        w_traitData['data'] = data;
        w_traitData['value'] = counts.length;

        traitsData.push(w_traitData);
      }
      
      collectionInfo.traits = traitsData;

      return collectionInfo;
    },
    async getItems(
      address,
      slug,
      token_id,
      filterButton,
      filterPrice,
      filterRarityMin,
      filterRarityMax,
      filterTraits,
      paginationLimit,
      orderDirection: 'asc' | 'desc',
      offset = 0
    ) {
      try {            
        let w_ret = [];
        let data = {token_id, address: address, slug: slug, paginationLimit: paginationLimit, offset: offset, orderDirection: orderDirection, filter_button: filterButton, filter_price: filterPrice, rarity_min: filterRarityMin, rarity_max: filterRarityMax, filter_traits: filterTraits};
        
        await axios.post(API.server_url + API.collection_rarity, data)
          .then(response => {
              if(response.status === 200){
                  let data = response.data;
                  if(data['status']){
                    w_ret = data['data'];
                  }
              }
          })
          .catch(error => {
              notifyError(code[5001], error)
          })
        
        let id_txt = '';
        for(let i = 0; i < w_ret.length; i++) {
          id_txt = id_txt + '&token_ids=' + w_ret[i]['token_id'];
        }
        
        if(id_txt == '') return [];

        let w_result = await axios.get(API.opensea_nft_url + 'asset_contract_address=' + address + id_txt)

        let w_data: any = w_result.data;
        let w_items: any = w_data.assets;
        let items: NFTItem[] = [];
        for(let i = 0; i < w_items.length; i ++) {
            let w_item: NFTItem = {id:0,token_id:'',name:'',description:'',token_metadata:'',banner:'',image:'',isPresale:false,presaleDate:null,traits:[],rarity:0,ranking:0,price:0,collection:{name:'',description:'',image:'',discord:'',telegram:''}};
            
            w_item.id = w_items[i]['id'];
            w_item.token_id = w_items[i]['token_id'];
            w_item.name = w_items[i]['name'] ? w_items[i]['name'] : w_items[i]['collection']['name'];
            w_item.description = w_items[i]['description'];
            w_item.token_metadata = w_items[i]['token_metadata'];
            w_item.banner = w_items[i]['collection']['banner_image_url'];
            w_item.image = w_items[i]['image_thumbnail_url']
            w_item.isPresale = w_items[i]['is_presale'];
            w_item.presaleDate = w_items[i]['collection']['created_date'];
            w_item.traits = w_items[i]['traits']
            w_item.collection.name = w_items[i]['collection']['name'];
            w_item.collection.description = w_items[i]['collection']['description'];
            w_item.collection.address = w_items[i]['asset_contract']['address'];
            w_item.collection.image = w_items[i]['collection']['image_url'];
            w_item.collection.discord = w_items[i]['collection']['discord_url'];
            w_item.collection.telegram = w_items[i]['collection']['telegram_url'];
            
            if(w_items[i]['sell_orders'] != null){
              w_item.price = w_items[i]['sell_orders'][0]['current_price'] / 1000000000000000000;
            }

            for(let j = 0; j < w_ret.length; j++){
              if(w_ret[j]['token_id'] == w_items[i]['token_id']){
                w_item.rarity = Math.round(w_ret[j]['rarity'] * 100) / 100;
                w_item.ranking = w_ret[j]['ranking'] ? w_ret[j]['ranking'] : (i + 1);
              }
            }
            
            if(filterButton.includes('BUY_NOW') || filterPrice != ''){
              if(w_item.price > 0){
                items.push(w_item)
              }
            } else {
              items.push(w_item)
            }
                    
        }

        items.sort((a, b) => a.ranking - b.ranking);

        return items;
      } catch(e){
        return []
      }    
    },
    async imageUpload(
      data
    ) {
      let w_return = false;
      let url = '';
      url = API.server_url + API.collection_image_upload;
      await axios.post(url, data)
      .then(response => {
          if(response.status === 200){
              let data = response.data;
              w_return = data.status;
          }
      })
      .catch(error => {
          notifyError(code[5001], error)
      })
  
      return w_return;
    },
    async addCollection(
      data
    ) {
      let w_return = false;
      const cookies = new Cookies()
      const headers = {
          headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer '+ cookies.get('token')
          }
      };
      await axios.post(API.server_url + API.collection_add, data, headers)
      .then(response => {
        console.log(response)
          if(response.status === 200){
              let data = response.data;
              if(data.status){
                  w_return = data.status;
              }
              notifyWarning(data.message)
          }
      })
      .catch(error => {
          notifyError(code[5001], error)
      })
  
      return w_return;
    }
  }
}
