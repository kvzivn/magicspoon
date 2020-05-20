import React from 'react'
import SEO from '~/components/seo'
import BgImage from '~/components/BgImage'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO title="MagicSpoon.se" keywords={[`minisked`, `ketsked`, `sked`]} />
    <BgImage />
    <ProductGrid />
  </>
)

export default IndexPage
