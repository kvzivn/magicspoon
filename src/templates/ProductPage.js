import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import SEO from '~/components/seo'
import Img from 'gatsby-image'
import ProductForm from '~/components/ProductForm'
import { Container, breakpoints } from '../utils/styles'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const [color, setColor] = useState('Silver')

  const ProductImages = () => {
    return (
      <>
        {product.images.map(image => (
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={product.title}
          />
        ))}
      </>
    )
  }

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
            <ProductImages />
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
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
`

const GridRight = styled.div`
  grid-area: right;
`

const ProductTitle = styled.h1`
  font-size: 2.25rem;
  word-wrap: break-word;
`

const ProductDescription = styled.div`
  font-weight: 300;
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
