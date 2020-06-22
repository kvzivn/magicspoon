import React from 'react'
import { Link } from 'gatsby'
import SEO from '~/components/seo'
import BgImage from '~/components/BgImage'
import ProductGrid from '~/components/ProductGrid'
import PaymentIcons from '~/components/PaymentIcons'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'

const Wrapper = styled.div`
  margin-bottom: 8rem;
`

const Contact = styled.h2`
  margin-bottom: .75rem;
  font-size: 22px;
  font-weight: 400;
  color: #525252;
  text-align: center;

  a {
    color: #a2a2a2;
  }

  @media (min-width: ${breakpoints.m}px) {
    font-size: 28px;
  }
`

const PolicyLink = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 14px;

  a {
    color: #525252;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const IndexPage = () => (
  <Wrapper>
    <SEO title="MagicSpoon.se" keywords={[`minisked`, `ketsked`, `sked`]} />
    <ProductGrid />
    <Contact>Frågor? Kontakta oss <a href="mailto:magicspoon16@gmail.com">här.</a></Contact>
    <PolicyLink>
      <Link to="/policy/">Integritetspolicy & Leveransinformation</Link>
    </PolicyLink>
    <PaymentIcons />
  </Wrapper>
)

export default IndexPage
