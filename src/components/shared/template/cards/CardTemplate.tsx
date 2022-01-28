import { Skeleton, Spin, Empty } from 'antd'
import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input, Button } from 'antd'
import notFound from '../../../../assets/notfound.svg'
import { fonts, viewport, colors } from '../../../../styles/variables'
import { imgLH3 } from '../../../../services/UtilService'
import * as FaIcons from 'react-icons/fa';
import { API } from '../../../../constants/api'

export type CardTemplateProps = {
  onClick?: () => void
  address?: string
  rarity?: string
  ranking?: string
  token_id?: string
  banner?: string
  image?:string
  name?: string
  isPresale?: boolean
  description?: string
  loading?: boolean
  presaleDate?: Date
  price?: number
  children?: ReactNode
}

export function CardTemplate({
  address,
  rarity,
  ranking,
  token_id,
  banner,
  image,
  name,
  description,
  isPresale,
  loading,
  presaleDate,
  children,
  price,
  onClick
}: CardTemplateProps) {
  const metadataImage = image
  const [selectedImage, setSelectedImage] = useState(metadataImage || notFound)
  const onImageError = () => {
    setSelectedImage(notFound)
  }

  const handleClick = () => {
    onClick()
  }
  return (
    <>
      <S.Card to="#" onClick={handleClick}>
        <S.BoxImage className={metadataImage === '' ? 'bg-fail' : ''}>
          <S.Img
            src={imgLH3(selectedImage, 400)}
            className={selectedImage === notFound ? 'img-fail' : ''}
            onError={onImageError}
            alt={name || 'not found'}
            hidden={!!loading}
            loading='lazy'
          />
          <S.Detail>
            <div>{rarity}</div>
            <div>#{ranking}</div>
          </S.Detail>
          {price > 0 &&
            <S.Price>Buy Now <span>({price} ETH)</span></S.Price>
          }
          <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
        </S.BoxImage>
        <S.BoxInfo>
          <S.Wrapper>          
            <S.Content>
              <Skeleton className='full-width-skeleton' loading={loading} active paragraph={{ rows: 0 }}>
                <S.Input value={name} readOnly />
              </Skeleton>
            </S.Content>
            {/* <S.Content>
              <S.LinkButton onClick={(e)=>onClick(e, API.opensea_asset_url + address + '/' + token_id)}>
                View on Opensea
              </S.LinkButton>
            </S.Content> */}
          </S.Wrapper>
        </S.BoxInfo>
      </S.Card>

    </>
  )
}

const S = {
  Card: styled(Link)`

    border: 1px solid ${props=>props.theme.gray['2']};
    box-sizing: border-box;
    border-radius: 8px;
    justify-content: center;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);
    background: ${props=>props.theme.gray['1']};
    height: 260px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      height: 230px;
    }

    .hidden {
      display: none;
    }

    &.small {
      height: 230px;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow ease-in 250ms;
    }

    @media (max-width: ${viewport.md}) {
      margin: 0 auto;
    }
  `,
  Detail: styled.div `
    position: absolute;
    justify-content: space-between;
    display: flex;
    min-width: 180px;
    margin-top: -130px;

    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      min-width: 160px;
    }

    div {
      background: ${props=>props.theme.gray['1']};
      border: 1px solid ${props=>props.theme.gray['3']};
      color:  ${props=>props.theme.gray['4']};
      font-size: 16px;
      font-weight: 600;
      padding: 0px 10px;
      border-radius: 5px;
    }
  `,
  LinkDiv: styled.div`
    margin-top: 10px;
    max-width: 100%;
    display: inline-block;
  `,
  Link: styled.span`
    align-items: center;
    margin: 10px;
    font-weight: 600;
    font-size: 20px;
  `,
  BoxImage: styled.div`
    width: 100%;
    min-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 0 10px;
    height: 200px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      height: 180px;
    }
    @media (min-width: ${props => props.theme.viewport.desktopl}) {
      min-width: 150px;
    }

    .ant-skeleton {
      height: 200px;
      display: flex;
      align-items: center;
      @media (min-width: ${props => props.theme.viewport.tablet}) {
        height: 150px;
      }
    }
  `,
  Img: styled.img`
    max-width: 100%;
    min-width: 120px;
    max-height: 180px;
    width: auto;
    height: auto;
    -webkit-user-drag: none;
    border-radius: 4px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      min-width: 180px;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      min-width: 155px;
    }
  `,
  NFTVideo: styled.video`
    max-width: 100%;
    max-height: 180px;
  `,
  NFTAudio: styled.audio`
    max-width: 100%;
    max-height: 180px;
  `,
  BoxInfo: styled.div`
    border-top: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;

    .full-width-skeleton .ant-skeleton-content .ant-skeleton-title {
      width: 100% !important;
    }
    .ant-skeleton {
      height: 26px;
      display: flex;
      align-items: center;
    }
  `,
  Label: styled.label`
    max-width: 180px;
    color: ${props=>props.theme.gray['3']};
    font-size: 16px;
    font-weight: 400;
    line-height: 15px;
    margin-top: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Input: styled(Input) `
    max-width: 180px;
    color: ${props=>props.theme.gray['3']};
    font-size: 16px;
    font-weight: 400;
    line-height: 15px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: transparent;
    border: 0;
    text-align: center;
  `,
  Name: styled.span`
    font-family: ${fonts.nunito};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: ${props=>props.theme.gray['4']};

    margin-top: 4px;
    height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Informative: styled.span`
    font-family: ${fonts.nunito};
    font-style: normal;
    font-weight: 400;
    font-size: 12px !important;
    line-height: 18px;
    color: ${colors.gray1};
  `,
  Content: styled.div`
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    span {
      font-family: ${fonts.nunito};
      font-style: normal;
      font-weight: 400;
    }
    .hidden-collection {
      display: none;
    }

    .invisible {
      display: none;
      margin-top: 16px;
    }
  `,

  Price: styled.span`
    position: absolute;
    margin-top: 120px;
    background: rgb(53, 167, 107);
    color: white;
    font-weight: 600;
    padding 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 20px;

    span {
      font-size: 13px;
    }
  `,
  Symbol: styled.small`
    font-size: 8px;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `
}
