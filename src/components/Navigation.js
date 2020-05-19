import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/styles'
import StoreContext from '~/context/StoreContext'

const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)

	return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

	return(
		<Wrapper>
			<Container>
				<MenuLink to='/'>
					{siteTitle}
				</MenuLink>
				<MenuLink to='/cart'>
					{hasItems &&
						<CartCounter>
							{quantity}
						</CartCounter>
					}
					Cart 🛍
				</MenuLink>
			</Container>
		</Wrapper>
	)
}

const Wrapper = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.45rem;
  margin: 0 auto;
  max-width: 960px;
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: ${breakpoints.s}px){
    font-size: 1.4rem
  }
`

const CartCounter = styled.span`
  background-color: white;
  color: #663399;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`

export default Navigation
