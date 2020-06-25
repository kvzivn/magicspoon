import React from 'react'
import { Link } from 'gatsby'
import SEO from '~/components/seo'
import BgImage from '~/components/BgImage'
import ProductGrid from '~/components/ProductGrid'
import PaymentIcons from '~/components/PaymentIcons'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'

const Wrapper = styled.div`
  /* margin-bottom: 8rem; */
`

const Payment = styled.div`
  max-width: 200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`

const PaymentText = styled.div`
  margin-bottom: .75rem;
  font-size: .65rem;
  letter-spacing: .05em;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: #4e4e4e;
`

const Footer = styled.footer`
  margin-top: 6rem;
  padding: 2rem 0 2.5rem;
  background-color: #dcaea4;
  color: white;
`

const Contact = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  text-align: center;

  a {
    color: white;
  }

  @media (min-width: ${breakpoints.m}px) {
    font-size: 28px;
  }
`

const PolicyLink = styled.div`
  margin-top: .25rem;
  text-align: center;
  font-weight: 500;
  font-size: 14px;

  a {
    color: white;
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
    <Payment>
      <PaymentText>Säker betalning</PaymentText>
      <PaymentIcons />
    </Payment>
    <Footer>
      <Contact>Frågor? Kontakta oss <a href="mailto:magicspoon16@gmail.com">här.</a></Contact>
      <PolicyLink>
        <Link to="/policy/">Integritetspolicy & Leveransinformation</Link>
      </PolicyLink>
    </Footer>
  </Wrapper>
)

export default IndexPage
