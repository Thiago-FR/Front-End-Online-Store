import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { salvarProduto } from '../services/salvarProdutos';
import CartButton from './CartButton';
import AvaliacaoProduto from './AvaliacaoProduto';

class DetalhamentoDoProduto extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id, categoryId } } } = this.props;
    getProductsFromCategoryAndQuery(categoryId)
      .then((data) => (data.results))
      .then((results) => {
        this.setState({
          produto: results.find((produto) => (produto.id === id)),
        });
      });
  }

  render() {
    const { produto } = this.state;
    const { attributes, shipping } = produto;
    const { atualizaLista, quantidade } = this.props;
    return (
      <div
        className="card mb-3"
        style={ { width: '550px' } }
      >
        <div className="p-3 mb-2 text-white fundo-detalhe">
          <Link
            to="/"
            className="btn btn-dark imagem-item-cart botao-voltar"
          >
            voltar
          </Link>
          <div className="col-md-4">
            <img
              style={ { width: '250px' } }
              className="img-fluid rounded-start"
              src={ produto.thumbnail }
              alt={ produto.title }
            />
          </div>
          <div className="col-md-8 p-3 mb-2 fundo-detalhe2 text-black centro">
            <div className="card-body centro">
              { shipping && shipping.free_shipping && (
                <p data-testid="free-shipping">FRETE GRATIS</p>
              )}
              <h3
                className="card-title centralizar-letra"
                data-testid="product-detail-name"
              >
                { produto.title }
              </h3>
              <h4 className="card-text preço1">
                Preço:
                { produto.price }
              </h4>
              <h5 className="card-title">Especificações Tecnicas</h5>
              {attributes && attributes.map((atributo) => (
                <p
                  key={ atributo.name }
                  className="card-text"
                >
                  {`${atributo.name}: ${atributo.value_name}`}
                </p>
              ))}
              <button
                className="btn btn-dark"
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ () => { salvarProduto(produto); atualizaLista(); } }
              >
                Adicionar ao carrinho
              </button>
              <CartButton quantidade={ quantidade } />
              <AvaliacaoProduto />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetalhamentoDoProduto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  atualizaLista: PropTypes.func.isRequired,
  quantidade: PropTypes.number,
};

DetalhamentoDoProduto.defaultProps = {
  quantidade: 0,
};

export default DetalhamentoDoProduto;
