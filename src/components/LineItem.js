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

  const variantImage = line_item.variant.image ? (
    <ProductImage
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
    />
  ) : null

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
      {variantImage}
      <span>{line_item.title}</span>
      <span>
        {line_item.variant.title !== 'Default Title' && line_item.variant.title} ({line_item.quantity} st)
      </span>
      <Button onClick={handleRemove}>Ta bort</Button>
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

  span {
    margin-top: .5rem;
    font-weight: 400;
  }

  @media (min-width: ${breakpoints.m}px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    > * + * {
      margin-top: 0;
    }
  }
`

const ProductImage = styled.img`
  height: 175px;

  @media (min-width: ${breakpoints.m}px) {
    height: 125px;
  }
`

export default LineItem
