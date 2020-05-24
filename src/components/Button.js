import React from 'react'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'

export default ({ children, secondary, ...props }) => (
  <Button secondary={secondary} {...props}>{children}</Button>
)

const Button = styled.button`
  position: relative;
  padding: .5rem 1.25rem;
  padding: ${({ secondary }) => secondary ? '.25rem 1rem' : '.75rem 1.5rem'};
  box-sizing: border-box;
  font-family: inherit;
  line-height: normal;
  vertical-align: middle;
  z-index: 1;
  font-size: .75rem;
  font-size:  ${({ secondary }) => secondary ? '.75rem' : '.85rem'};
  border-radius: ${({ secondary }) => secondary ? '0' : '4px'};
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 2px solid;
  overflow: hidden;
  will-change: auto;
  transition: all .1s ease-in-out;
  background: ${({ secondary }) => secondary ? 'none' : '#1a1a1a'};
  color: ${({ secondary }) => secondary ? '#1a1a1a' : '#fff'};
  border-color: ${({ secondary }) => secondary ? '#aaa' : '#1a1a1a'};
  -webkit-appearance: button;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background: #1a1a1a;
    color: #fff;
    border-color: #333;
  }

  &:disabled {
    pointer-events: none;
    opacity: .5;
  }

  @media (min-width: ${breakpoints.m}px) {
    padding: ${({ secondary }) => secondary ? '.5rem 1.25rem' : '.75rem 1.5rem'};
  }
`