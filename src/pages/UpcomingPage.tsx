import React, { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { FooterCardLoading } from '../components/main/FooterCardLoading'
import EmptyState from '../components/shared/EmptyState'
import { UpcomingRowTemplate } from '../components/shared/template/cards/UpcomingRowTemplate'
import { paginationLimit } from '../config'
import { Collection } from '../types/CollectionTypes'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { collectionService } from '../services/CollectionService'

export default function UpcomingPage() {

  const [collections, setCollections] = useState<Collection[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loader = (
    <S.CardsContainer>
      {[...Array(paginationLimit)].map(() => (
        <UpcomingRowTemplate key={`loading-${Math.random()}`} loading>
          <FooterCardLoading loading />
        </UpcomingRowTemplate>
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
      setLoading(true)
      setHasMore(true)
      const collectionItems = await collectionService().getCollections(
        paginationLimit,
        0,
        '',
        'yes'
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
      console.log(customOffset)
      const nftItems = await collectionService().getCollections(          
        customPaginationLimit || paginationLimit,
        customOffset || offset,
        '',
        'yes'
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
      <S.LatestDiv>🔥 Upcoming Collections </S.LatestDiv>
      {!loading && !collections.length && <EmptyState />}
      <InfiniteScroll next={loadMore} hasMore={hasMore} loader={loader} dataLength={collections.length}>
        <S.CardsContainer>
          {collections.map(item => {
            return (
              <UpcomingRowTemplate
                key={`${item.id}` + Math.random()}
                image={String(item?.image)}
                name={String(item?.name)}
                slug={String(item?.slug)}
                address = {String(item?.address)}
                description = {String(item?.description)}
                discord_url = {String(item?.discord)}
                external_link = {String(item?.website)}
                telegram_url = {String(item?.telegram)}
                mint_date = {String(item?.mint_date)}
                reveal = {String(item?.reveal)}
                featured = {String(item?.featured)}
                blockchain = {String(item?.blockchain)}>
              </UpcomingRowTemplate>
            )
          })}
        </S.CardsContainer>
      </InfiniteScroll>
    </DefaultPageTemplate>
    </>
  )
}

export const S = {  
  LatestDiv: styled.div `
    padding-top: 3rem;
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme.black};

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      font-size: 30px;
    }
  `,  
  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1vw;
    justify-content: flex-start;
    align-items: flex-start;

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin: 2vw 5rem 0 5rem;
    }

    > div:last-of-type {
      margin-bottom: 2vw;
    }
  `
}
