/*
Project : Cryptotrades
FileName :  api.ts
Author : LinkWell
File Created : 25/12/2021
CopyRights : LinkWell
Purpose : This is the file which contain all api constants used in the application 
*/
export const API = {
    opensea_asset_url: "https://opensea.io/assets/",
    opensea_collection_info_url: "https://opensea.io/collection/",
    opensea_collections_url: "https://api.opensea.io/api/v1/collections?",
    opensea_nft_url: "https://api.opensea.io/api/v1/assets?",
    opensea_collection_url: "https://api.opensea.io/api/v1/collection/",
    server_url: "http://raritycollection222.us-3.evennode.com",
    discord_server: "https://discord.gg/nftrarity",
    cookie_expire: 60,  //1h
    user_login: "/user/login",
    user_opt_verify: "/user/opt_verify",
    user_register:"/user/register",
    user_forgot:"/user/forgot",  
    collection_image: "/images/collection/",
    collection_image_upload: '/media/',
    collection_add: '/collection/add',
    collection_list: '/collection/list',
    collection_json: '/collection/json',
    collection_rarity: '/collection/rarity',
    collection_traits: '/collection/traits'
}