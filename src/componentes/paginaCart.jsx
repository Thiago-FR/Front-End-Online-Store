import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { removerProduto, pegarProduto, atualizaItem } from '../services/salvarProdutos';

class paginaCart extends Component {
  constructor() {
    super();
    const lista = pegarProduto();
    this.state = {
      listaProdutos: lista === null ? [] : [...lista],
      maxQuantidade: false,
    };

    this.removeProduto = this.removeProduto.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.pegarListaProdutos = this.pegarListaProdutos.bind(this);
    this.pegarPrecoTotal = this.pegarPrecoTotal.bind(this);
  }

  pegarListaProdutos() {
    const lista = pegarProduto();
    this.setState({ listaProdutos: lista === null ? [] : [...lista] });
  }

  removeProduto(item) {
    removerProduto(item);
    this.pegarListaProdutos();
  }

  removeItem(item) {
    if (item.quantidade > 0) {
      item.quantidade -= 1;
      this.setState({}, () => atualizaItem(item));
    }
  }

  pegarPrecoTotal() {
    const { listaProdutos } = this.state;
    let precoTotal = 0;
    listaProdutos.forEach((item) => {
      precoTotal += item.price * item.quantidade;
    });
    return precoTotal.toFixed(2);
  }

  addItem(item) {
    if (item.quantidade < item.available_quantity) {
      item.quantidade += 1;
      this.setState({ maxQuantidade: false }, () => atualizaItem(item));
    } else {
      this.setState({ maxQuantidade: true });
    }
  }

  render() {
    const { listaProdutos, maxQuantidade } = this.state;
    return (
      <div>
        { listaProdutos.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
        { maxQuantidade && <p>Quantidade de item superior ao estoque</p> }
        { listaProdutos.map((item, i) => (
          <div key={ `${item.id}-${i}` }>
            <img src={ item.thumbnail } alt="" />
            <p data-testid="shopping-cart-product-name">{ item.title }</p>
            <p>
              R$
              { item.price * item.quantidade }
            </p>
            <div>
              <button
                type="button"
                onClick={ () => this.removeItem(item) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <span
                data-testid="shopping-cart-product-quantity"
              >
                { item.quantidade }
              </span>
              <button
                type="button"
                onClick={ () => this.addItem(item) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={ () => this.removeProduto(item) }
            >
              X
            </button>
          </div>
        )) }
        <p>
          Total R$:
          { this.pegarPrecoTotal() }
        </p>
        <Link to="/checkout" data-testid="checkout-products">
          <p>Finalizar Compra</p>
        </Link>
      </div>
    );
  }
}

export default paginaCart;
