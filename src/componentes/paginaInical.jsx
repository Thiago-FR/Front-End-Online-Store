import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Produtos from './produtos';
import CartButton from './CartButton';
import FiltroCategoria from './filtroCategoria';

class paginaInicial extends React.Component {
  constructor(props) {
    super(props);

    this.buscandoAPI = this.buscandoAPI.bind(this);
    this.quandoDigitado = this.quandoDigitado.bind(this);
    this.mudandoCategoria = this.mudandoCategoria.bind(this);

    this.state = {
      campoDePesquisa: '',
      resultado: [],
      digitando: this.quandoDigitado,
      categoria: undefined,
    };
  }

  quandoDigitado({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async buscandoAPI() {
    const { campoDePesquisa, categoria } = this.state;
    const resultado = await
    getProductsFromCategoryAndQuery(categoria, campoDePesquisa)
      .then((data) => data.results);
    this.setState({
      resultado,
    });
  }

  mudandoCategoria(novaVar) {
    this.setState({
      categoria: novaVar,
    }, () => this.buscandoAPI());
  }

  render() {
    const { campoDePesquisa, digitando, resultado } = this.state;
    return (
      <div className="cabeçalho">
        <form>
          <label htmlFor="campoDePesquisa">
            <input
              className="btn btn-outline-dark espaçamento-botao"
              type="text"
              data-testid="query-input"
              name="campoDePesquisa"
              value={ campoDePesquisa }
              onChange={ digitando }
            />
          </label>
          <button
            className="btn btn-dark"
            type="button"
            data-testid="query-button"
            onClick={ this.buscandoAPI }
          >
            Pesquisar
          </button>
        </form>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <CartButton />
        <div className="categoria">
          <Produtos resultado={ resultado } />
          <FiltroCategoria mudandoCategoria={ this.mudandoCategoria } />
        </div>
      </div>
    );
  }
}

export default paginaInicial;
