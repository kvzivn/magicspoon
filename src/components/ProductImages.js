import React from 'react'
import Img from 'gatsby-image'

const ProductImages = ({ images, color }) => {
  // if (images.length > 1) images.shift()

  console.log(color)

  return (
    <>
      {images.map(image => (
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt="product"
        />
      ))}
    </>
  )
}

export default ProductImages