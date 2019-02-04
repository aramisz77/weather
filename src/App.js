import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cities from './Cities';
import AddCity from './AddCity';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="container">
        
          <Router>
            <Switch>
              <Route path="/" exact component={Cities} />
              <Route path="/weather/:city" component={Weather} />
              <Route path="/addcity/" component={AddCity} />
            </Switch>
          </Router>
        
      </div>
    );
  }
}

export default App;
