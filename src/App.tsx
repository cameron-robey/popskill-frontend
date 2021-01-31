import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import Home from './pages/Home';
import Player from './pages/Player';
import Compare from './pages/Compare';
import Veto from './pages/Veto';

// Contexts
import { DataProvider } from './contexts/DataContext';

// Styles
import { GlobalStyle } from './theme/GlobalStyle';

const App = () => {
  return <>
    <DataProvider>
      <GlobalStyle />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        
        <Route exact path="/player/:playerID">
          <Player />
        </Route>

        <Route exact path="/compare/:playerIDs">
          <Compare />
        </Route>

        <Route exact path="/veto">
          <Veto />
        </Route>
      </Router>
    </DataProvider>
  </>
}

export default App;
