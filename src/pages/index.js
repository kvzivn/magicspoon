import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1 style={{ marginBottom: '4rem' }}>Välkommen ;)</h1>
    <ProductGrid />
  </>
)

export default IndexPage
