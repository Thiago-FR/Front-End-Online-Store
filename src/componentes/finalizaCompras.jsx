import React, { Component } from 'react'
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
      <div>
        <h1>Finalizando compras</h1>
        {
          listaProdutos.map((item, i) => (
            <div key={ `${item.id}-${i}` }>
              <img src={ item.thumbnail } alt="" />
              <p data-testid="shopping-cart-product-name">{ item.title }</p>
              <p>
                R$
                { item.price * item.quantidade }
              </p>
              <span
                data-testid="shopping-cart-product-quantity"
              >
                Quantidade: { item.quantidade }
              </span>
            </div>
          )) }
        <h4>Valor Total: R$ { this.pegarPrecoTotal() }</h4>
        <form>
          <h4>Informações do Comprador</h4>
          <div>
            <label htmlFor="infoComprador">
              <input data-testid="checkout-fullname" type="text" placeholder="Nome Completo" id="infoComprador" required />
            </label>
            <label htmlFor="emailComprador">
              <input data-testid="checkout-email" type="e-mail" placeholder="Email" id="emailComprador" required />
            </label>
            <label htmlFor="cpfComprador">
              <input data-testid="checkout-cpf" type="text" placeholder="CPF" id="cpfComprador" required />
            </label>
          </div>
          <div>
            <label htmlFor="telefoneComprador">
              <input data-testid="checkout-phone" type="text" placeholder="Telefone" id="telefoneComprador" required />
            </label>
            <label htmlFor="cepComprador">
              <input data-testid="checkout-cep" type="text" placeholder="CEP" id="cepComprador" required />
            </label>
            <label htmlFor="enderecoComprador">
              <input data-testid="checkout-address" type="text" placeholder="Endereço" id="checkout-address" required />
              <Estados />
            </label>
          </div>
        </form>
      </div>
    )
  }
}
