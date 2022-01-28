import { Alert, Button, Input, Image, DatePicker } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { validate, emailValidate, confirmValidate } from '../services/ValidationService';
import whiteIcon from '../assets/nft-logo.png'
import darkIcon from '../assets/nft-logo-dark.png'
import rarityImage from '../assets/rarity.png'
import { AppContext } from "../contexts";
import {API} from '../constants/api';
import { collectionService } from '../services/CollectionService';
import { notifyWarning } from '../services/NotificationService'
import * as IoIcons from 'react-icons/io';
import notFound from '../assets/notfound.svg'

export default function RegisterCollectionPage() {
  const history = useHistory()
  const {user, theme, setModal} = useContext(AppContext);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if(!user.authenticated) {
      history.push('/login/list_collection');
      return;
    }
  },[])

  useEffect(()=> {
    setModal({show: isLoading});
  },[isLoading])

  const [name, setCollectionname] = useState<string>()
  const [opensea, setOpensea] = useState<string>()
  const [discord, setDiscord] = useState<string>()
  const [telegram, setTelegram] = useState<string>()
  const [website, setWebsite] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [blockchain, setBlockchain] = useState<string>()
  const [other, setOther] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [mint_date, setMintdate] = useState<string>()
  const [reveal_date, setRevealdate] = useState<string>()
  const [upcoming, setUpcoming] = useState<string>()
  const [featured, setFeatured] = useState<string>()
  const [image, setImage] = useState<string>()
  const [discordTag, setDiscordTag] = useState<string>()
  const [ticket, setTicket] = useState<string>()

  const handleKeyPress = (e: any, target: string) => {
    if(e.key === 'Enter'){
      document.getElementById(target).focus();           
    }
  }

  const submit = async () => {    
    if(!validate('Collection Name', name)) return;
    if(!validate('Short Description', description)) return;
    if(!validate('Collection Address', address)) return;
    if(!validate('Upcoming Option', upcoming)) return;
    if(!validate('Featured Option', featured)) return;

    setLoading(true);

    let w_blockchain = blockchain;
    if(w_blockchain == 'other'){
      w_blockchain = other;
    }
    let data = {
      name: name,
      opensea: opensea,
      discord: discord,
      telegram: telegram,
      website: website,
      description: description,
      blockchain: w_blockchain,
      address: address,
      mint_date: mint_date,
      reveal_date: reveal_date,
      image: image,
      upcoming: upcoming,
      featured: featured,
      discord_tag: discordTag,
      ticket: ticket
    };

    let isAdded = await collectionService().addCollection(data);
    setLoading(false)
  }

  const reset = () => {

  }

  const blockchainChange = (e) => {
    setBlockchain(e.target.value);
  }

  const dateHandle = (e:any, target) => {
    if(target == 'mint')
      setMintdate(e.format("YYYY-MM-DD"))
    else
      setRevealdate(e.format("YYYY-MM-DD"))
  };

  const onFileChange = async (e:any) => {
    let isImage = true;
    const timestamp = Date.now();
    let image = e.target.files;
    let formData = new FormData();
    let filename = Math.random().toString() + timestamp + '.jpg';
    for (const key of Object.keys(image)) {
      if ( /\.(jpe?g|png|gif|bmp)$/i.test(image[key].name) === false ) { isImage = false; break; }
      formData.append('file', image[key], filename)
    }
    if(!isImage){
      notifyWarning('Not image format')
      return;
    }
    const isUploaded = await collectionService().imageUpload(formData);
    if(isUploaded){
      setImage(filename)      
    }
  }

  const upcomingChange = (e) => {
    setUpcoming(e.target.value);
  }

  const featuredChange = (e) => {
    setFeatured(e.target.value);
  }

  return (
    <DefaultPageTemplate>
      <S.Container>
        <S.LogoDiv>
          <S.Img src={rarityImage} alt="rarity" />
          <S.Logo src={theme.theme==='dark'? darkIcon : whiteIcon} alt="icon" />
          <S.Img src={rarityImage} alt="rarity" />
        </S.LogoDiv>
        <S.Content>           
          <S.TitleDiv>
            <div style={{fontSize: '28px', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
              NFT Rarity - Get Listed
            </div>            
            <div>
              If you are looking to have your NFT collection listed on Rarity Collection, you've come to the right palce! We are the largest NFT Rarity service and we would love to create your rarity ranking. Complete the form below to get listed.
            </div>                 
          </S.TitleDiv>
        </S.Content>
        <S.Content>    
          <div>
            What is the name of your collection? *
            <div>
              <S.Input maxLength={60} value={name} placeholder="Your answer" onChange={(e: any) => setCollectionname(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'opensea')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Link to your OpenSea collection. (Leave empty if it doesn't apply)
            <div>
              <S.Input id="opensea" maxLength={60} value={opensea} placeholder="Your answer" onChange={(e: any) => setOpensea(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'discord')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Link to your discord server. (Leave empty if it doesn't apply)
            <div>
              <S.Input id="discord" maxLength={60} value={discord} placeholder="Your answer" onChange={(e: any) => setDiscord(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'telegram')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Link to your telegram. (Leave empty if it doesn't apply)
            <div>
              <S.Input id="telegram" maxLength={60} value={telegram} placeholder="Your answer" onChange={(e: any) => setTelegram(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'website')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Link to your website. (Leave empty if it doesn't apply)
            <div>
              <S.Input id="website" maxLength={60} value={website} placeholder="Your answer" onChange={(e: any) => setWebsite(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'description')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Please provide a short description of your collection. *
            <div>
              <S.Input id="description" maxLength={60} value={description} placeholder="Your answer" onChange={(e: any) => setDescription(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'ethereum')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <S.Blockchain>
            What is your collection based on? (Please take note that we will charge you a small fee if your collection must be manually added) *
            <div>
              <input id="ethereum" type="radio" name="blockchain" value='ethereum' checked={blockchain === 'ethereum'} onChange={blockchainChange} onKeyPress={(e:any) => handleKeyPress(e, 'polygon')} />
              <span>ETH</span>
            </div>
            <div>
              <input id="polygon" type="radio" name="blockchain" value='ploygon' checked={blockchain === 'ploygon'} onChange={blockchainChange} onKeyPress={(e:any) => handleKeyPress(e, 'address')} /> 
              <span>Polygon</span>
            </div> 
            <div>
              <input type="radio" name="blockchain" value='other' checked={blockchain === 'other'} onChange={blockchainChange} /> 
              <span>Other:</span>             
              <S.Other id="other" maxLength={60} value={other} placeholder="" onChange={(e: any) => setOther(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'address')} />           
            </div>            
          </S.Blockchain>     
        </S.Content>
        <S.Content>    
          <div>
            please provide the collection address below. *
            <div>
              <S.Input id="address" maxLength={60} value={address} placeholder="Your answer" onChange={(e: any) => setAddress(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'mint_date')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            When does your collection mint? (Leave empty if it doesn't apply)
            <div>
              <S.Date id="mint_date" format="YYYY-MM-DD" showTime={false} onChange={(e:any) => dateHandle(e, 'mint')} onKeyPress={(e:any) => handleKeyPress(e, 'reveal_date')}/>
            </div>            
          </div>     
        </S.Content> 
        <S.Content>    
          <div>
            When are you planning to reveal? (Leave empty if it doesn't apply)
            <div>
              <S.Date id="reveal_date" format="YYYY-MM-DD" showTime={false} onChange={(e:any) => dateHandle(e, 'reveal')} onKeyPress={(e:any) => handleKeyPress(e, 'image')}/>
            </div>            
          </div>     
        </S.Content> 
        <S.Content>    
          <div>
            What image would you like to use?
            <S.ImageDiv>
              <S.ImgButton>
                <IoIcons.IoMdImage style={{width: '20px', height: '20px',marginLeft: '5px', marginRight: '10px'}} />
                Select
                <S.ImgInput id="image" type='file' name='image' onChange={(e:any) => onFileChange(e)} multiple onKeyPress={(e:any) => handleKeyPress(e, 'upcoming1')} />
              </S.ImgButton>              
              <S.ImgTag src={image? API.server_url + API.collection_image + image : notFound} alt='' /> 
            </S.ImageDiv>
          </div>     
        </S.Content> 
        <S.Content>    
          <S.Blockchain>
            Do you want your collection to appear on our upcoming list? *
            <div>
              <input id="upcoming1" type="radio" name="upcoming" value='yes' checked={upcoming === 'yes'} onChange={upcomingChange} onKeyPress={(e:any) => handleKeyPress(e, 'upcoming2')} />
              <span>Yes</span>
            </div>
            <div>
              <input id="upcoming2" type="radio" name="upcoming" value='no' checked={upcoming === 'no'} onChange={upcomingChange} onKeyPress={(e:any) => handleKeyPress(e, 'featured1')} /> 
              <span>No</span>
            </div>            
          </S.Blockchain>     
        </S.Content>
        <S.Content>    
          <S.Blockchain>
            Do you want your collection to be featured? (The starting price for featured listings is 0.1 ETH) *
            <div>
              <input id="featured1" type="radio" name="featured" value='yes' checked={featured === 'yes'} onChange={featuredChange} onKeyPress={(e:any) => handleKeyPress(e, 'featured2')} />
              <span>Yes</span>
            </div>
            <div>
              <input id="featured2" type="radio" name="featured" value='no' checked={featured === 'no'} onChange={featuredChange} onKeyPress={(e:any) => handleKeyPress(e, 'discord_tag')} /> 
              <span>No</span>
            </div>            
          </S.Blockchain>     
        </S.Content>
        <S.Content>    
          <div>
            What is your Discord tag? Eg: Blob#9999 *
            <div>
              <S.Input id="discord_tag" maxLength={60} value={discordTag} placeholder="Your answer" onChange={(e: any) => setDiscordTag(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'ticket')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>    
          <div>
            Please make a ticket in your discord server and enter the ticket id here.(Join <a href={API.discord_server} target="_blank">{API.discord_server.substr(8, API.discord_server.length)}</a> and go to the channel called #open-a-ticket) *
            <div>
              <S.Input id="ticket" maxLength={60} value={ticket} placeholder="Your answer" onChange={(e: any) => setTicket(e.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'signup')} />
            </div>            
          </div>     
        </S.Content>
        <S.Content>
          <S.ButtonDiv>    
            <S.Button id='signup' onClick={submit} onKeyPress={(e:any) => handleKeyPress(e, 'reset')}>
              <span>Submit</span>
            </S.Button>
            <S.Button id='reset' onClick={reset}>
              <span>Reset</span>
            </S.Button>   
          </S.ButtonDiv>
        </S.Content>  
      </S.Container>
    </DefaultPageTemplate>
  )
}

const S = {
  ImageDiv: styled.div`
    width: 100%;
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    align-items: center;
    background: transparent;
  `,
  ImgButton: styled(Button)`
    border-radius: 5px;
    background-color: ${colors.red1};
    color: ${colors.white};
    border: none;
    box-shadow: none;
    width: 120px;
    font-size: 16px;
    font-weight: bold;
    height: 30px;
    padding-bottom: 7px;
    padding-top: 0px;
    
    span {
      position: relative;
      margin-top: -7px !important;
      vertical-align: text-top;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.red2};
      color: ${colors.white};
      opacity: 0.8;
      box-shadow: none;
      border: none;
      outline: 0;
    }
  `,
  ImgTag: styled(Image) `
    width: 125px;
    height: 125px;
    objectFit: cover;
    border: 1px solid rgb(159 156 156);
  `,
  ImgInput: styled(Input)`
    opacity: 0;
    appearance: none;
    cursor: pointer;
    align-items: baseline;
    color: inherit;     
    width: 120px;
    height: 30px;
    text-overflow: ellipsis;
    margin-left: -95px;
  `,
  Date: styled(DatePicker) `
    margin-top: 10px;
    background: transparent;
    color: ${props=>props.theme.gray['4']};

    .ant-picker-input > input {
      color: ${props=>props.theme.gray['4']} !important;
    }

    .ant-picker-suffix > * {
      color: ${props=>props.theme.gray['4']} !important;
    }
  `,
  Blockchain: styled.div `
    div {
      margin-top: 15px;
      display: flex;
    }
    input {
      margin-right: 10px;
    }
    span {
      margin-top: -5px;
    }
  `,
  Other: styled(Input) `
    border: 0px;
    border-bottom: 1px solid ${props=>props.theme.gray['2']};
    box-shadow: 1px 1px 5px hsl(0deg 0% 0% / 5%);
    background: transparent;
    color: ${(props)=>props.theme.gray['4']};    
    margin-left: 10px;
    margin-top: -10px;
  `,
  Logo: styled(Image) `
    min-height: 50px;
  `,
  Img: styled(Image) `
    width: 40px;
    margin-top: 1.5rem;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 60px;   
    }
  `,
  LogoDiv: styled.div`
    width: 100%;
    background: ${props=>props.theme.gray['0']};
    height: 8rem;
    justify-content: center;
    display: flex;
    gap: 2rem;
    padding: 1rem;
    border-radius: 10px;
  `,
  TitleDiv: styled.div`
    color: ${(props)=>props.theme.gray['4']};
  `,
  Container: styled.div`
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-top: 2vh;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: 2vh;    
    }
  `,
  ButtonDiv: styled.div `
    display: flex;
    justify-content: space-between;
  `,
  Button: styled(Button)`
    border-radius: 8px;
    background-color: ${colors.blue1};
    color: ${colors.white};
    border: none;
    box-shadow: none;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    height: 30px;
    padding-bottom: 7px;

    span {
      position: relative;
      margin-top: -5px !important;
      vertical-align: text-top;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.blue2};
      color: ${colors.white};
      opacity: 0.8;
      box-shadow: none;
      border: none;
    }
  `,
  Input: styled(Input)`
    border-radius: 5px;
    box-shadow: 1px 1px 5px hsl(0deg 0% 0% / 5%);
    margin-top: 20px;
    background: ${(props)=>props.theme.gray['0']};
    color: ${(props)=>props.theme.gray['4']};
    border: 1px solid ${(props)=>props.theme.gray['2']};
  `,
  Alert: styled(Alert)`
    border-radius: 8px;
    font-weight: 400;

    .ant-alert-message {
      margin-bottom: 8px;
      font-size: 14px;
    }
  `,
  Content: styled.div`
    width: 100%;
    margin-top: 15px;
    display: block !important;
    padding: 20px;    
    border: 1px solid ${props => props.theme.gray['1']};
    border-radius: 10px;
    color: ${props => props.theme.gray['4']};
  `
}
