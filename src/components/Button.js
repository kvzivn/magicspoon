import React from 'react'
import styled from '@emotion/styled'

export default ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)

const Button = styled.button`
  position: relative;
  padding: .5rem 2rem;
  box-sizing: border-box;
  font-family: inherit;
  line-height: normal;
  background: none;
  vertical-align: middle;
  z-index: 1;
  font-size: .75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 2px solid;
  overflow: hidden;
  will-change: auto;
  transition: all .2s ease-in-out;
  color: #1a1a1a;
  border-color: #aaa;
  -webkit-appearance: button;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    color: #fff;
    border-color: #333;
    background: #333;
  }

  &:disabled {
    pointer-events: none;
  }
`