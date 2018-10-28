import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './component/Index';

class App extends Component {

  render() {
    const comp =
      (<Switch>
        <Route path='/**' component={Index} />
      </Switch>);
    return comp;
  }
}

export default App;
