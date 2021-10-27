import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import '../services/Avaliacao.css';

class AvalicaoProduto extends Component {
  constructor(){
    super();
    this.state = {
      avaliacao: null ,
      hover: null ,
      comentarios: undefined ,
      login: '' ,
      texto: '' ,
    };
    this.mudancaInput = this.mudancaInput.bind(this);
    this.enviarAvaliacao = this.enviarAvaliacao.bind(this);
    this.carregaComentarios = this.carregaComentarios.bind(this);
  }
  componentDidMount() {
    this.carregaComentarios()
  }
  carregaComentarios() {
    this.setState({
      comentarios: JSON.parse(localStorage.getItem("comentarios")) ,
    })
  }
  
  mudancaInput({ target: {value, name} }) {
   this.setState({
    [name]: value
   }) 
   
  }
  
  enviarAvaliacao() {
   const { login, texto, avaliacao, comentarios } = this.state
   this.setState((estadoAnterior) => ({
     comentarios:[...estadoAnterior.comentarios, {
       login: login, texto: texto, avaliacao: avaliacao
     }]
   }),() => (localStorage.setItem("comentarios", JSON.stringify(comentarios)))

   )
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
           <label>
             <input
              className="radio"
              type="radio"
              name="avaliacao"
              value={ i + 1 }
              onClick={({ target: { value } }) => this.setState({ avaliacao:value })}
               />
             <FaStar  
              className="estrela" 
              color={ i + 1 <= (avaliacao || hover) ? "yellow" : "grey" }
              onMouseEnter={() => this.setState({ hover: i + 1 })}
              onMouseLeave={() => this.setState(null)}
              />
           </label>
          ))}
          <label>
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
        { comentarios && comentarios.map((comentario) =>
          <div>
            <p>{comentario.login}</p>
            <p>{comentario.texto}</p>
            <p>{comentario.avaliacao}</p>
          </div>
        )}
      </div>
    );
  }
}

export default AvalicaoProduto;
