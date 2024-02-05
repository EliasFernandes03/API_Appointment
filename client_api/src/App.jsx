import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Hello World!</h1>
  </div>
);

const ExamplePage = () => (
  <div>
    <h1>Exemplo de Página</h1>
    <p>Esta é uma página de exemplo.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/example">Exemplo</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Route exact path="/appointment" component={Home} />
        <Route path="/example" component={ExamplePage} />
      </div>
    </Router>
  );
}

export default App;
