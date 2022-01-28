import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from '../main/SubMenu';
import { IconContext } from 'react-icons/lib';
import * as IoIcons from 'react-icons/io';
import {AppContext} from '../../contexts'
import { Input } from 'antd'

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid ${props=>props.theme.gray['1']};
  justify-content: space-between;
`;

const SidebarNav = styled.nav`
  background: #f7fbfb;
  width: 300px;
  height: 88vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-250px')};
  transition: 350ms;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 1px;
  background: ${(props)=>props.theme.white};
  z-index: 99;
  @media (min-width: ${props => props.theme.viewport.mobile}) {
    height: 90vh;
  }
  @media (min-width: ${props => props.theme.viewport.tablet}) {
    top: 375px;
    height: 59vh;
  }
  @media (min-width: ${props => props.theme.viewport.desktop}) {
    top: 255px;
    height: 82vh;
  }
  @media (min-width: ${props => props.theme.viewport.desktopl}) {
    height: 68vh;
  }
  @media (min-width: ${props => props.theme.viewport.desktopXl}) {
    height: 73vh;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const SearchDiv = styled.div`
  background-color: ${(props)=>props.theme.gray['0']};
  padding-top: 20px;
`;
const SearchInput = styled(Input)`
  background: ${(props)=>props.theme.gray['0']};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props)=>props.theme.gray['4']};
  background-clip: padding-box;
  border: 1px solid ${(props)=>props.theme.gray['2']};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  width: 250px !important;

  input {
    height: 35px;
    background: ${(props)=>props.theme.gray['0']};
    color: ${(props)=>props.theme.gray['4']};
    border-radius: 0.5rem;
    border: 0;
  }
`;
const Sidebar = ({sidebarChange, handleFilter, handleFilterButton, handleFilterPrice, handleFilterRarityMin, handleFilterRarityMax, handleFilterTraits, traits, count}) => {
  const [sidebar, setSidebar] = useState(false);
  const [color, setColor] = useState('#5C5C5C')
  const { theme } = useContext(AppContext);

  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebarChange();
  }

  const [searchKey, setSearchKey] = useState('');

  const collectionSearchHandler = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  useEffect(()=>{
    handleFilter(searchKey)
  },[searchKey])

  const FilterIcon = ()=> {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 30 30" height="1em" width="1em" style={{display: 'inline-block', marginBottom: '-15px'}}>
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fillRule="nonzero" d="M14 14v6l-4 2v-8L4 5V3h16v2l-6 9zM6.404 5L12 13.394 17.596 5H6.404z"></path>
        </g>
      </svg>
    );
  }

  useEffect(()=>{
      if(theme.theme==='dark'){
          setColor('rgb(211 164 164)')
      } else {
          setColor('#5C5C5C')
      }
  })

  return (
    <>
      <IconContext.Provider value={{ color: '#000000' }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <div>
                <FilterIcon />
                <div style={{fontSize: '16px',display: 'inline-block', marginBottom: '20px'}}>Filter</div>                
              </div>
              {sidebar? 
                <IoIcons.IoIosArrowRoundBack onClick={showSidebar} style={{ marginRight: '10px', color: color}} />
                :
                <IoIcons.IoIosArrowRoundForward onClick={showSidebar} style={{ marginRight: '10px', color: color}} />
              }
            </NavIcon>
            {sidebar&&
              <SearchDiv>
                <div style={{margin: '0 0 10px 20px'}}>
                  <SearchInput onChange = {(e) => collectionSearchHandler(e)} value={searchKey} type='text' placeholder='Token ID Look up'></SearchInput>
                </div>
              </SearchDiv>
            }
            {sidebar&& SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} handleButton={handleFilterButton} handlePrice={handleFilterPrice} handleRarityMin={handleFilterRarityMin} handleRarityMax={handleFilterRarityMax} handleTraits={handleFilterTraits} traits={traits} count={count} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
