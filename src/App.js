import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cities from './Cities';
import AddCity from './AddCity';

const About = () => <h2>About</h2>;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Cities} />
          <Route path="/about/" component={About} />         
          <Route path="/addcity/" component={AddCity} />         
        </Switch>
      </Router>
    );
  }
}

export default App;
