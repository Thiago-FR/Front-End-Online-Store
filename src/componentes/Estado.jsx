import React from 'react';

const URL_STATE = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

class Estados extends React.Component {
  constructor() {
    super();

    this.state = {
      estado: [],
    }

    this.fetchURL(URL_STATE);

  }

  fetchURL = async (url) => {
    const stateName = await fetch(url).then(response => response.json());

    this.setState({ estado: stateName });
  }

  render() {
    const { handleChange, value } = this.props;
    return (
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="Estado">Estado </label>
        <select className="form-select" name="estado" id="Estado" onChange={ handleChange } value={ value }>
          { this.state.estado.map(id => {
            return <option key={ id.nome } value={ id.nome }>{ id.nome }</option>
          }) }
        </select>
      </div>
    )
  }
}

export default Estados;