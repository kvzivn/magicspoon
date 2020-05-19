import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import StoreContext from '~/context/StoreContext'
import { breakpoints } from '../utils/styles'

const ProductGrid = () => {
  const { store: {checkout} } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(
          sort: {
            fields: [createdAt]
            order: DESC
          }
        ) {
          edges {
            node {
              id
              title
              description
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'SEK',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  return (
    <Wrapper>
      {allShopifyProduct.edges
        ? allShopifyProduct.edges.map(({
          node: { id, handle, title, description, images: [firstImage], variants: [firstVariant] }
        }) => (
          // <ProductContainer key={id} to={`/product/${handle}/`}>
          <ProductContainer key={id}>
            {firstImage && firstImage.localFile &&
              (<ProductImage
                fluid={firstImage.localFile.childImageSharp.fluid}
                alt={handle}
            />)}
            <Product key={id}>
              <Title>{title}</Title>
              <Subtitle>{description}</Subtitle>
              <PriceTag>{firstVariant.price.substr(0, firstVariant.price.length-3)} kr</PriceTag>
            </Product>
          </ProductContainer>
        ))
        : <p>No Products found!</p>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 1000px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 6rem;
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  margin-bottom: 6rem;
  margin-left: 4rem;
  margin-right: 4rem;
  text-decoration: none;
  color: #1a1a1a;

  @media (min-width: ${breakpoints.m}px) {
    flex-direction: row;
    background: #fffbf2;
  }

  &:visited {
    color: #1a1a1a;
  }

  & + & {
    @media (min-width: ${breakpoints.m}px) {
      flex-direction: row-reverse;
      background: #a0717b;
      color: white;
    }

    &:visited {
      color: white;
    }
  }

`

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  flex: 1;
  color: currentColor;
  z-index: 200;

  @media (min-width: ${breakpoints.m}px) {
    max-width: 50%;
  }
`

const ProductImage = styled(Img)`
  width: 100%;
  z-index: 1;

  @media (min-width: ${breakpoints.m}px) {
    width: 50%;
  }

  /* max-width: 400px; */
  /* border: 2rem solid white; */
  /* flex: 1; */
`

const Title = styled.span`
  margin-top: 1.5rem;
  font-weight: 300;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 400;

  @media (min-width: ${breakpoints.m}px) {
    margin-top: 0;
    font-size: 1.5rem;
  }
`

const Subtitle = styled.span`
  margin-top: 0;
  font-weight: 300;
  font-size: 1.15rem;
  text-align: center;

  @media (min-width: ${breakpoints.m}px) {
    margin-top: .5rem;
    max-width: 350px;
    font-size: 2.25rem;
  }
`

const PriceTag = styled.span`
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
`

export default ProductGrid
