import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import StoreContext from '~/context/StoreContext'
import { Img } from '~/utils/styles'
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
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
    <Grid>
      {allShopifyProduct.edges
        ? allShopifyProduct.edges.map(({
          node: { id, handle, title, images: [firstImage], variants: [firstVariant] }
        }) => (
          <Product key={id} >
            <Link to={`/product/${handle}/`}>
              {firstImage && firstImage.localFile &&
                (<Img
                  fluid={firstImage.localFile.childImageSharp.fluid}
                  alt={handle}
                />)}
            </Link>
            <Title>{title}</Title>
            <PriceTag>{getPrice(firstVariant.price)}</PriceTag>
          </Product>
        ))
        : <p>No Products found!</p>}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: ${breakpoints.s}px){
    grid-template-columns: repeat(1, 1fr);
  }
`

const Product = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

const Title = styled.span`
  font-weight: 300;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
`

const PriceTag = styled.span`
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
`

export default ProductGrid
