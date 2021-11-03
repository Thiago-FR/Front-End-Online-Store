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
      botaoDesabilitado: true,
    };
    this.mudancaInput = this.mudancaInput.bind(this);
    this.enviarAvaliacao = this.enviarAvaliacao.bind(this);
    this.carregaComentarios = this.carregaComentarios.bind(this);
    this.validaBotao = this.validaBotao.bind(this);
  }

  componentDidMount() {
    this.carregaComentarios();
  }

  carregaComentarios() {
    const comentariosAnteriores = JSON.parse(localStorage.getItem('comentarios'));
    this.setState({
      comentarios: !comentariosAnteriores ? [] : comentariosAnteriores,
    });
  }

  mudancaInput({ target: { value, name } }) {
    this.setState({
      [name]: value,
    }, () => this.validaBotao());
  }

  validaBotao() {
    const { avaliacao, login } = this.state;
    if (avaliacao && login.length > 0) {
      this.setState({ botaoDesabilitado: false });
    } else {
      this.setState({ botaoDesabilitado: true });
    }
  }

  enviarAvaliacao() {
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
    const { avaliacao, hover, comentarios, login, texto, botaoDesabilitado } = this.state;
    const estrelas = 5;
    return (
      <div className="centralizar">
        <h1>Avaliações</h1>
        <form>
          <input
            className="btn btn orange-input border"
            type="text"
            placeholder="login"
            value={ login }
            onChange={ this.mudancaInput }
            name="login"
          />
          {/* Para fazer toda a lógica das estrelas, aprendemos com esse víde: https://www.youtube.com/watch?v=eDw46GYAIDQ */}
          <div className="centralizar1">
            {[...Array(estrelas)].map((star, i) => {
              const valorAvaliacao = i + 1;
              return (
                <label htmlFor="avaliacao" key={ i }>
                  <input
                    className="radio"
                    type="radio"
                    name="avaliacao"
                  />
                  <FaStar
                    className="estrela"
                    color={ valorAvaliacao <= (hover || avaliacao) ? 'yellow' : 'grey' }
                    onMouseEnter={ () => this.setState({ hover: valorAvaliacao }) }
                    onMouseLeave={ () => this.setState({ hover: null }) }
                    onClick={ () => {
                      this.setState({ avaliacao: valorAvaliacao },
                        () => this.validaBotao());
                    } }
                  />
                </label>
              );
            })}
          </div>
          <div className="centralizar">
            <label htmlFor="texto">
              <textarea
                className="form-text"
                data-testid="product-detail-evaluation"
                placeholder="Comentários(opcional)"
                value={ texto }
                onChange={ this.mudancaInput }
                name="texto"
              />
            </label>
            <button
              className="btn btn orange-input border color-world"
              type="button"
              onClick={ this.enviarAvaliacao }
              disabled={ botaoDesabilitado }
            >
              Enviar comentário!!
            </button>
          </div>
        </form>
        { comentarios && comentarios.map((comentario) => (
          <div
            className="avaliacao"
            key={
              `${comentario.login}: ${comentario.avaliacao}: ${comentario.comentario}`
            }
          >
            <p>{comentario.login}</p>
            <p>{comentario.texto}</p>
            {[...Array(estrelas)].map((star, i) => {
              const numeroEstrela = i + 1;
              return (
                <FaStar
                  key={ i }
                  color={ numeroEstrela <= (comentario.avaliacao) ? 'yellow' : 'grey' }
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default AvaliacaoProduto;
