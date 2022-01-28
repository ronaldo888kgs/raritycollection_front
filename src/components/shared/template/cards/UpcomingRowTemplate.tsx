import { Skeleton, Spin, Empty } from 'antd'
import React, { ReactNode, useState, useEffect } from 'react'
import styled from 'styled-components'
import notFound from '../../../../assets/notfound.svg'
import { fonts, viewport, colors } from '../../../../styles/variables'
import { imgLH3 } from '../../../../services/UtilService'
import * as FaIcons from 'react-icons/fa';
import { API } from '../../../../constants/api'
import {status} from '../../../../messages'

export type UpcomingRowTemplateProps = {
  image?:string
  name?: string
  slug?: string
  address?: string
  isPresale?: boolean
  description?: string
  className?: string
  loading?: boolean
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  discord_url?: string
  external_link?: string
  telegram_url?: string
  mint_date?: string
  reveal?: string
  featured?: string
  blockchain?: string
}

export function UpcomingRowTemplate({
  image,
  name,
  slug,
  address,
  description,
  isPresale,
  loading,
  className,
  size,
  discord_url,
  external_link,
  telegram_url,
  mint_date,
  reveal,
  featured,
  blockchain,
  children
}: UpcomingRowTemplateProps) {
  const [state, setState] = useState<string>('')
  const [stateTxt, setStateTxt] = useState<string>('')
  const [date, setDate] = useState<string>()
  const metadataImage = image
  const [selectedImage, setSelectedImage] = useState(metadataImage || notFound)
  const onImageError = () => {
    setSelectedImage(notFound)
  }

  useEffect(()=>{
    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate();
    setDate(year + '-' + (month < 10? '0' : '') + month + '-' + day);
  
    if(mint_date == year + '-' + (month < 10? '0' : '') + month + '-' + day) {
      setState(status[1])
      setStateTxt(status[1])
    } else if (reveal == year + '-' + (month < 10? '0' : '') + month + '-' + day) {
      setState(status[3])
      setStateTxt(status[3])
    } else {
      let mint = null;
      let mint_str = '';
      if(mint_date != ''){
        mint = new Date(mint_date);
        mint_str = mint.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      }

      let rev = null;
      let rev_str = '';
      if(reveal != ''){
        rev = new Date(reveal);
        rev_str = rev.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      }

      if(mint != null && rev != null){
        if(mint > today && rev > today){
          if(mint > rev) {
            setState(status[4])
            setStateTxt(status[6] + rev_str)
          } else {
            setState(status[2])
            setStateTxt(status[5] + mint_str)
          }
        } else if(mint > today) {
          setState(status[2])
          setStateTxt(status[5] + mint_str)
        } else if(rev > today) {
          setState(status[4])
          setStateTxt(status[6] + rev_str)
        }
      } else if(mint != null) {
        if(mint > today) {
          setState(status[2])
          setStateTxt(status[5] + mint_str)
        }
      } else if(rev != null) {
        if(rev > today) {
          setState(status[4])
          setStateTxt(status[6] + rev_str)
        }
      }
    }
  },[])

  const onClick = (e, link) => {
    if(link == 'null' || link == undefined) return;
    window.open(link, '_blank');
  }
  return (
    <S.Card className={`${className} ${size || ''}`}>
      <S.TopDiv>        
        <S.Content>
          <div>
            <S.LinkDiv>
              <S.Link onClick={(e)=>onClick(e, discord_url)}>
                <FaIcons.FaDiscord />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
              <S.Link onClick={(e)=>onClick(e, telegram_url)}>
                <FaIcons.FaTelegram />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
              <S.Link onClick={(e)=>onClick(e, external_link)}>
                <FaIcons.FaInternetExplorer />
                {/* <span>Uniswap V2</span> */}
              </S.Link>
            </S.LinkDiv>
            <S.MoreDiv>
              {/* <a href='#'>Read More</a> */}
              {mint_date == date && 
                <a href={API.opensea_collection_info_url + slug} target='_blank'>Mint one now</a>
              }
            </S.MoreDiv>
          </div>
          <div>
            {featured=='yes'&&
              <S.Featured>Featured</S.Featured>
            }
            <S.Chain>{blockchain}</S.Chain>
            {state != ''&&
              <S.Stats>{state}</S.Stats>
            }
          </div>
        </S.Content>        
      </S.TopDiv>
      <S.BottomDiv>
        <S.BottomContent>
          <div>{name}</div>
          {stateTxt != ''&&
            <div>{stateTxt}</div>
          }
        </S.BottomContent>
      </S.BottomDiv>
      <S.BoxImage className={metadataImage === '' ? 'bg-fail' : ''}>
        <S.Img
          src={imgLH3(selectedImage, 120)}
          className={selectedImage === notFound ? 'img-fail' : ''}
          onError={onImageError}
          alt={name || 'not found'}
          hidden={!!loading}
          loading='lazy'
        />
        <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
      </S.BoxImage>
    </S.Card>
  )
}

