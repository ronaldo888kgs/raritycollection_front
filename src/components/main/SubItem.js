import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubLabel = styled.span`
  margin-left: 13px;
  font-size: 16px;
  font-weight: normal;
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

const DropdownActiveLink = styled(Link)`
  background: ${(props)=>props.theme.gray['1']};
  height: 40px;
  padding-left: 3rem;
  padding-right: 30px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: red;
  justify-content: space-between;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    background: ${(props)=>props.theme.gray['2']};
    color: ${(props)=>props.theme.gray['4']};
  }
`;

const SubItem = ({ subitem, handleItem }) => {
  const onClick = (e) => {
    e.preventDefault()
    subitem.active = !subitem.active
    handleItem(subitem.title)
  }

  return (
    <>
      {subitem.active?
        <DropdownActiveLink to="#" onClick={e=>onClick(e)}>
          <SubLabel>{subitem.title}</SubLabel>
          <SubLabel>{subitem.value}</SubLabel>
        </DropdownActiveLink>
        :
        <DropdownLink to="#" onClick={e=>onClick(e)}>
          <SubLabel>{subitem.title}</SubLabel>
          <SubLabel>{subitem.value}</SubLabel>
        </DropdownLink>
      }      
    </> 
  );
};

export default SubItem;
