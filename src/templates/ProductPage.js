import React, { useState } from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import SEO from '~/components/seo'
import Sparkles from '~/components/Sparkles'
import ProductForm from '~/components/ProductForm'
import { Container, breakpoints } from '../utils/styles'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const [color, setColor] = useState('Silver')

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
            {/*

              snygga ti da liete härva vaaa

            */}

            {product.images.length === 1 &&
              <Img
                fluid={product.images[0].localFile.childImageSharp.fluid}
                key={product.images[0].id}
                alt="product"
              />
            }

            {product.images.length > 1 && color === 'Silver' &&
              <Img
                fluid={product.images[1].localFile.childImageSharp.fluid}
                key={product.images[1].id}
                alt="product"
              />
            }

            {product.images.length > 1 && color === 'Rosé' &&
              <Img
                fluid={product.images[2].localFile.childImageSharp.fluid}
                key={product.images[2].id}
                alt="product"
              />
            }

            {product.images.length > 1 && color === 'Guld' &&
              <Img
                fluid={product.images[3].localFile.childImageSharp.fluid}
                key={product.images[3].id}
                alt="product"
              />
            }
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.title}</ProductTitle>
            {/* <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            /> */}
            <ProductForm product={product} color={color} setColor={setColor} />
          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}

const TwoColumnGrid = styled.div`
  display: block;
  margin-top: 4rem;

  @media (min-width: ${breakpoints.m}px){
    display: grid;
    grid-template-columns: 1fr 2rem 1fr;
    grid-template-rows: 1auto;
    grid-template-areas: "left . right";
    margin-top: 8rem;
  }
`

const GridLeft = styled.div`
  grid-area: left;
  padding: 0 5rem 1rem;

  @media (min-width: ${breakpoints.m}px) {
    padding: .75rem;
  }
`

const GridRight = styled.div`
  grid-area: right;
`

const ProductTitle = styled.h1`
  margin: 0;
  font-size: 2.25rem;
  word-wrap: break-word;
  text-align: center;

  @media (min-width: ${breakpoints.m}px) {
    text-align: left;
  }
`

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        compareAtPrice
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
