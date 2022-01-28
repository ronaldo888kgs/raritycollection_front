import { Skeleton, Spin, Empty } from 'antd'
import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from 'antd'
import notFound from '../../../../assets/notfound.svg'
import { fonts, viewport, colors } from '../../../../styles/variables'
import { imgLH3 } from '../../../../services/UtilService'
import * as FaIcons from 'react-icons/fa';

export type FeaturedCardTemplateProps = {
  banner?: string
  image?:string
  name?: string
  isPresale?: boolean
  description?: string
  url?: string
  className?: string
  loading?: boolean
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  discord_url?: string
  external_link?: string
  telegram_url?: string
}

export function FeaturedCardTemplate({
  banner,
  image,
  name,
  description,
  isPresale,
  loading,
  url,
  className,
  size,
  discord_url,
  external_link,
  telegram_url,
  children
}: FeaturedCardTemplateProps) {
  const metadataImage = image
  const [selectedImage, setSelectedImage] = useState(metadataImage || notFound)
  const onImageError = () => {
    setSelectedImage(notFound)
  }

  const onClick = (e, link) => {
    if(link == 'null' || link == undefined) return;
    window.open(link, '_blank');
  }
  return (
    <S.Card className={`${className} ${size || ''}`} to={`${url || '#'}`}>
      <S.BoxImage className={metadataImage === '' ? 'bg-fail' : ''}>
        <S.Img
          src={imgLH3(selectedImage, 400)}
          className={selectedImage === notFound ? 'img-fail' : ''}
          onError={onImageError}
          alt={name || 'not found'}
          hidden={!!loading}
          loading='lazy'
        />
        <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
      </S.BoxImage>
      <S.BoxInfo>
        <S.Wrapper>
          <S.Content>
            <S.LinkDiv>
              <S.Link onClick={(e)=>onClick(e, discord_url)}>
                <FaIcons.FaDiscord />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
              <S.Link onClick={(e)=>onClick(e, external_link)}>
                <FaIcons.FaInternetExplorer />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
              <S.Link onClick={(e)=>onClick(e, telegram_url)}>
                <FaIcons.FaTelegram />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
            </S.LinkDiv>
          </S.Content>
          <S.Content>
            <Skeleton className='full-width-skeleton' loading={loading} active paragraph={{ rows: 0 }}>
              <S.Input value={name} readOnly />
            </Skeleton>
          </S.Content>
          {description && (
            <S.Content>
              <Skeleton className='full-width-skeleton' loading={!!loading} active paragraph={{ rows: 0 }}>
                {/* <S.Name>{description}</S.Name> */}
              </Skeleton>
            </S.Content>
          )}
        </S.Wrapper>
      </S.BoxInfo>
    </S.Card>
  )
}

const S = {
  Card: styled(Link)`

    border: 1px solid ${props=>props.theme.gray['2']};
    box-sizing: border-box;
    border-radius: 8px;
    justify-content: center;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);
    background: ${props=>props.theme.white};
    height: 180px;

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

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin: 0 1rem;
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin: 0;
    }
  `,
  LinkDiv: styled.div`
    max-width: 100%;
    display: inline-block;
  `,
  Link: styled.span`
    align-items: center;
    margin: 0 10px;
    font-weight: 600;
    font-size: 16px;
  `,
  BoxImage: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 0 10px;
    height: 130px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      height: 180px;
    }

    .ant-skeleton {
      height: 120px;
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
      min-width: 180px;
      min-width: 150px;
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
    padding-top: 0px;
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
    color: ${colors.gray2};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  `,
  Symbol: styled.small`
    font-size: 8px;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `
}
