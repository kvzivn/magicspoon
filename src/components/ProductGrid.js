import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { breakpoints } from '../utils/styles'

const ProductGrid = () => {
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
                compareAtPrice
              }
            }
          }
        }
      }
    `
  )

  return (
    <Wrapper>
      {allShopifyProduct.edges
        ? allShopifyProduct.edges.map(({
          node: { id, handle, title, description, images: [firstImage], variants: [firstVariant] }
        }) => (
          <ProductContainer key={id} to={`/product/${handle}/`}>
            {firstImage && firstImage.localFile &&
              (<ProductImage
                fluid={firstImage.localFile.childImageSharp.fluid}
                alt={handle}
            />)}
            <Product key={id}>
              <Title>{title}</Title>
              <Subtitle>{description}</Subtitle>
              <PriceTag>
                {firstVariant.price} kr <span> {firstVariant.compareAtPrice} kr</span>
              </PriceTag>
            </Product>
          </ProductContainer>
        ))
        : <p>No Products found!</p>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 6rem;
`

const ProductContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem 4rem;
  text-decoration: none;
  color: #1a1a1a;

  @media (min-width: ${breakpoints.m}px) {
    margin: 8rem 0;
    flex-direction: row;
    background: #fffbf2;
  }

  &:visited {
    color: #1a1a1a;
  }

  & + & {
    @media (min-width: ${breakpoints.m}px) {
      flex-direction: row-reverse;
      background: #ffebeb;
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

  @media (min-width: ${breakpoints.m}px) {
    max-width: 50%;
  }
`

const ProductImage = styled(Img)`
  width: 100%;

  @media (min-width: ${breakpoints.m}px) {
    width: 50%;
  }
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
  margin-top: .25rem;
  font-weight: 300;
  font-size: 1.15rem;

  @media (min-width: ${breakpoints.m}px) {
    font-size: 2.25rem;
  }
`

const PriceTag = styled.span`
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-top: .5rem;
  color: #c00;

  span {
    margin-left: .25rem;
    color: #999;
    font-weight: 500;
    text-decoration: line-through;
  }

  @media (min-width: ${breakpoints.m}px) {
    margin-top: 1rem;
    font-size: 1.15rem;
  }
`

export default ProductGrid
