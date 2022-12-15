import {Global} from '@emotion/react'
import {Navigate, Route, Routes} from 'react-router-dom'
import globals from '../theme/globals'
import normalize from '../theme/normalize'
import Header from '../common/components/layout/Header'
import Root from '../common/components/layout/Root'
import About from './about/about'
import Movies from './movies'

export default function AppRoutes() {
  return (
    <Root>
      <Global styles={normalize} />
      <Global styles={globals} />
      <Header title="IMDb movies search" />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" replace />} />
        <Route path="/movies/*" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Root>
  )
}
