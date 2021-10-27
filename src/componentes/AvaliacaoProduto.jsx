import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import '../services/Avaliacao.css';

class AvaliacaoProduto extends Component {
  constructor() {
    super();
    this.state = {
      avaliacao: null,
      hover: null,
      comentarios: [],
      login: '',
      texto: '',
    };
    this.mudancaInput = this.mudancaInput.bind(this);
    this.enviarAvaliacao = this.enviarAvaliacao.bind(this);
    this.carregaComentarios = this.carregaComentarios.bind(this);
  }

  componentDidMount() {
    this.carregaComentarios();
  }

  carregaComentarios() {
    this.setState({
      comentarios: JSON.parse(localStorage.getItem('comentarios')),
    });
  }

  mudancaInput({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  enviarAvaliacao() {
    // const { login, texto, avaliacao, comentarios } = this.state;
    this.setState(({ comentarios, login, texto, avaliacao }) => ({
      comentarios: [...comentarios, {
        login, texto, avaliacao,
      }],
    }), () => {
      const { comentarios } = this.state;
      localStorage.setItem('comentarios', JSON.stringify(comentarios));
    });
  }

  render() {
    const { avaliacao, hover, comentarios, login, texto } = this.state;
    return (
      <div>
        <h1>Avaliações</h1>
        <form>
          <input
            type="text"
            placeholder="login"
            value={ login }
            onChange={ this.mudancaInput }
            name="login"
          />
          {[...Array(5)].map((star, i) => (
            <label htmlFor="avaliacao" key={ i }>
              <input
                className="radio"
                type="radio"
                name="avaliacao"
                value={ i + 1 }
                onClick={ ({ target: { value } }) => this.setState({ avaliacao: value }) }
              />
              <FaStar
                className="estrela"
                color={ i + 1 <= (avaliacao || hover) ? 'yellow' : 'grey' }
                onMouseEnter={ () => this.setState({ hover: i + 1 }) }
                onMouseLeave={ () => this.setState(null) }
              />
            </label>
          ))}
          <label htmlFor="texto">
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Comentários(opcional)"
              value={ texto }
              onChange={ this.mudancaInput }
              name="texto"
            />
          </label>
          <button type="button" onClick={ this.enviarAvaliacao }>
            Enviar comentário!!

          </button>
        </form>
        { comentarios && comentarios.map((comentario) => (
          <div key={ comentario.login }>
            <p>{comentario.login}</p>
            <p>{comentario.texto}</p>
            <p>{comentario.avaliacao}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default AvaliacaoProduto;
