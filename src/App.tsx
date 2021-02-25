import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme/Theme';

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
    <ThemeProvider theme={Theme}>
      <DataProvider>
        <GlobalStyle />
        <Router>
          <Route path="/" render={() => { window.scroll({top: 0, left: 0}); return null; }} />

          <Switch>
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
          </Switch>
        </Router>
      </DataProvider>
    </ThemeProvider>
  </>
}

export default App;
