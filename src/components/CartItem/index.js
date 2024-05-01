import {useContext} from 'react'

import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {
    dishId,
    dishName,
    dishImage,
    dishCalories,
    dishCurrency,
    dishPrice,
    quantity,
  } = cartItemDetails
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const onRemoveCartItem = () => removeCartItem(dishId)
  const onIncrementQuantity = () => incrementCartItemQuantity(dishId)
  const onDecrementQuantity = () => {
    if (quantity < 2) {
      removeCartItem(dishId)
    } else {
      decrementCartItemQuantity(dishId)
    }
  }
  return (
    <li className="cart-item">
      <img src={dishImage} className="cart-product-image" alt="dishImage" />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <h1 className="cart-product-title">{dishName}</h1>
          <p className="cart-product-brand cart-calories" key="dish_calories">
            {`${dishCalories} calories`}
          </p>
        </div>
        <div className="cart-quantity-container">
          {/* eslint-disable-next-line */}
          <button
            onClick={onDecrementQuantity}
            type="button"
            data-testid="minus"
            className="quantity-controller-button"
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          {/* eslint-disable-next-line */}
          <button
            onClick={onIncrementQuantity}
            type="button"
            data-testid="plus"
            className="quantity-controller-button"
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dishCurrency} {dishPrice * quantity}/-
          </p>
          <button
            className="remove-button"
            type="button"
            data-testid="remove"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="remove"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
