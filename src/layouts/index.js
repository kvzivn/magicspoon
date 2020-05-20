import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle, Container } from '~/utils/styles'
import Navigation from '~/components/Navigation'

const Layout = ({ children }) => (
  <ContextProvider>
    <GlobalStyle />
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Navigation siteTitle={data.site.siteMetadata.title} />
          <Container>
            {children}
          </Container>
        </>
      )}
    />
  </ContextProvider>
)

export default Layout
