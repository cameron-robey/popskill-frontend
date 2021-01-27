import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Import Pages
import Home from './pages/Home';

// Styles
import { GlobalStyle } from './theme/GlobalStyle';

const App = () => {
  return <>
    <GlobalStyle />
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
    </Router>
  </>
}

export default App;
