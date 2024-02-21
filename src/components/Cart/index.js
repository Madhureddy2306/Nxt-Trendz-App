import Popup from 'reactjs-popup'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      let totalPrice
      if (cartList.length >= 1) {
        const pricesList = cartList.map(each => each.price * each.quantity)
        totalPrice = pricesList.reduce((current, total) => current + total)
      }

      const triggerCartClear = () => {
        removeAllCartItems()
      }

      let text = false

      const getText = () => {
        text = true
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {cartList.length >= 1 ? (
                  <button
                    type="button"
                    className="remove-text"
                    onClick={triggerCartClear}
                  >
                    Remove All
                  </button>
                ) : null}
                <CartListView />
                <div className="summary-container">
                  <h1 className="order-h1">
                    Order Total:
                    <span className="order-span"> Rs {totalPrice}/- </span>
                  </h1>
                  <p className="cart-count-p">
                    {cartList.length} Items in cart
                  </p>

                  <Popup
                    trigger={
                      <button type="button" className="checkout-btn">
                        Checkout
                      </button>
                    }
                    modal
                  >
                    <div className="pop-up-container">
                      <select>
                        <option value="NetBanking">Net Banking</option>
                      </select>
                      <button type="button" onClick={getText}>
                        Confirm Order
                      </button>
                      <p className="order-text">
                        {text
                          ? 'Your order has been placed successfully'
                          : null}
                      </p>
                    </div>
                  </Popup>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
