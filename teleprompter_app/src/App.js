import React from 'react';
import GetScript from './screens/GetScript';
import Prompter from './screens/Prompter';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GetScript}/>
        <Route exact path="/prompter" component={Prompter}/>
      </Switch>
    </Router>
  );
};

export default App;
