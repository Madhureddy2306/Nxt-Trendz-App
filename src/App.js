import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const filtered = cartList.filter(each => each.id === product.id)

    if (filtered.length >= 1) {
      const mapList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {...eachItem, quantity: eachItem.quantity + product.quantity}
        }
        return eachItem
      })

      this.setState({cartList: mapList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = productId => {
    const {cartList} = this.state

    const filteredList = cartList.filter(each => each.id !== productId)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productId => {
    const {cartList} = this.state

    const newList = cartList.map(each => {
      if (each.id === productId) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })

    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = (productId, quantity) => {
    const {cartList} = this.state

    if (quantity === 1) {
      const filteredList = cartList.filter(each => each.id !== productId)
      this.setState({cartList: filteredList})
    } else {
      const newCartList = cartList.map(each => {
        if (each.id === productId && each.quantity > 1) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })

      this.setState({cartList: newCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
