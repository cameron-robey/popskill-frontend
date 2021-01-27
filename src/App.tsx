import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Import Pages
import Home from './pages/Home';
import Player from './pages/Player';

// Styles
import { GlobalStyle } from './theme/GlobalStyle';

const App = () => {
  return <>
    <GlobalStyle />
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/user/:id">
        <Player />
      </Route>
    </Router>
  </>
}

export default App;
