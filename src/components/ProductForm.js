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

  return (
    <>
      <PriceTag>
        {initialVariant.price} kr <span> {initialVariant.compareAtPrice} kr</span>
      </PriceTag>
      <div>
        {options[0].values.length > 1 && options.map(({ id, name, values }, index) => (
          <React.Fragment key={id}>
            {/* <label htmlFor={name}>Välj färg:</label>
            {values.map(value => (
              <>
                <label htmlFor={value}>{value}</label>
                <input
                  type="radio"
                  name={value}
                  value={value}
                  key={value}
                  disabled={checkDisabled(name, value)}
                  checked={color === value}
                  onChange={event => handleOptionChange(index, event)}
                />
              </>
            ))} */}

            <label htmlFor={name}>Välj färg: </label>
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
            </select>
          </React.Fragment>
        ))}
      </div>
      <div>
        <label htmlFor="quantity">Antal: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
      </div>
      <button
        type="submit"
        disabled={!available || adding}
        onClick={handleAddToCart}
      >
        Lägg till i kundvagn
      </button>
      {!available && <p>This Product is out of Stock!</p>}
    </>
  )
}

const PriceTag = styled.span`
  display: block;
  margin-bottom: 4rem;
  font-weight: 600;
  font-size: 1rem;
  color: #c00;

  span {
    color: #999;
    text-decoration: line-through;
  }

  @media (min-width: ${breakpoints.m}px) {
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
