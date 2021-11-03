import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pegarProduto } from '../services/salvarProdutos';
import Estados from './Estado';

export default class finalizaCompras extends Component {
  constructor() {
    super();
    const lista = pegarProduto();
    this.state = {
      listaProdutos: lista === null ? [] : [...lista],
    };
    this.pegarPrecoTotal = this.pegarPrecoTotal.bind(this);
  }

  pegarPrecoTotal() {
    const { listaProdutos } = this.state;
    let precoTotal = 0;
    listaProdutos.forEach((item) => {
      precoTotal += item.price * item.quantidade;
    });
    return precoTotal.toFixed(2);
  }

  render() {
    const { listaProdutos } = this.state;
    return (
      <div
        className="card mb-3 p-3 cart-color"
      >
        <Link
          to="/"
          className="btn btn-dark imagem-item-cart botao-voltar"
        >
          Página inicial
        </Link>
        <Link
          to="/carrinho"
          className="btn btn-dark imagem-item-cart botao-voltar"
        >
          Carrinho
        </Link>
        <h1 style={ { color: 'black' } }>Finalizando compras</h1>
        {
          listaProdutos.map((item, i) => (
            <div
              key={ `${item.id}-${i}` }
              className="p-3 mb-2 text-white imagem-item-cart background-itens"
            >
              <img
                src={ item.thumbnail }
                alt=""
                style={ { width: '200px' } }
                className="img-fluid rounded-start imagem-cart"
              />
              <div className="col-md-8 p-3 mb-2 a cart-border">
                <p data-testid="shopping-cart-product-name">{ item.title }</p>
                <p className="card-text color-price">
                  R$
                  { item.price * item.quantidade }
                </p>
                <span
                  data-testid="shopping-cart-product-quantity"
                >
                  Quantidade:
                  { item.quantidade }
                </span>
              </div>
            </div>
          ))
        }
        <h4 className="price-total center-price">
          Valor Total: R$
          { this.pegarPrecoTotal() }
        </h4>
        <form>
          <h4 className="info-form">Informações do Comprador</h4>
          <div className="formulario">
            <label htmlFor="infoComprador">
              <input
                className="form-control"
                data-testid="checkout-fullname"
                type="text"
                placeholder="Nome Completo"
                id="infoComprador"
                required
              />
            </label>
            <label htmlFor="emailComprador">
              <input
                className="form-control"
                data-testid="checkout-email"
                type="e-mail"
                placeholder="Email"
                id="emailComprador"
                required
              />
            </label>
            <label htmlFor="cpfComprador">
              <input
                className="form-control"
                data-testid="checkout-cpf"
                type="text"
                placeholder="CPF"
                id="cpfComprador"
                required
              />
            </label>
            <label htmlFor="telefoneComprador">
              <input
                className="form-control"
                data-testid="checkout-phone"
                type="text"
                placeholder="Telefone"
                id="telefoneComprador"
                required
              />
            </label>
            <label htmlFor="cepComprador">
              <input
                className="form-control"
                data-testid="checkout-cep"
                type="text"
                placeholder="CEP"
                id="cepComprador"
                required
              />
            </label>
            <label htmlFor="enderecoComprador">
              <input
                className="form-control"
                data-testid="checkout-address"
                type="text"
                placeholder="Endereço"
                id="checkout-address"
                required
              />
              <Estados />
            </label>
          </div>
        </form>
      </div>
    );
  }
}
