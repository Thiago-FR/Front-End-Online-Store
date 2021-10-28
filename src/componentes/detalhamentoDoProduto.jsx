import React from 'react';
import PropTypes from 'prop-types';
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

    return (
      <div
        className="card mb-3"
        style={ { width: '550px' } }
      >
        <div className="p-3 mb-2 bg-dark text-white">
          <div className="col-md-4">
            <img
              style={ { width: '250px' } }
              className="img-fluid rounded-start"
              src={ produto.thumbnail }
              alt={ produto.title }
            />
            { shipping && shipping.free_shipping && (
              <p data-testid="free-shipping">FRETE GRATIS</p>
            )}
          </div>
          <div className="col-md-8 p-3 mb-2 bg-secondary text-white">
            <div className="card-body">
              <h3
                className="card-title"
                data-testid="product-detail-name"
              >
                { produto.title }
              </h3>
              <p className="card-text">
                Preço:
                { produto.price }
              </p>
              <h4 className="card-title">Especificações Tecnicas</h4>
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
                onClick={ () => salvarProduto(produto) }
              >
                Adicionar ao carrinho
              </button>
              <CartButton />
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
};

export default DetalhamentoDoProduto;
