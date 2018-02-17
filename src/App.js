import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Users from './containers/Users'
import asyncComponent from './hoc/asynComponent/asyncComponent'

// lazy load on pizza
const AsyncPizza = asyncComponent(() => {
  return import('./containers/Pizza')
})

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/">Users</NavLink> | <NavLink to="/pizza">Pizza</NavLink>
        </div>
        <div>
          <Route path="/" exact component={Users} />
          <Route path="/pizza" component={AsyncPizza} />
        </div>
      </div>
    )
  }
}

export default App