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
      <div
        className="card mb-3 p-3 cart-color"
        style={ { width: '550px' } }
      >
        { listaProdutos.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
        { maxQuantidade && <p>Quantidade de item superior ao estoque</p> }
        <div>
          <Link
            to="/"
            className="btn btn-dark imagem-item-cart botao-voltar"
          >
            voltar
          </Link>
          <p className="price-total center-price">
            Total R$:
            { this.pegarPrecoTotal() }
          </p>
          <Link
            className="btn btn-dark imagem-item-cart botao-voltar padding-top"
            to="/checkout"
          >
            <p>Finalizar Compra</p>
          </Link>
          { listaProdutos.map((item, i) => (
            <div
              className="p-3 mb-2 text-white imagem-item-cart background-itens"
              key={ `${item.id}-${i}` }
            >
              <img
                style={ { width: '200px' } }
                className="img-fluid rounded-start imagem-cart tamanho-item"
                src={ item.thumbnail }
                alt=""
              />
              <div className="col-md-8 p-3 mb-2 a cart-border">
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
        <p className="price-total ">
          Total R$:
          { this.pegarPrecoTotal() }
        </p>
        <Link
          className="btn btn-dark imagem-item-cart botao-voltar padding-top"
          to="/checkout"
          data-testid="checkout-products"
        >
          <p>Finalizar Compra</p>
        </Link>
      </div>
    );
  }
}

export default paginaCart;
