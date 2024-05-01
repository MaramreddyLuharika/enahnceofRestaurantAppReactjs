import './index.css'

import {Component} from 'react'

import CartContext from '../../context/CartContext'

class DishItem extends Component {
  state = {quantity: 0}

  onClickIncrease = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  renderDisItems = () => (
    <CartContext.Consumer>
      {value => {
        const {quantity} = this.state
        const {dish} = this.props
        // console.log(dish)
        const {
          dishId,
          dishName,
          dishImage,
          dishCalories,
          dishAvailability,
          dishCurrency,
          dishDescription,
          dishPrice,
          addonCat,
        } = dish
        const {cartList, addCartItem, incrementCartItemQuantity} = value
        const checkItemPresences = cartList.find(arr => arr.dishId === dishId)
        const onClickDecrease = () => {
          if (quantity > 1) {
            this.setState(prev => ({quantity: prev.quantity - 1}))
          } else {
            this.setState({quantity: 0})
          }
        }
        const onAddNewItemToCart = () => {
          if (checkItemPresences !== undefined) {
            incrementCartItemQuantity(dishId)
          } else {
            addCartItem({...dish, quantity})
          }
        }
        return (
          <li className="dish-item-card">
            <div className="circle-content-card">
              <div
                className={`box  ${dishPrice > 10 ? 'high-rate-props' : ''}`}
              >
                <p
                  className={`circle ${
                    dishPrice > 10 ? 'high-rate-circle' : ''
                  }`}
                />
              </div>
              <div className="content-div">
                <h1 className="name">{dishName}</h1>
                <p className="money">{`${dishCurrency} ${dishPrice}`}</p>
                <p className="description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="qunatity-control-card">
                    <button
                      type="button"
                      className="control"
                      onClick={onClickDecrease}
                    >
                      -
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="control"
                      onClick={this.onClickIncrease}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-availble">Not available</p>
                )}

                {addonCat.length ? (
                  <p className="customization-text">Customizations available</p>
                ) : (
                  ''
                )}
                {dishAvailability ? (
                  <button
                    type="button"
                    onClick={onAddNewItemToCart}
                    className="add-to-cart"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
            <p className="calories-num calories-num-lg">{`${dishCalories} calories`}</p>
            <img className="dish-img" alt={dishName} src={dishImage} />
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderDisItems()
  }
}

export default DishItem
