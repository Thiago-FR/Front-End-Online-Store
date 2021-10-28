import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <div
        className="card mb-3 p-3 cart-color"
        style={ { width: '550px' } }
      >
        { listaProdutos.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
        <div>
          <Link
            to="/"
            className="btn btn-dark imagem-item-cart botao-voltar"
          >
            voltar
          </Link>
          { listaProdutos.map((item, i) => (
            <div
              className="p-3 mb-2 bg-dark text-white imagem-item-cart"
              key={ `${item.id}-${i}` }
            >
              <img
                style={ { width: '200px' } }
                className="img-fluid rounded-start imagem-cart"
                src={ item.thumbnail }
                alt=""
              />
              <div className="col-md-8 p-3 mb-2 bg-secondary text-white cart-border">
                <h4
                  className="card-title"
                  data-testid="shopping-cart-product-name"
                >
                  { item.title }
                </h4>
                <p className="card-text">
                  R$
                  { item.price * item.quantidade }
                </p>
                <div>
                  <button
                    className="btn btn-warning tamanho-button"
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
                    className="btn btn-success tamanho-button"
                    type="button"
                    onClick={ () => this.addItem(item) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger tamanho-button"
                  type="button"
                  onClick={ () => this.removeProduto(item) }
                >
                  X
                </button>
              </div>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default paginaCart;
