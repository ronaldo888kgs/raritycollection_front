import { useReactiveVar } from '@apollo/client'
import { Button, Input } from 'antd'
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { FooterCardLoading } from '../components/main/FooterCardLoading'
import EmptyState from '../components/shared/EmptyState'
import { CollectionCardTemplate } from '../components/shared/template/cards/CollectionCardTemplate'
import { FeaturedCardTemplate } from '../components/shared/template/cards/FeaturedCardTemplate'
import { paginationLimit } from '../config'
import { Collection } from '../types/CollectionTypes'
import { colors, colorsV2 } from '../styles/variables'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { collectionService } from '../services/CollectionService'
import CarouselSlider from '../components/main/CarouselSlider/CarouselSlider'

export default function MainPage() {

  const [collections, setCollections] = useState<Collection[]>([])
  const [latest, setLatest] = useState<Collection[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loader = (
    <S.CardsContainer>
      {[...Array(paginationLimit)].map(() => (
        <FeaturedCardTemplate key={`loading-${Math.random()}`} loading>
          <FooterCardLoading loading />
        </FeaturedCardTemplate>
      ))}
    </S.CardsContainer>
  )
  
  const setFilteredCollections = useCallback(
    (items: Collection[]) => {
      const filteredItems: Collection[] = items
        setCollections(filteredItems)
    },[]
  )

  const addItems = useCallback(
    (nftItems: Collection[]) => {
      setCollections(collections.concat(nftItems))
    },
    [collections, setFilteredCollections]
  )
  useEffect(() => {
    const getInitialCollections = async () => {
      const latestItems = await collectionService().getCollections(
        paginationLimit,
        0,
        '',
        'no'
      )
      setLatest(latestItems)
    }
    getInitialCollections()
  }, [])

  useEffect(() => {
    const getInitialCollections = async () => {
      setLoading(true)
      setHasMore(true)
      const collectionItems = await collectionService().getCollections(
        paginationLimit,
        0,
        'yes',
        'no'
      )

      setFilteredCollections(collectionItems)
      setOffset(collectionItems.length)
      setLoading(false)

      if (collectionItems.length < paginationLimit) {
        setHasMore(false)
      }
    }
    getInitialCollections()
  }, [paginationLimit, setFilteredCollections])

  const loadMore = useCallback(
    async (customOffset?: number, customPaginationLimit?: number) => {
      const nftItems = await collectionService().getCollections(          
        customPaginationLimit || paginationLimit,
        customOffset || offset,
        'yes',
        'no'
      )

      if (nftItems) {
        const newOffset = offset + nftItems.length
        addItems(nftItems)
        setOffset(newOffset)
      }
    },
    [addItems,  offset, paginationLimit]
  )

  useEffect(() => {
    if (incomplete) {
      loadMore(0, 100)
      setIncomplete(false)
    }
  }, [incomplete, loadMore])

  return (
    <>    
    <DefaultPageTemplate bgGray> 
      <S.SliderDiv>
        <CarouselSlider />
      </S.SliderDiv>
      <S.HeaderDiv>
        <S.Sub>
          View the rarity rankings of your favorite NFT collection in a matter of seconds after reveal!
        </S.Sub>
      </S.HeaderDiv>
      <S.LatestDiv>🔥 Latest Added Collections <Link to='/latest' style={{float: 'right', fontSize: '20px', marginTop: '15px'}}>ViewMore</Link></S.LatestDiv>
      {!loading && !latest.length && <EmptyState />}
      <InfiniteScroll next={null} hasMore={null} loader={null} dataLength={latest.length}>
        <S.CardsContainer>
          {latest.map(item => {
            return (
              <CollectionCardTemplate
                key={`${item.id}` + Math.random()}
                image={String(item?.image)}
                name={String(item?.name)}
                description = {String(item?.description)}
                discord_url = {String(item?.discord)}
                external_link = {String(item?.website)}
                telegram_url = {String(item?.telegram)}
                url={`/viewcollection/${item.address}/${item.slug}`}>
              </CollectionCardTemplate>
            )
          })}
        </S.CardsContainer>
      </InfiniteScroll>
      <S.FeaturedDiv>🎉 Featured Collections </S.FeaturedDiv>
      {!loading && !collections.length && <EmptyState />}
      <InfiniteScroll next={loadMore} hasMore={hasMore} loader={loader} dataLength={collections.length}>
        <S.CardsContainer>
          {collections.map(item => {
            return (
              <FeaturedCardTemplate
                key={`${item.id}` + Math.random()}
                image={String(item?.image)}
                name={String(item?.name)}
                description = {String(item?.description)}
                discord_url = {String(item?.discord)}
                external_link = {String(item?.website)}
                telegram_url = {String(item?.telegram)}
                url={`/viewcollection/${item.address}/${item.slug}`}>
              </FeaturedCardTemplate>
            )
          })}
        </S.CardsContainer>
      </InfiniteScroll>
    </DefaultPageTemplate>
    </>
  )
}

export const S = {
  SliderDiv: styled.div `
    margin: 1.3rem 0 1.3rem 0;
    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      margin: 2rem 0 2rem 0;
    }
  `,
  HeaderDiv: styled.div `
    text-align: center;
    margin: 0 0 5rem 0;
    width: 100%;
    line-height: 4rem;
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
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme.black};
    
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      font-size: 30px;
    }
  `,
  FeaturedDiv: styled.div `
    margin-top: 4rem;
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme.black};
    
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      font-size: 30px;
    }
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
  Title: styled.div `
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    color: ${(props:any)=>props.theme.black}
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
    grid-template-columns: repeat(2, 1fr);
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
      gap: 1.5vw;  
      grid-template-columns: repeat(5, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }

    @media (min-width: ${props => props.theme.viewport.desktopl}) {    
      gap: 2.5vw;  
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
