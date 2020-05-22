import React, { useContext } from 'react'
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

const Navigation = ({ siteTitle, location }) => {
  const [hasItems, quantity] = useQuantity()

	return(
		<Wrapper>
			<Container>
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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: white;
`

const Container = styled.div`
  position: relative;
  max-width: 960px;
  height: 60px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.m}px) {
    height: 100px;
  }
`

const LogoLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  color: currentColor;

  &:visited {
    color: currentColor;
  }

  @media (min-width: ${breakpoints.l}px) {
    right: 0;
  }
`

const CartIcon = styled(IconCart)`
  margin-top: 6px;
  width: 20px;

  @media (min-width: ${breakpoints.m}px) {
    margin-top: 8px;
  }
`

const CartCounter = styled.span`
  position: absolute;
  top: -6px;
  right: -15px;
  padding: 0 6px;
  font-size: .75rem;
  font-weight: bold;
  color: white;
  background: #1a1a1a;
  border-radius: 50%;

  @media (min-width: ${breakpoints.l}px) {
    right: -12px;
  }
`

export default Navigation
