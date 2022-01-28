import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';
import { Input, Button } from 'antd'
import Item from './Item';
import { colors, colorsV2 } from '../../styles/variables'
import { relativeTimeRounding } from 'moment';

const SidebarLink = styled(Link)`
  display: flex;
  color: #444;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: ${(props)=>props.theme.gray['1']};
    cursor: pointer;
  }
`;
const ListingButton = styled.button`
  color: ${(props)=>props.color};
  border: 1px solid red;
  border-radius: 5px;
  align-items: center;
  list-style: none;
  height: 35px;
  width: 40%;
  margin-left: 20px;
  margin-top: 10px;
  text-decoration: none;
  background: ${(props)=>props.background == 'active' ? colors.red3 : props.theme.gray['0']};
  &:hover,
  &:active {
    background: ${colors.red2};
    cursor: pointer;
    color: white;
  }
`;

const RankingButton = styled.button`
  color: ${(props)=>props.color};
  border: 1px solid red;
  border-radius: 5px;
  align-items: center;
  list-style: none;
  height: 65px;
  width: 40%;
  margin-left: 20px;
  margin-top: 10px;
  text-decoration: none;
  background: ${(props)=>props.background == 'active' ? colors.red3 : props.theme.gray['0']};
  &:hover {
    background: ${colors.red2};
    cursor: pointer;
    color: white;
  }
`;
const SidebarLabel = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${(props)=>props.theme.gray['4']}
`;

const SearchDiv = styled.div`
  background-color: ${(props)=>props.theme.gray['0']};
  padding-top: 10px;

  span {
    padding: 0 20px;
    color: ${(props)=>props.theme.gray['4']};
  }
`;

const ButtonDiv = styled.div `
  padding-bottom: 10px;
  line-height: 30px;
  background-color: ${(props)=>props.theme.gray['0']};
