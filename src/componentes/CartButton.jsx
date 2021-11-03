import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CartButton extends Component {
  render() {
    const { quantidade } = this.props;
    console.log('carrinho', quantidade);
    return (
      <div>
        <Link
          className="btn btn-dark padding-baixo flex-car"
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          <span
            className="espace-emote"
            data-testid="shopping-cart-size"
          >
            { quantidade }

          </span>
          🛒
        </Link>
      </div>
    );
  }
}

CartButton.propTypes = {
  quantidade: PropTypes.number,
};

CartButton.defaultProps = {
  quantidade: 0,
};

export default CartButton;
