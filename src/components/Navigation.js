import React, { useContext, useState } from 'react'
import reduce from 'lodash/reduce'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'
import StoreContext from '~/context/StoreContext'
import IconCart from '../images/icon_cart.svg'

const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)

	return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()
  const [headerColor, setHeaderColor] = useState('white')
  const isServer = typeof window === 'undefined'

  if (!isServer) {
    const windowHeight = window.innerHeight

    window.addEventListener('scroll', () => {
      setHeaderColor(window.scrollY > windowHeight - 50 ? 'black' : 'white')
    })
  }

	return(
		<Wrapper>
			<Container style={{ color: headerColor }}>
				<LogoLink to='/'>
					MAGICSPOON
				</LogoLink>
				<CartLink to='/cart'>
					{hasItems &&
						<CartCounter>
							{quantity}
						</CartCounter>
					}
					<CartIcon />
				</CartLink>
			</Container>
		</Wrapper>
	)
}

const CartIcon = styled(IconCart)`
  margin-top: 4px;
  width: 20px;
`

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
`

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  transition: color 1s ease-in-out;
`

const LogoLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  letter-spacing: .02em;
  font-weight: 300;
  text-decoration: none;
  color: currentColor;

  &:visited {
    color: currentColor;
  }

  @media (min-width: ${breakpoints.m}px){
    font-size: 1.75rem
  }
`

const CartLink = styled(Link)`
  position: absolute;
  top: 1.85rem;
  right: 2rem;
  pointer-events: none;
  color: currentColor;

  &:visited {
    color: currentColor;
  }
`

const CartCounter = styled.span`
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 4px 8px;
  font-size: .75rem;
  float: right;
  margin: -10px;
  z-index: 20;
`

export default Navigation
