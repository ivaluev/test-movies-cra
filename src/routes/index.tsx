import {Global} from '@emotion/react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import globals from '../assets/styles/globals'
import normalize from '../assets/styles/normalize'
import Header from '../components/layout/Header'
import Root from '../components/layout/Root'

import About from './about/about'
import Movies from './movies'

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
