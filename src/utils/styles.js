import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1500,
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      html {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      body {
        margin: 0;
        font-family: 'Lato', Arial, Helvetica, sans-serif;
        line-height: 1.5;
        font-weight: 300;
        color: #1a1a1a;
        overflow-y: scroll;
      }
      a {
        &:visited {
          color: #1a1a1a;
        }
      }
    `}
  />
)

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.xl}px) {
    max-width: 1400px;
  }
`