const S = {
  Featured: styled.span `
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    background: #924df9;
    font-size: 13px;
    font-weight: 400;

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 15px;
    }
  `,
  Chain: styled.span `
    padding: 5px 10px;
    color: ${props=>props.theme.gray['0']};
    border-radius: 5px;
    background: ${props=>props.theme.gray['3']};
    margin-left: 5px;
    font-size: 13px;
    font-weight: 400;

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 15px;
    }
  `,
  Stats: styled.span `
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    background: #2db34d;
    margin-left: 5px;
    font-size: 13px;
    font-weight: 400;

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 15px;
    }
  `,
  LinkDiv: styled.div`
    display: inline-block;
    vertical-align: sub;
    width: 100% !important;
    padding-left: 100px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding-left: 0;
      width: 30% !important;
    }
  `,
  MoreDiv: styled.div `
    width: 100% !important;
    display: inline-block;
    text-align: left !important;
    padding-left: 100px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding-left: 0;
      width: 70% !important;
    }
  `,
  Link: styled.span`
    align-items: center;
    margin-right: 15px;
    font-weight: 600;
    font-size: 17px;
    color: ${colors.blue1};

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-right: 20px;
      font-size: 20px;
    }
  `,
  Card: styled.div`
    border: 1px solid ${props=>props.theme.gray['2']};
    box-sizing: border-box;
    height: 202px;
    border-radius: 20px;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);
    background: ${props=>props.theme.white};

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      height: 102px;
    }
  `,
  TopDiv: styled.div `
    background: ${props=>props.theme.white};
    padding: 0 15px;
    height: 150px;
    line-height: 45px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding-left: 100px;
      line-height: 50px;
      height: 50px;
    }
  `,
  BottomDiv: styled.div `
    background: ${props=>props.theme.gray['0']};
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding-left: 100px;
    }
  `,
  BoxImage: styled.div`
    display: block;
    align-items: center;
    margin-top: -190px;
    width: 80px;
    margin-left: 10px;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: -90px;
    }

    .ant-skeleton {
      height: 80px;
      display: flex;
      align-items: center;
    }
  `,
  Img: styled.img`
    width: 80px;
    height: 80px;
    border-radius: 15px;
  `,
  Content: styled.div `
    width: 100%;
    font-size: 17px;
    font-weight: 500;
    color: ${props=>props.theme.gray['4']};

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      display: inline-flex;
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      font-size: 20px;
    }

    div:nth-child(1) {      
      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 55%;
      }
      @media (min-width: ${props => props.theme.viewport.desktop}) {
        width: 60%;
      }

      a {
        font-size: 14px;
        text-decoration: underline;
        margin-right: 1rem;
        color: ${props=>props.theme.gray['3']};

        @media (min-width: ${props => props.theme.viewport.tablet}) {
          font-size: 16px;
        }
        @media (min-width: ${props => props.theme.viewport.desktop}) {
          margin-right: 2rem;
          font-size: 20px;
        }
      }
    }

    div:nth-child(2) {     
      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 45%;
      }
      @media (min-width: ${props => props.theme.viewport.desktop}) {
        width: 40%;
      }
      text-align: right;
    }
  `,
  BottomContent: styled.div `
    width: 100%;
    display: inline-flex;
    font-size: 13px;
    font-weight: 500;
    color: ${props=>props.theme.gray['4']};

    div:nth-child(1) {
      width: 50%;
    }
    div:nth-child(2) {
      width: 50%;
      text-align: right;
    }

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      font-size: 17px;
    }
    `
}
