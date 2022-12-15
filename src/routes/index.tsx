import {Global} from '@emotion/react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
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
        <Routes>
          <Route path="/">
            <Navigate to="/movies" replace />
          </Route>
          <Route path="/movies" element={<Movies />} />
          <Route path="/about" element={<About />} />
          <Route>
            <div>Not Found</div>
          </Route>
        </Routes>
      </Router>
    </Root>
  )
}
