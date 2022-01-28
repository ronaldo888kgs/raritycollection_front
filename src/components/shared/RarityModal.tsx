import { Button, Modal, Input, Select, Slider, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NFTItem } from '../../types/CollectionTypes'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { fonts, viewport, colors } from '../../styles/variables'
import { ItemImage } from '../shared/ItemImage'
import { API } from '../../constants/api'
import { TraitsTemplate } from './template/cards/TraitsTemplate'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface RarityModalProps {
  visible: boolean
  item: NFTItem
  count?: number
  onCancel: () => void
}

export const RarityModal = ({ visible, item, count, onCancel }: RarityModalProps) => {

  const handleCancel = () => {
    onCancel()
  }

  const buyHandler = () => {
    window.open(API.opensea_asset_url + item.collection.address + '/' + item.token_id, '_blank');
  }

  return (
    <S.Modal visible={visible} onCancel={handleCancel} footer={null} destroyOnClose>
      <S.Content>
        <S.SubContent>
          <ItemImage
              image={item?.image || ''}
              name={item?.name}
              animation={null}
              animationType={null}          
          />
          <S.Detail>
            <S.TokenName>{item?.name}</S.TokenName>
            <S.Tokenid value={item?.token_id} />
          </S.Detail>
          {item?.price? 
            <S.BuyButton onClick = {buyHandler}>Buy Now</S.BuyButton>
          :
            <S.OpenseaButton onClick = {buyHandler}>View on OpenSea</S.OpenseaButton>
          }          
        </S.SubContent>
        <S.SubContent>
          <S.ScoreTitle>
            Total Rarity Score
          </S.ScoreTitle>
          <S.SubContent>
            <S.Score>            
              {item?.rarity}
            </S.Score>
          </S.SubContent>
        </S.SubContent>
        <S.SubContent>
          <InfiniteScroll next={null} hasMore={null} loader={null} dataLength={item?.traits.length}>
            <S.CardsContainer>
              <S.Header>
                <div>
                  TYPE
                </div>
                <div>
                  VALUE
                </div>
                <div>
                  SCORE
                </div>
              </S.Header>
              {item?.traits.map(trait => {
                return (
                  <TraitsTemplate
                    key={`${Math.random()}`}
                    trait_type={String(trait.trait_type)}
                    value={String(trait.value)}
                    score={trait.trait_count}
                    count={count}
                    >
                  </TraitsTemplate>
                )
              })}
            </S.CardsContainer>
          </InfiniteScroll>
        </S.SubContent>
      </S.Content>
    </S.Modal>
  )
}

export const S = {
  Modal: styled(Modal)`
    width: 100% !important;
    height: 650px !important;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    .ant-modal-body {
      padding: 10px;
    }

    .ant-modal-content {
      background: ${props=>props.theme.white};
      border-radius: 8px;
    }

    .ant-modal-close-x {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      color: ${props=>props.theme.gray['3']};
    }

    .ant-modal-footer {
      display: none;
    }

    @media (min-width: ${props=>props.theme.viewport.tablet}) {
      width: 500px !important;
      margin-top: 3rem;
    }
  `,  
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  `,
  SubContent: styled.div`
    border: 1px solid ${props=>props.theme.gray['1']};
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    text-align: -webkit-center;    
  `,
  Detail: styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  `,
  TokenName: styled.span`
    font-size: 20px;
    font-weight: 500;
    color: ${props=>props.theme.gray['4']};
  `,
  Tokenid: styled(Input)`
    margin-top: 5px;
    font-size: 13px;
    font-weight: 500;
    color: ${props=>props.theme.gray['3']};
    max-width: 150px;
    background: transparent;
    border: 0;
    text-align: right;

    &:hover {
      border: 0;
    }

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      max-width: 250px;
    }
  `,
  BuyButton: styled(Button) `
    margin-top: 10px;
    width: 100%;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    color: white;
    background: #04bf2c;
    border-radius: 8px;

    &:hover,
    &:focus,
    &:active {
      background: #26dc4d;
      color: white;
    }
  `,
  OpenseaButton: styled(Button) `
    margin-top: 10px;
    width: 100%;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    color: white;
    background: #2081e2;
    border-radius: 8px;

    &:hover,
    &:focus,
    &:active {
      background: #56a4f3;
      color: white;
    }
  `,
  ScoreTitle: styled.span`
    font-size: 20px;
    font-weight: 500;
    color: ${props=>props.theme.gray['4']};
  `,
  Score: styled.span`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.blue3};
  `,
  Header: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;
    background: ${props=>props.theme.gray['0']};
    border: 1px solid #c8ced3;
    font-weight: 500;

    div {
      height: 40px;
      border-left: 1px solid #c8ced3;
      text-align: center !important;      
    }

    div: nth-child(1) {
      min-width: 88px;
      width: 40%;
      border: 0;
      display: grid;
      align-items: center;
    }

    div: nth-child(2) {
      min-width: 70px;
      width: 30%;
      display: grid;
      align-items: center;
    }

    div: nth-child(3) {
      min-width: 60px;
      width: 30%;
      display: grid;
      align-items: center;
    }

    // div: nth-child(4) {
    //   min-width: 80px;
    //   width: 25%;

    //   @media (min-width: ${props => props.theme.viewport.tablet}) {
    //     display: grid;
    //     align-items: center;
    //   }
    // }
  `,
  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1px;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: 200px;
    overflow-y: scroll;
    color: ${props=>props.theme.gray['3']};

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      max-height: 250px;
    }
  `
}
