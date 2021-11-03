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
    const { atualizaLista } = this.props;
    salvarProduto(element);
    atualizaLista();
  }

  render() {
    const { resultado } = this.props;
    return resultado.length !== 0 && (
      <div className="moldura itens">
        {
          resultado.map((element) => (
            <div
              key={ element.id }
              data-testid="product"
            >
              <div className="cabeçalho-itens">
                { element.shipping.free_shipping && (
                  <p
                    className="fs-3 preço gratis"
                    data-testid="free-shipping"
                  >
                    FRETE GRATIS
                  </p>
                )}
                <Link
                  className="btn btn-dark link-itens"
                  to={ `/detalhe/${element.category_id}/${element.id}` }
                  data-testid="product-detail-link"
                >
                  <p className="card-title">
                    { element.title }
                  </p>
                </Link>
                <h3 className="fs-3 preço">
                  R$:
                  { element.price }
                </h3>
                <img
                  className="imagem-item"
                  src={ element.thumbnail }
                  alt={ element.title }
                />
                <button
                  className="btn btn-dark botao-itens"
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
  atualizaLista: PropTypes.func.isRequired,
  resultado: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Produtos;
