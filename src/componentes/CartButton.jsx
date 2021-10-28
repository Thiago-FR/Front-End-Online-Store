import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartButton extends Component {
  render() {
    return (
      <div>
        <Link
          className="btn btn-dark padding-baixo"
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

export default CartButton;
