import React from 'react';
import PropTypes from 'prop-types';

const URL_STATE = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

class Estados extends React.Component {
  constructor() {
    super();
    this.state = {
      estado: [],
    };
    this.fetchURL(URL_STATE);
  }

  fetchURL = async (url) => {
    const stateName = await fetch(url).then((response) => response.json());
    this.setState({ estado: stateName });
  }

  render() {
    const { handleChange, value } = this.props;
    const { estado } = this.state;
    return (
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="Estado">
          Estado
          <select
            className="form-select"
            name="estado"
            id="Estado"
            onChange={ handleChange }
            value={ value }
          >
            { estado.map((id) => (
              <option key={ id.nome } value={ id.nome }>{ id.nome }</option>
            )) }
          </select>
        </label>
      </div>
    );
  }
}

Estados.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

Estados.defaultProps = {
  handleChange: () => null,
  value: '',
};

export default Estados;
