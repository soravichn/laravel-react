import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom"
import { Button } from 'reactstrap';
import Example from './components/Example';
import '/css/nav.css';

export default class Index extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg nav-win95">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a href="#"
                  className="btn-start"
                  id="menuDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img className="logo-start" src="/images/logo-start.png" alt="" />Start
                </a>
                <div className="dropdown-menu custom-dropdown" aria-labelledby="menuDropdown">
                  <NavLink className="dropdown-item" activeClassName="active" exact to="/">Home</NavLink>
                  <NavLink className="dropdown-item" activeClassName="active" to="/list">Create Task</NavLink>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Log out</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Example} />
          </Switch>
        </div>
      </Router>
    )
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<Index />, document.getElementById('app'));
}
