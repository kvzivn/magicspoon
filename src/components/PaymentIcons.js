import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Klarna from '../images/icon_klarna.svg'
import Maestro from '../images/icon_maestro.svg'
import MasterCard from '../images/icon_mastercard.svg'
import Visa from '../images/icon_visa.svg'

const PaymentIcons = () => (
  <Wrapper>
    <Icon>
      <Klarna />
    </Icon>
    <Icon border center>
      <Visa />
    </Icon>
    <Icon border>
      <MasterCard />
    </Icon>
    <Icon border>
      <Maestro />
    </Icon>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
`

const Icon = styled.div`
  position: relative;
  width: 36px;
  height: 22px;
  border: ${({ border }) => border ? '1px solid #eee' : 'none'};
  border-radius: ${({ border }) => border ? '4px' : '0'};
  padding: 1px;

  svg {
    ${({ center }) => center && centerStyles};
  }
`

const centerStyles = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default PaymentIcons