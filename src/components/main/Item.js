import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';
import SubItem from './SubItem'

const SubLabel = styled.span`
  margin-left: 13px;
  font-size: 16px;
  font-weight: normal;
  color: ${(props)=>props.theme.gray['3']}
`;

const DropdownLink = styled(Link)`
  background: ${(props)=>props.theme.gray['0']};
  height: 40px;
  padding-left: 3rem;
  padding-right: 30px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props)=>props.theme.gray['4']};
  justify-content: space-between;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    background: ${(props)=>props.theme.gray['1']};
  }
`;

const SubLink = styled(Link)`
  display: flex;
  color: ${(props)=>props.theme.gray['4']};
  align-items: center;
  padding: 5px 30px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  justify-content: space-between;
  font-size: 15px;
  &:hover {
    background: ${(props)=>props.theme.gray['1']};
    cursor: pointer;
  }
`;

const Item = ({ item, handle }) => {

  const SubMenuDiv = styled.div`
    ${(props) => (item.type==='button' ? 'padding-bottom: 10px;line-height: 30px; background-color: '+props.theme.gray['0']+';' : '')};    
  `;

  const showSubnav = () => {
    item.show = !item.show;
  }
  let aa = '';
  const handleItem = (val) => {
    handle({type:item.title, value: val})
  }

  return (
    <>
      <SubLink to="#" onClick={item.data && showSubnav}>
        <div style={{marginTop: '3px', paddingRight: '3px'}}>
          {item.show
            ? <IoIcons.IoIosArrowDown style={{color: `${props=>props.theme.gray['4']}`, marginBottom: '-2px'}} />
            : <IoIcons.IoIosArrowForward style={{color: `${props=>props.theme.gray['4']}`, marginBottom: '-2px'}} />
          }
          {item?.title}
        </div> 
        <SubLabel>{item?.value}</SubLabel>
      </SubLink>
      {item.show&&
        <SubMenuDiv>
          {item.data.map((subitem, index) => { 
            return (
                <SubItem key={index} subitem={subitem} handleItem={handleItem} />                  
              )
            })
          }
        </SubMenuDiv>
      }
    </> 
  );
};

export default Item;
