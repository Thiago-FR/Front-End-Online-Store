import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import paginaInicial from './componentes/paginaInical';
import paginaCart from './componentes/paginaCart';
import DetalhamentoDoProduto from './componentes/detalhamentoDoProduto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/carrinho" component={ paginaCart } />
          <Route
            path="/detalhe/:categoryId/:id"
            render={ (props) => <DetalhamentoDoProduto { ...props } /> }
          />
          <Route path="/" component={ paginaInicial } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
