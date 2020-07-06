import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;