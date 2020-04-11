import React from 'react'
import { Global } from '@emotion/core'
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'
import Root from '../components/layout/Root'
import normalize from '../assets/styles/normalize'
import globals from '../assets/styles/globals'
import Header from '../components/layout/Header'

import Movies from './movies'
import About from './about/about'

export default function AppRoutes() {
  return (
    <Root>
      <Global styles={normalize} />
      <Global styles={globals} />
      <Router>
        <Header title="IMDb movies search" />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <Route path="/movies" component={Movies} />
          <Route path="/about" exact component={About} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </Router>
    </Root>
  )
}
