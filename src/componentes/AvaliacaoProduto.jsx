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
          {/* Para fazer toda a lógica das estrelas, aprendemos com esse víde: https://www.youtube.com/watch?v=eDw46GYAIDQ */}
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
          <label htmlFor="texto">
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Comentários(opcional)"
              value={ texto }
              onChange={ this.mudancaInput }
              name="texto"
            />
          </label>
          <button
            type="button"
            onClick={ this.enviarAvaliacao }
            disabled={ botaoDesabilitado }
          >
            Enviar comentário!!
          </button>
        </form>
        { comentarios && comentarios.map((comentario) => (
          <div
            key={
              `${comentario.login}: ${comentario.avaliacao}: ${comentario.comentario}`
            }
          >
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
