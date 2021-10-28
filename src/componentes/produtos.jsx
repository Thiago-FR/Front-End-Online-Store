import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { salvarProduto } from '../services/salvarProdutos';

class Produtos extends React.Component {
  constructor() {
    super();
    this.adicionarProduto = this.adicionarProduto.bind(this);
  }

  adicionarProduto(element) {
    salvarProduto(element);
  }

  render() {
    const { resultado } = this.props;
    return (
      <div>
        {
          resultado.map((element) => (
            <div
              key={ element.id }
              data-testid="product"
            >
              <div>
                { element.shipping.free_shipping && (
                  <p data-testid="free-shipping">FRETE GRATIS</p>
                )}
                <p>
                  R$
                  { element.price }
                </p>
                <Link
                  to={ `/detalhe/${element.category_id}/${element.id}` }
                  data-testid="product-detail-link"
                >
                  <p>
                    nome
                    { element.title }
                  </p>
                </Link>
                <img src={ element.thumbnail } alt={ element.title } />
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => this.adicionarProduto(element) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Produtos.propTypes = {
  resultado: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Produtos;
