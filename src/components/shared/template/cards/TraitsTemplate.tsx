import { Skeleton, Spin } from 'antd'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

export type TraitsTemplateProps = {
  trait_type?: string
  value?: string
  score?:number
  count?: number
  children?: ReactNode
}

export function TraitsTemplate({
  trait_type,
  value,
  score,
  count,
  children
}: TraitsTemplateProps) {

  return (
    <S.Row>
      <S.Content>
        <div>{trait_type}</div>
        <div>{value}</div>
        <div>{Math.round(count / score * 1000) / 1000}</div>
      </S.Content>
    </S.Row>
  )
}

export const S = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;
    background: ${props=>props.theme.white};
    margin: 0 auto;

    &:hover {
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow ease-in 250ms;
    }

    .ant-spin.ant-spin-spinning {
      width: 100%;
      height: auto;
      max-height: 40px;
      margin: auto;
    }
  `,
  Content: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #c8ced3;
    border-left: 1px solid #c8ced3;

    div {
      height: 40px;
      text-align: center !important;
      display: grid;
      align-items: center;
      border-left: 1px solid #c8ced3;
    }

    div: nth-child(1) {
      min-width: 90px;
      width: 40%;
      border: 0;
    }

    div: nth-child(2) {
      min-width: 70px;
      width: 30%;
    }

    div: nth-child(3) {
      min-width: 60px;
      width: 30%;
      border-right: 1px solid #c8ced3;
    }

    // div: nth-child(4) {
    //   min-width: 80px;
    //   width: 25%;
    //   border-right: 1px solid #c8ced3;
    // }
  `
}
