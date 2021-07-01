import React, { useCallback } from 'react'
import { push } from 'connected-react-router'
import List from '@material-ui/core/List'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem } from '../components/Products'
import { GreyButton, PrimaryButton } from '../components/UIkit'

const CartList = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const productsInCart = getProductsInCart(selector)

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, [])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])

  return (
    <>
      <section className='c-section-wrapin'>
        <h2 className='u-text__headline'>Shopping Cart</h2>
      </section>

      <List>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartID} product={product} />
          ))}
      </List>

      <div className='module-spacer--medium' />
      <div className='p-grid__column'>
        <PrimaryButton label={'Checkout'} onClick={goToOrder} />
        <div className='module-spacer--extra-extra-small' />
        <GreyButton label={'Continue shopping'} onClick={backToHome} />
      </div>
    </>
  )
}

export default CartList
