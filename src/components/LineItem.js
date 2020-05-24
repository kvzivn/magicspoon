import React, { useContext } from 'react'
import styled from '@emotion/styled'
import StoreContext from '~/context/StoreContext'
import { breakpoints } from '../utils/styles'
import Button from './Button'

const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout }
  } = useContext(StoreContext)

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  return (
    <Wrapper>
      <ProductImage
        src={line_item.variant.image.src}
        alt={`${line_item.title} product shot`}
      />
      <Title>{line_item.title}</Title>
      <Variant>
        {line_item.quantity} st {line_item.variant.title !== 'Default Title' && `(${line_item.variant.title})`}
      </Variant>
      <Button secondary onClick={handleRemove}>Ta bort</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  > * + * {
    margin-top: 1rem;
  }

  @media (min-width: ${breakpoints.m}px) {
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    > * + * {
      margin-top: 0;
    }
  }
`

const Title = styled.span`
  width: 150px;
  font-weight: 600;
  text-align: center;
`

const Variant = styled.span`
  width: 150px;
  font-weight: 400;
  text-align: center;
`

const ProductImage = styled.img`
  width: 175px;

  @media (min-width: ${breakpoints.m}px) {
    width: 125px;
  }
`

export default LineItem
