import React, { Component } from 'react';
import { removerProduto, pegarProduto, atualizaItem } from '../services/salvarProdutos';

class paginaCart extends Component {
  constructor() {
    super();
    const lista = pegarProduto();
    this.state = {
      listaProdutos: lista === null ? [] : [...lista],
    };

    this.removeProduto = this.removeProduto.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.pegarListaProdutos = this.pegarListaProdutos.bind(this);
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
    item.quantidade -= 1;
    this.setState({}, () => atualizaItem(item));
  }

  addItem(item) {
    item.quantidade += 1;
    this.setState({}, () => atualizaItem(item));
  }

  render() {
    const { listaProdutos } = this.state;
    return (
      <div>
        { listaProdutos.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
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
      </div>
    );
  }
}

export default paginaCart;
