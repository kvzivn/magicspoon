import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      body {
        margin: 0;
      }
      html {
        font-family: 'Lato', Arial, Helvetica, sans-serif;
        color: #494949;
        line-height: 1.5;
        font-weight: 300;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; */
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
  margin: 0 auto;
  max-width: 960px;
`

export const MainContent = styled.main`
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.l}px){
    margin-top: 40px;
    margin-bottom: 20px;
  }
`