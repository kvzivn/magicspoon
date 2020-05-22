import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'

import BackgroundImage from 'gatsby-background-image'

const ArtDirectedBackground = ({ className }) => {
  const { mobileImage, desktopImage } = useStaticQuery(
    graphql`
      query {
        mobileImage: file(relativePath: { eq: "hero_mobile.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 490, quality: 92) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        desktopImage: file(relativePath: { eq: "hero.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  // Set up the array of image data and `media` keys.
  // You can have as many entries as you'd like.
  const sources = [
    mobileImage.childImageSharp.fluid,
    {
      ...desktopImage.childImageSharp.fluid,
      media: `(min-width: 491px)`,
    },
  ]

  return (
    <BackgroundImage
      Tag={`section`}
      className={className}
      fluid={sources}
    />
  )
}

const BgImage = styled(ArtDirectedBackground)`
  width: 100%;
  min-height: 100vh;
  background-position: center top;
  background-color: transparent;

  @media (min-width: ${breakpoints.m}px) {
    margin-top: 100px;
    min-height: calc(100vh - 200px);
  }
`

export default BgImage