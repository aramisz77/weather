import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Index = () => <h2>Index</h2>;
const About = () => <h2>About</h2>;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />         
        </Switch>
      </Router>
    );
  }
}

export default App;
