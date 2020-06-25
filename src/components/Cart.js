import React, { useContext } from 'react'
import styled from '@emotion/styled'
import StoreContext from '~/context/StoreContext'
import Sparkles from './Sparkles'
import Button from './Button'
import LineItem from './LineItem'
import PaymentIcons from './PaymentIcons'
import { breakpoints } from '../utils/styles'

const Cart = () => {
  const {store: { checkout }} = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  console.log(checkout)

  return (
    <Wrapper>
      {line_items}
      <Total>
        <Heading>Totalt:</Heading>
        <Price>{checkout.totalPrice} kr</Price>
        <Button onClick={handleCheckout} disabled={checkout.lineItems.length === 0}>
          Gå till betalning
        </Button>
      </Total>
      <PaymentIcons />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  margin: 10rem auto 0;
  padding-bottom: 10rem;

  @media (min-width: ${breakpoints.m}px) {
    margin: 12rem auto 0;
  }
`

const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`

const Heading = styled.h3`
  margin: 0;
  font-weight: 400;
`

const Price = styled.span`
  margin-bottom: .75rem;
  font-weight: 600;
  font-size: 1.75rem;
`


export default Cart
