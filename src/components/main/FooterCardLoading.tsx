import React from 'react'
import styled from 'styled-components'

interface FooterCardLoadingProps {
  loading?: boolean
}

export const FooterCardLoading = ({ loading }: FooterCardLoadingProps) => {
  return (
    <S.Content>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    height: 0px;
  `
}
