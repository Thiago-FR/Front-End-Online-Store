import React from 'react';
import PropTypes from 'prop-types';
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
    const { atualizaLista, quantidade } = this.props;
    return (
      <div className="cabeçalho">
        <div className="pesquisa-carrinho">
          <form>
            <label htmlFor="campoDePesquisa">
              <input
                placeholder="digite aqui"
                className="btn btn-outline-dark border"
                type="text"
                data-testid="query-input"
                name="campoDePesquisa"
                value={ campoDePesquisa }
                onChange={ digitando }
              />
            </label>
            <button
              className="btn btn-dark espaçamento-botao"
              type="button"
              data-testid="query-button"
              onClick={ this.buscandoAPI }
            >
              Pesquisar
            </button>
          </form>
          <CartButton quantidade={ quantidade } />
        </div>
        <h3 className="initial-message" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <div className="categoria-itens">
          <div className="moldura categoria">
            <FiltroCategoria mudandoCategoria={ this.mudandoCategoria } />
          </div>
          <Produtos resultado={ resultado } atualizaLista={ atualizaLista } />
        </div>
      </div>
    );
  }
}

paginaInicial.propTypes = {
  atualizaLista: PropTypes.func.isRequired,
  quantidade: PropTypes.number,
};

paginaInicial.defaultProps = {
  quantidade: 0,
};

export default paginaInicial;
