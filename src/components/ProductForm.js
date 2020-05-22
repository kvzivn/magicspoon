import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'
import StoreContext from '~/context/StoreContext'

const ProductForm = ({ product, color, setColor }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId]
  )

  // [client.product, productVariant.shopifyId, variants]

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
    setColor(selectedVariant.title)
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  /*
  Using this in conjunction with a select input for variants
  can cause a bug where the buy button is disabled, this
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways -
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  // const price = Intl.NumberFormat(undefined, {
  //   currency: minVariantPrice.currencyCode,
  //   minimumFractionDigits: 2,
  //   style: 'currency',
  // }).format(variant.price)

  const addQuantity = () => setQuantity(quantity + 1)

  const decreaseQuantity = () => {
    if (quantity === 1) return

    setQuantity(quantity - 1)
  }

  return (
    <Wrapper>
      <PriceTag>
        {initialVariant.price} kr <span> {initialVariant.compareAtPrice} kr</span>
      </PriceTag>
      <div>
        {options[0].values.length > 1 && options.map(({ id, name, values }, index) => (
          <React.Fragment key={id}>
            <Label htmlFor={name}>Välj färg:</Label>
            {values.map(value => (
              <Color key={value}>
                <input
                  type="radio"
                  name={value}
                  id={value}
                  value={value}
                  key={value}
                  disabled={checkDisabled(name, value)}
                  checked={color === value}
                  onChange={event => handleOptionChange(index, event)}
                />
                <label htmlFor={value} />
              </Color>
            ))}
{/*
            <Label htmlFor={name}>Välj färg: </Label>
            <select
              name={name}
              key={id}
              onChange={event => handleOptionChange(index, event)}
            >
              {values.map(value => (
                <option
                  value={value}
                  key={`${name}-${value}`}
                  disabled={checkDisabled(name, value)}
                >
                  {value}
                </option>
              ))}
            </select> */}
          </React.Fragment>
        ))}
      </div>
      <div>
        <Label htmlFor="quantity">Antal: </Label>
        <QuantityWrapper>
          <QuantityBtn onClick={decreaseQuantity}>-</QuantityBtn>
          <QuantityInput
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            pattern="[0-9]*"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <QuantityBtn onClick={addQuantity}>+</QuantityBtn>
        </QuantityWrapper>
      </div>
      <Button
        type="submit"
        disabled={!available || adding}
        onClick={handleAddToCart}
      >
        Lägg till i kundvagn
      </Button>
      {!available && <p>This Product is out of Stock!</p>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;

  @media (min-width: ${breakpoints.m}px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const Color = styled.div`
  display: inline-block;
  color: #f1bcb4;

  &:nth-of-type(2) {
    color: #d8d8d8;
  }

  &:last-child {
    color: #f7e687;
  }

  & + & {
    margin-left: 12px;
  }

  input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;

    &:checked ~ label {
      outline-color: black;
    }

    &:focus {
      outline: none;
    }
  }

  label {
    display: block;
    width: 30px;
    height: 30px;
    padding: 2px;
    outline: 1px solid #ccc;
    background: currentColor;
    border: 2px solid white;
    cursor: pointer;
  }
`

const Button = styled.button`
  display: block;
  margin-top: 2rem;
  background: transparent;
  border: 2px solid;
  color: #333;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  outline: none;
  background-color: white;
  padding: .5rem 2rem;
  font-size: .75rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  margin-bottom: 4px;
  line-height: 1.6;
  letter-spacing: 0.05em;
  font-size: 0.6875em;
  color: rgb(112, 112, 112);
  text-transform: uppercase;
  font-weight: 600;
`

const QuantityWrapper = styled.div`
  display: flex;
  width: 100%;
`

const QuantityInput = styled.input`
  width: 60px;
  margin: 0 4px;
  color: #333;
  text-align: center;
  box-sizing: border-box;
  height: 30px;
  border: 2px solid;
  font-size: .75rem;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`

const QuantityBtn = styled.button`
  width: 30px;
  height: 30px;
  color: #333;
  border: 2px solid;
  font-size: 1rem;
  cursor: pointer;
  background: white;

  &:focus {
    outline: none;
  }
`

const PriceTag = styled.span`
  display: block;
  margin-top: .5rem;
  font-weight: 600;
  font-size: 1rem;
  color: #c00;

  span {
    color: #999;
    text-decoration: line-through;
  }

  @media (min-width: ${breakpoints.m}px) {
    margin-bottom: 2rem;
    font-size: 1.15rem;
  }
`

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
