import { useReactiveVar } from '@apollo/client'
import { Button, Input } from 'antd'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { FooterCardLoading } from '../components/main/FooterCardLoading'
import EmptyState from '../components/shared/EmptyState'
import { CardTemplate } from '../components/shared/template/cards/CardTemplate'
import {
  filtersVar, filtersPriceVar, filtersRarityMinVar, filtersRarityMaxVar, filtersButtonVar, filtersTraitsVar,
  sortingDirectionItemsVar
} from '../variables/RarityVariable'
import { paginationLimit } from '../config'
import { CollectionStats, NFTItem } from '../types/CollectionTypes'
import { colors, colorsV2 } from '../styles/variables'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { collectionService } from '../services/CollectionService'
import { imgLH3 } from '../services/UtilService'
import notFound from '../assets/notfound.svg'
import { Skeleton, Spin, Empty } from 'antd'
import { RarityModal } from '../components/shared/RarityModal'
import * as FaIcons from 'react-icons/fa';
import Sidebar from '../components/main/Sidebar'

export default function RarityPage() {
  const { address, slug } = useParams<{address: string, slug: string }>()
  let sortingDirection = useReactiveVar(sortingDirectionItemsVar)
  const filter = useReactiveVar(filtersVar)
  const filterPrice = useReactiveVar(filtersPriceVar)
  const filterRarityMin = useReactiveVar(filtersRarityMinVar)
  const filterRarityMax = useReactiveVar(filtersRarityMaxVar)
  const filterButton = useReactiveVar(filtersButtonVar)
  const filterTraits = useReactiveVar(filtersTraitsVar)

  const [items, setItems] = useState<NFTItem[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const[sidebar, setSidebar] = useState(false);
  const[isVisible, setVisible] = useState(false)
  const[selectedItem, setSelectedItem] = useState<NFTItem>()
  const [collectionInfor, setCollectionInfor] = useState<CollectionStats>()

  const sidebarChange = () => {
    setSidebar(!sidebar);
  }

  const onClick = (item:NFTItem) => {
    setSelectedItem(item)
    setVisible(true);
  }

  const loader = (
    <S.CardsContainer>
      {[...Array(paginationLimit)].map(() => (
        <CardTemplate key={`loading-${Math.random()}`} loading>
          <FooterCardLoading loading />
        </CardTemplate>
      ))}
    </S.CardsContainer>
  )
  
  const setFiltered = useCallback(
    (items: NFTItem[]) => {
      const filteredItems: NFTItem[] = items
        setItems(filteredItems)
    },[]
  )

  const addItems = useCallback(
    (nftItems: NFTItem[]) => {
      setItems(items.concat(nftItems))
    },
    [items, setFiltered]
  )

  useEffect(() => {
    const getCollectionInfor = async () => {
      const result = await collectionService().getCollectionInfor(slug);
      setCollectionInfor(result)
    }

    getCollectionInfor();
  },[slug])

  useEffect(() => {
    const getInitialCollections = async () => {
      setLoading(true)
      setHasMore(true)
      const collectionItems = await collectionService().getItems(
        address,
        slug,
        filter,
        filterButton,
        filterPrice,
        filterRarityMin,
        filterRarityMax,
        filterTraits,
        paginationLimit,
        sortingDirection
      )

      setFiltered(collectionItems)
      setOffset(collectionItems.length)
      setLoading(false)

      if (collectionItems.length < paginationLimit) {
        setHasMore(false)
      }
    }

    getInitialCollections()
  }, [paginationLimit, filter, setFiltered, sortingDirection, filterButton, filterPrice, filterRarityMin, filterRarityMax, filterTraits])

  const loadMore = useCallback(
    async (customOffset?: number, customPaginationLimit?: number) => {
      const nftItems = await collectionService().getItems(     
        address,     
        slug,
        filter,
        filterButton,
        filterPrice,
        filterRarityMin,
        filterRarityMax,
        filterTraits,
        customPaginationLimit || paginationLimit,
        sortingDirection,
        customOffset || offset
      )

      if (nftItems) {
        const newOffset = offset + nftItems.length
        addItems(nftItems)
        setOffset(newOffset)
      }
    },
    [addItems, filter, offset, paginationLimit, sortingDirection, filterButton, filterPrice, filterRarityMin, filterRarityMax, filterTraits]
  )

  useEffect(() => {
    if (incomplete) {
      loadMore(0, 100)
      setIncomplete(false)
    }
  }, [incomplete, loadMore])

  const[metadataImage, setMetadataImage] = useState('');
  const[collectionName, setCollectionName] = useState('');
  const[description, setDescription] = useState('')
  const[collectionAddress, setCollectionAddress] = useState('');
  const[discord, setDiscord] = useState('');
  const[telegram, setTelegram] = useState('');

  useEffect(()=>{
    if(items.length == 0) return;
    setMetadataImage(items[0].collection.image)
    setCollectionName(items[0].collection.name);
    setDescription(items[0].collection.description)
    setCollectionAddress(items[0].collection.address)
    setDiscord(items[0].collection.discord);
    setTelegram(items[0].collection.telegram);

    if(metadataImage == null || metadataImage == ''){
      setSelectedImage(notFound)
    } else {
      setSelectedImage(metadataImage)
    }
  },[items])
  const [selectedImage, setSelectedImage] = useState(metadataImage || notFound)
  const onImageError = () => {
    setSelectedImage(notFound)
  }
  const onHandlerOfLink = (e, link) => {
    if(link == 'null' || link == undefined) return;
    window.open(link, '_blank');
  }
  const onClose = (e) => {
    e.preventDefault();
    document.getElementById('header_div').style.display = 'none';
  }
  const onShow = (e) => {
    e.preventDefault();
    document.getElementById('header_div').style.display = 'inline-block';
  }
  return (
    <>
    <S.ShowButton onClick={(e)=>onShow(e)}>View Collection</S.ShowButton> 
    <S.HeaderDiv id="header_div">
      <S.HeaderMain>
        <S.Close onClick={(e)=>onClose(e)}>
          <FaIcons.FaWindowClose />
        </S.Close>
        <S.BoxImage className={metadataImage === '' ? 'bg-fail' : ''}>
          <S.Img
            src={imgLH3(selectedImage, 300)}
            className={selectedImage === notFound ? 'img-fail' : ''}
            onError={onImageError}
            alt={collectionName}
            hidden={!!loading}
            loading='lazy'
          />
          <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
        </S.BoxImage>
        <S.HeaderContent>
          <S.Title>{collectionName}</S.Title>
          {/* <S.Desc>{description}</S.Desc> */}
          <S.Address>{collectionAddress}</S.Address>
          <S.LinkDiv>
            <S.Link onClick={(e)=>onHandlerOfLink(e, discord)}>
              <FaIcons.FaDiscord />
            </S.Link>
            <S.Link onClick={(e)=>onHandlerOfLink(e, telegram)}>
              <FaIcons.FaTelegram />
            </S.Link>
          </S.LinkDiv>
        </S.HeaderContent>
      </S.HeaderMain>
      <S.StatsContent>
        <S.HeaderState>
          {collectionInfor? collectionInfor.count : 0}
          <span>items</span>
        </S.HeaderState>
        <S.HeaderState>
          {collectionInfor? collectionInfor.floor : 0}
          <span>Floor</span>  
        </S.HeaderState>
        <S.HeaderState>
          {collectionInfor? collectionInfor.volume : 0}
          <span>Volume</span>  
        </S.HeaderState>
      </S.StatsContent>
    </S.HeaderDiv>
    <Sidebar sidebarChange = {sidebarChange} handleFilter = {filtersVar} handleFilterButton = {filtersButtonVar} handleFilterPrice = {filtersPriceVar} handleFilterRarityMin = {filtersRarityMinVar} handleFilterRarityMax = {filtersRarityMaxVar} handleFilterTraits = {filtersTraitsVar} traits={collectionInfor?.traits} count={collectionInfor?.count} />
    <DefaultPageTemplate bgGray sidebar={sidebar}>
      <S.Content>
      {!loading && !items.length && <EmptyState />}
      <InfiniteScroll next={loadMore} hasMore={hasMore} loader={loader} dataLength={items.length}>
        <S.CardsContainer>
          {items.map(item => {
            return (
              <CardTemplate
                key={`${item.id}` + Math.random()}
                image={String(item?.image)}
                banner={String(item?.banner)}
                address={String(item?.collection.address)}
                token_id={String(item?.token_id)}
                name={String(item?.name)}
                description = {String(item?.description)}
                isPresale = {item?.isPresale}
                presaleDate = {item?.presaleDate}
                rarity={String(item?.rarity)}
                ranking={String(item?.ranking)}
                price={item.price}
                onClick={()=>onClick(item)}>
              </CardTemplate>
            )
          })}
        </S.CardsContainer>
      </InfiniteScroll>
      <RarityModal
        visible={isVisible}
        item={selectedItem}
        count={collectionInfor?.count}
        onCancel={() => setVisible(false)}
      />
      </S.Content>
    </DefaultPageTemplate>
    </>
  )
}

export const S = {
  Close: styled.div `
    color: ${props=>props.theme.gray['2']};
    font-size: 20px;
    position: fixed;
    float: right;
    right: 5px;
    
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      display: none;
    }
  `,
  LinkDiv: styled.div`
    max-width: 100%;
    margin-top: 30px;
    display: inline-block;
  `,
  Link: styled.a`
    background: ${props=>props.theme.black};
    padding: 5px 10px 0 10px;
    border-radius: 5px;
    align-items: center;
    margin: 0 10px;
    font-weight: 600;
    font-size: 16px;
  `,
  Content: styled.div `
    margin-top: 70px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: 294px;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-top: 170px;
    }
  `,
  BoxImage: styled.div`
    display: inline-block;
    width: 100%;
    min-width: 170px;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 10px 10px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-left: 40px;
      width: 40%;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-left: 20px;
      width: 40%;
    }
    @media (min-width: ${props => props.theme.viewport.desktopl}) {
      width: 15%;
    }

    .ant-skeleton {
      height: 150px;
      display: flex;
      align-items: center;
    }
  `,
  Img: styled.img`
    max-width: 150px;
    min-width: 150px;
    max-height: 150px;
    width: auto;
    height: auto;
    -webkit-user-drag: none;
    border-radius: 50%;
    border: 2px solid ${props=>props.theme.black};
  `,
  ShowButton: styled.div `
    position: fixed;
    top: 90px;
    width: 50%;
    margin-left: 30%;
    z-index: 99;
    height: 40px;
    border-radius: 22px;
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    padding-top: 5px;
    background: ${props=>props.theme.black};
    color: ${props=>props.theme.white};
  `,
  HeaderDiv: styled.div `
    position: fixed;
    margin-top: 80px;
    width: 100%;
    z-index: 100;
    display: inline-block;
    background: ${props=>props.theme.gray['1']};
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      display: block;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-top: 84px;
      display: inline-flex;
    }
  `,
  HeaderMain: styled.div `
    display: block;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 100%;
      display: inline-flex;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      width: 60%;
    }
  `,
  HeaderContent: styled.div `
    width: 100%;
    text-align: center;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 60%;
      text-align: left;
      margin: 1rem 1rem 1rem 2rem;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      width: 60%;
    }
    display: inline-block;
  `,
  Title: styled.div `
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: ${props=>props.theme.black};

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 22px;
    }
  `,
  Desc: styled.div `
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 10px;
    color: ${props=>props.theme.black};

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 16px;
    }
  `,  
  Address: styled.div `
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 10px;
    color: ${props=>props.theme.black};

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 16px;
    }
  `,  
  StatsContent: styled.div `
    margin: 1rem 2.5rem 16rem 2.5rem;
    width: 80%;
    justify-content: space-evenly;

    @media (min-width: ${props => props.theme.viewport.mobile}) {
      width: 90%;
      margin: 1rem 2.5rem 20rem 2.7rem;
    }

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin: 0 1rem 1rem 1rem;
      display: flex;
      width: 96%;
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin: 1rem;
      width: 40%;
      display: inline-flex;
    }
  `,
  HeaderState: styled.div `
    margin: 18px 5px 0 5px;
    max-width: 90px;
    width: 30%;
    display: inline-block;
    height: 70px;
    background: ${props=>props.theme.black};
    border: 2px solid ${props=>props.theme.gray['2']};
    border-radius: 20px;
    padding: 5px 0;
    text-align: center;
    color: ${colors.blue1};
    font-weight: 700;
    font-size: 20px;

    span {
      width: 100%;
      font-weight: 500;
      display: flow-root;
      font-size: 16px;
      color: ${props=>props.theme.gray['1']};
    }
    @media (min-width: ${props => props.theme.viewport.mobile}) {
      max-width: 100px;
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding: 10px 0;
      max-width: 120px;
      height: 90px;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin: 18px 0.5rem 0 0.5rem;
      padding: 20px 0;
      height: 100px;
    }
  `,
  SliderDiv: styled.div `
    margin: 1.3rem 0 1.3rem 0;
    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      margin: 2rem 0 2rem 0;
    }
  `,
  Main: styled.div `
    color: ${props=>props.theme.gray['4']};
    font-size: 40px;
    font-weight: 700;
  `,
  Sub: styled.div `
    color: ${props=>props.theme.gray['4']};
    font-size: 20px;
    font-weight: 400;
    line-height: 2rem;
  `,
  LatestDiv: styled.div `
    padding-top: 3rem;
    font-size: 30px;
    font-weight: 500;
    color: ${props => props.theme.black};
  `,
  FeaturedDiv: styled.div `
    margin-top: 4rem;
    font-size: 30px;
    font-weight: 500;
    color: ${props => props.theme.black};
  `,
  SortLink: styled.div`
    color: ${props => props.theme.black};
    margin: 0px;
    background: ${props => props.theme.white};
    width: 100%;
    border: 0px;
    font-size: 13px;
    line-height: 1.5rem;
    &:hover,
    &:active,
    &:focus {
      background: ${props => props.theme.white};
    }
  `,
  SortUl: styled.ul `
    background: ${props => props.theme.white};
    width: 110px;
    margin-left: -10px;
    margin-top: 10px;
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-left: 5px;
    }
  `,
  SortLi: styled.li `
  
  `,
  SortDiv: styled.div `
    width: 140px;
    text-align: right;
  `,
  BannerDiv: styled.div `
    margin: 1.3rem 0 1.3rem 0;
    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      margin: 2rem 0 2rem 0;
    }
  `,
  Button: styled(Button)`
    background: ${props=>props.theme.gray['0']};
    color: ${props=>props.theme.black};
    border: 1px solid ${props=>props.theme.gray['1']};
    border-radius: 10px !important;
    padding: 5px 15px 7px 15px !important;
    cursor: pointer !important;
    height: 40px;
    margin: 10px;
    font-weight: 400;

    &:hover,
    &:active,
    &:focus {
      background-color: rgb(34, 106, 237);
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: 0px;
      margin-right: 0px !important;
    }
  `,
  Input: styled(Input)`
    padding: 0.375rem 0.75rem;
    fontSize: 0.875rem;
    lineHeight: 1.5;
    color: ${(props)=>props.theme.gray['4']};
    background: ${(props)=>props.theme.gray['0']};
    backgroundClip: padding-box;
    border: 1px solid ${(props)=>props.theme.gray['2']};
    borderRadius: 0.25rem;
    marginBottom: 10px;
    width: 100%;
    display: inline-block;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: calc(100% - 230px);
    }
  `,
  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 6vw;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2vw;

    > div:last-of-type {
      margin-bottom: 2vw;
    }

    @media (min-width: ${props => props.theme.viewport.mobile}) {
      gap: 10vw;
      padding: 0 1rem;
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding: 0;
      gap: 2vw;
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {    
      gap: 3vw;  
      grid-template-columns: repeat(4, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }

    @media (min-width: ${props => props.theme.viewport.desktopl}) {
      gap: 2vw;
      grid-template-columns: repeat(5, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }

    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      gap: 2vw;
      grid-template-columns: repeat(6, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }
  `,
  LoadMoreButton: styled(Button)`
    width: 100%;
    max-width: 304px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    color: ${colorsV2.white};
    background-image: linear-gradient(90deg, #fe8367 5.73%, #fe7688 100%);
    margin: 0 auto;

    &:active,
    &:focus,
    &:hover {
      opacity: 0.75;
      color: ${colorsV2.white};
      background-image: linear-gradient(90deg, #fe8367 5.73%, #fe7688 100%);
    }
  `
}