`;

const SubMenu = ({ item, traits, handleButton, handlePrice, handleRarityMin, handleRarityMax, handleTraits, count }) => {

  const [buy_now, setBuyNow] = useState(false);
  const [auction, setAuction] = useState(false);
  const [new_nft, setNewNft] = useState(false)
  const [has_offer, setHasOffer] = useState(false);
  const [price_min, setPriceMin] = useState('');
  const [price_max, setPriceMax] = useState('');
  const [rarity_min, setRarityMin] = useState('');
  const [rarity_max, setRarityMax] = useState('');
  const [trait_normal, setTraitNormal] = useState(true);
  const [trait_count, setTraitCount] = useState(true);
  const [rarity_opt, setRarityOpt] = useState('');
  const [subnav, setSubnav] = useState(false);
  const [filterButton, setFilterButton] = useState('');
  const [filterPrice, setFilterPrice] = useState('')
  const [filterTraits, setFilterTraits] = useState({type:'',value:''})
  const [searchTraits, setSearchTraits] = useState('')
  const [traitsFilterData, setTraitsFilterData] = useState({data: {}});

  const showSubnav = () => setSubnav(!subnav);

  useEffect(() => {
    let filter_button = '';
    let toggle_cnt = 0;

    if(buy_now){
      filter_button += '&search[toggles][0]=BUY_NOW';
      toggle_cnt++;
    }
    if(auction){      
      filter_button += '&search[toggles][' + toggle_cnt + ']=ON_AUCTION';
      toggle_cnt++;
    }
    if(new_nft){
      filter_button += '&search[toggles][' + toggle_cnt + ']=IS_NEW';
      toggle_cnt++;
    }
    if(has_offer){
      filter_button += '&search[toggles][' + toggle_cnt + ']=HAS_OFFERS';
      toggle_cnt++;
    }

    setFilterButton(filter_button);
  },[buy_now,auction,new_nft,has_offer])

  useEffect(() => {
    handleButton(filterButton);
  },[filterButton])

  useEffect(() => {
    let filter_price = '';
    if(price_min != '')
      filter_price += '&search[priceFilter][min]=' + price_min;

    if(price_max != '')
      filter_price += '&search[priceFilter][max]=' + price_max;

    setFilterPrice(filter_price);
  },[price_min,price_max])

  useEffect(() => {
    if(filterTraits.type == '') return;
    let isExistType = false;
    let obj = traitsFilterData.data;
    for(let key in obj) {      
      if(key == filterTraits.type) {
        if(obj[key].includes(filterTraits.value)) {
          obj[key].splice(obj[key].indexOf(filterTraits.value), 1)
        } else {
          obj[key].push(filterTraits.value);
        }        
        isExistType = true;
        break;
      }      
    }
    if(!isExistType){
      obj[filterTraits.type] = [];
      obj[filterTraits.type].push(filterTraits.value);
    }

    setTraitsFilterData({data: obj})
  },[filterTraits])

  useEffect(()=>{
    if(Object.keys(traitsFilterData).length ===0) return;
    let filterTxt = '';
    let cnt = 0;
    let data = traitsFilterData.data;
    for(let key in data) {
      let w_obj = data[key]
      if(w_obj.length > 0) {
        filterTxt += '&search[stringTraits][' + cnt + '][name]=' + key;
        for(let i = 0; i < w_obj.length; i++){
          filterTxt += '&search[stringTraits][' + cnt + '][values][' + i + ']=' + w_obj[i];
        }
        cnt++;
      }      
    }
    setSearchTraits(filterTxt)
  },[traitsFilterData])

  useEffect(()=>{
    handleTraits(searchTraits)
  },[searchTraits])

  const handlePriceKeyPress = (e) => {
    if(e.key === 'Enter'){
      handlePrice(filterPrice);
    }    
  }

  const handleRarityMinKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleRarityMin(rarity_min)
    }    
  }

  const handleRarityMaxKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleRarityMax(rarity_max)
    }    
  }

  const subButtonClicked = (e, v) => {
    if(v == 'buy-now')
      setBuyNow(!buy_now);
    else if(v == 'auction')
      setAuction(!auction);
    else if(v == 'new-nft')
      setNewNft(!new_nft);
    else if(v == 'has-offer')
      setHasOffer(!has_offer);
    else if(v == 'trait-normal')
      setTraitNormal(!trait_normal);
    else if(v == 'trait-count')
      setTraitCount(!trait_count);
  }

  return (
    <>
      <SidebarLink to="#" onClick={showSubnav}>
        <div>
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {subnav
            ? <IoIcons.IoIosArrowUp style={{color: `${props=>props.theme.gray['4']}`}} />
            : <IoIcons.IoIosArrowDown style={{color: `${props=>props.theme.gray['4']}`}} />
          }
        </div>
      </SidebarLink>
      {subnav &&
        <div>
          {(item.title==='LISTINGS')&&
            <ButtonDiv>
              <ListingButton onClick={(e)=>subButtonClicked(e, 'buy-now')} background={buy_now ? 'active' : ''} color={buy_now ? 'white' : 'red'} >Buy Now</ListingButton>
              <ListingButton onClick={(e)=>subButtonClicked(e, 'auction')} background={auction ? 'active' : ''} color={auction ? 'white' : 'red'}  >On Auction</ListingButton>
              <ListingButton onClick={(e)=>subButtonClicked(e, 'new-nft')} background={new_nft ? 'active' : ''} color={new_nft ? 'white' : 'red'} >New</ListingButton>
              <ListingButton onClick={(e)=>subButtonClicked(e, 'has-offer')} background={has_offer ? 'active' : ''} color={has_offer ? 'white' : 'red'}  >Has Offers</ListingButton>
            </ButtonDiv>
          }
          {(item.title==='PRICE')&&
            <SearchDiv>
              <div style={{margin: '0 0 10px 20px'}}>
                <S.ShortInput id="min_price" onChange = {(e) => (/([0-9]*[.])?[0-9]+/.test(e.target.value) || e.target.value == '') && setPriceMin(e.target.value)} onKeyPress={(e) => handlePriceKeyPress(e)} value={price_min} type='text' placeholder='Min' />
                <span>to</span>
                <S.ShortInput id="max_price" onChange = {(e) => (/([0-9]*[.])?[0-9]+/.test(e.target.value) || e.target.value == '') && setPriceMax(e.target.value)} onKeyPress={(e) => handlePriceKeyPress(e)} value={price_max} type='text' placeholder='Max'/>
              </div>
            </SearchDiv>
          }
          {(item.title==='RARITY')&&
            <SearchDiv>
              <div style={{margin: '0 0 10px 20px'}}>
                <S.ShortInput onChange = {(e) => (/([0-9]*[.])?[0-9]+/.test(e.target.value) || e.target.value == '') && setRarityMin(e.target.value)} onKeyPress={(e) => handleRarityMinKeyPress(e)} value={rarity_min} type='text' placeholder='Min' />
                <span>to</span>
                <S.ShortInput onChange = {(e) => (/([0-9]*[.])?[0-9]+/.test(e.target.value) || e.target.value == '') && setRarityMax(e.target.value)} onKeyPress={(e) => handleRarityMaxKeyPress(e)} value={rarity_max} type='text' placeholder='Max' />
              </div>
            </SearchDiv>
          }
          {(item.title==='RANKING OPTIONS')&&
            <ButtonDiv>
              <RankingButton onClick={(e)=>subButtonClicked(e, 'trait-normal')} background={trait_normal ? 'active' : ''} color={trait_normal ? 'white' : 'red'} >Trait Nomalization</RankingButton>
              <RankingButton onClick={(e)=>subButtonClicked(e, 'trait-count')} background={trait_count ? 'active' : ''} color={trait_count ? 'white' : 'red'} >Trait Count Weight</RankingButton>
            </ButtonDiv>
          }
          {(item.title==='EXPERIMENTAL')&&
            <SearchDiv>
              <div style={{margin: '0 0 10px 20px'}}>
                <S.LongInput onChange = {(e) => setRarityOpt(e.target.value)} value={rarity_opt} type='text' placeholder='Visual Rarity Optimization' />
              </div>
            </SearchDiv>
           }
           {(item.title==='TRAITS')&&
            traits?.map((item, index) => {              
              return (
                <Item key={index} item={item} handle={setFilterTraits} />             
              )
            })
          }        
        </div>
      }
    </>
  );
};

export default SubMenu;

export const S = {
  ShortInput: styled(Input) `
    background: ${(props)=>props.theme.gray['0']};
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(props)=>props.theme.gray['4']};
    background-clip: padding-box;
    border: 1px solid ${(props)=>props.theme.gray['2']};
    border-radius: 0.5rem;
    margin-bottom: 10px;
    width: 100px !important;
  `,
  LongInput: styled(Input) `
    background: ${(props)=>props.theme.gray['0']};
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(props)=>props.theme.gray['4']};
    background-clip: padding-box;
    border: 1px solid ${(props)=>props.theme.gray['2']};
    border-radius: 0.5rem;
    margin-bottom: 10px;
    width: 250px !important;
  `
}
