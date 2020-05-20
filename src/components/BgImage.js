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
            fluid(quality: 92, maxWidth: 1600) {
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
      id={`media-test`}
      className={className}
      fluid={sources}
    />
  )
}

const BgImage = styled(ArtDirectedBackground)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  /* So we won't have the default "lightgray" background-color. */
  background-color: transparent;

  @media (min-width: ${breakpoints.m}px) {
    min-height: 90vh;
  }
`

export default BgImage